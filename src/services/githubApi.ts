/**
 * GitHub API Service
 *
 * Sistema inteligente de cache para minimizar requisições à API do GitHub
 * e evitar rate limits. Busca repositórios públicos e privados com tag "project".
 */

import projectsConfig from '@/data/projectsConfig.json';

interface Repository {
    id: number;
    name: string;
    description: string | null;
    customDescription?: string | null;
    challenge?: string | null;
    highlights?: string[];
    html_url: string;
    topics: string[];
    languages: string[];
    stargazers_count: number;
    forks_count: number;
    featureImage: string | null;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    isFeatured?: boolean;
}

interface CacheData {
    repositories: Repository[];
    timestamp: number;
}

const CACHE_KEY = 'github_projects_cache';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos
const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Obtém configurações do projeto do arquivo centralizado
 */
function getProjectConfig(projectName: string) {
    const project = projectsConfig.projects.find(
        p => p.name.toLowerCase() === projectName.toLowerCase()
    );

    return {
        featureImage: project?.imageURL ? `/${project.imageURL}` : null,
        isFeatured: project?.isFeatured || false,
        customDescription: project?.customDescription || null,
        challenge: project?.challenge || null,
        highlights: project?.highlights || []
    };
}

/**
 * Busca os repositórios do GitHub do usuário
 * SEMPRE retorna projetos - prioriza fallback e tenta enriquecer com dados da API
 */
export async function fetchGitHubProjects(): Promise<Repository[]> {
    const isServer = typeof window === 'undefined';
    console.log(`🔍 [${isServer ? 'SERVER' : 'CLIENT'}] Iniciando fetchGitHubProjects`);

    // SEMPRE começa com os dados do fallback como base
    const fallbackProjects = getFallbackData();
    console.log(`✅ [${isServer ? 'SERVER' : 'CLIENT'}] Fallback carregado:`, fallbackProjects.length, 'projetos');

    // 1. Verificar cache primeiro (apenas no cliente)
    if (!isServer) {
        const cached = getCachedData();
        if (cached && cached.length > 0) {
            console.log(`✅ [CLIENT] Usando dados em cache:`, cached.length, 'projetos');
            return cached;
        }
    }

    // 2. Tentar enriquecer com dados da API do GitHub (opcional)
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'r90ur7';

    console.log(`🔐 [${isServer ? 'SERVER' : 'CLIENT'}] Token disponível:`, !!token);

    // Se não houver token, retorna o fallback direto
    if (!token) {
        console.warn(`⚠️ [${isServer ? 'SERVER' : 'CLIENT'}] Sem token - usando apenas fallback`);
        return fallbackProjects;
    }

    try {
        console.log(`🔄 [${isServer ? 'SERVER' : 'CLIENT'}] Tentando enriquecer com API do GitHub...`);

        // Timeout de 5 segundos para não travar o build
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const repos = await fetchAllRepositories(username, token, controller.signal);
        clearTimeout(timeoutId);

        console.log(`📦 [${isServer ? 'SERVER' : 'CLIENT'}] Repos da API:`, repos.length);

        if (repos.length === 0) {
            console.warn(`⚠️ [${isServer ? 'SERVER' : 'CLIENT'}] API vazia - usando fallback`);
            return fallbackProjects;
        }

        // Filtrar por tag "project" ou se está no config
        const configuredProjectNames = projectsConfig.projects.map(p => p.name.toLowerCase());
        const projectRepos = repos.filter(repo => {
            const hasProjectTag = repo.topics && repo.topics.includes('project');
            const isInConfig = configuredProjectNames.includes(repo.name.toLowerCase());
            return hasProjectTag || isInConfig;
        });

        console.log(`🏷️ [${isServer ? 'SERVER' : 'CLIENT'}] Projetos filtrados:`, projectRepos.length);

        if (projectRepos.length === 0) {
            console.warn(`⚠️ [${isServer ? 'SERVER' : 'CLIENT'}] Nenhum projeto na API - usando fallback`);
            return fallbackProjects;
        }

        // Enriquecer com linguagens
        const enrichedProjects = await Promise.all(
            projectRepos.map(async (repo) => {
                const languages = await fetchRepoLanguages(repo.name, username, token).catch(() => []);
                const config = getProjectConfig(repo.name);

                return {
                    ...repo,
                    description: config.customDescription || repo.description,
                    customDescription: config.customDescription,
                    challenge: config.challenge,
                    highlights: config.highlights,
                    languages,
                    featureImage: config.featureImage,
                    isFeatured: config.isFeatured
                };
            })
        );

        // Salvar no cache (apenas no cliente)
        if (!isServer) {
            setCachedData(enrichedProjects);
        }

        console.log(`✅ [${isServer ? 'SERVER' : 'CLIENT'}] ${enrichedProjects.length} projetos enriquecidos`);
        return enrichedProjects;

    } catch (error: any) {
        console.error(`❌ [${isServer ? 'SERVER' : 'CLIENT'}] Erro na API:`, error.message);
        console.warn(`⚠️ [${isServer ? 'SERVER' : 'CLIENT'}] Retornando fallback`);
        return fallbackProjects;
    }
}

/**
 * Busca todos os repositórios do usuário (com paginação, timeout e signal)
 */
async function fetchAllRepositories(username: string, token: string, signal?: AbortSignal): Promise<any[]> {
    const headers = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
    };

    let page = 1;
    let allRepos: any[] = [];
    const perPage = 100;

    while (page <= 3) { // Máximo 3 páginas para não demorar muito
        try {
            const response = await fetch(
                `${GITHUB_API_BASE}/user/repos?per_page=${perPage}&page=${page}&sort=updated&affiliation=owner`,
                { headers, signal }
            );

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Rate limit excedido');
                }
                if (response.status === 401) {
                    throw new Error('Token inválido');
                }
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const repos = await response.json();

            if (repos.length === 0) break;

            allRepos = allRepos.concat(repos);

            if (repos.length < perPage) break;

            page++;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.warn('⏱️ Request timeout - usando fallback');
            }
        }
    }

    return allRepos;
}

/**
 * Busca as linguagens de um repositório específico
 */
async function fetchRepoLanguages(repoName: string, username: string, token: string): Promise<string[]> {
    try {
        const response = await fetch(
            `${GITHUB_API_BASE}/repos/${username}/${repoName}/languages`,
            {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                }
            }
        );

        if (!response.ok) return [];

        const languages = await response.json();
        return Object.keys(languages);
    } catch (error) {
        console.error(`Erro ao buscar linguagens de ${repoName}:`, error);
        return [];
    }
}

/**
 * Obtém dados do cache se ainda válidos
 */
function getCachedData(ignoreExpiry = false): Repository[] | null {
    // Verificar se está no cliente (não no SSR)
    if (typeof window === 'undefined') return null;

    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const data: CacheData = JSON.parse(cached);
        const now = Date.now();
        const isExpired = now - data.timestamp > CACHE_DURATION;

        if (isExpired && !ignoreExpiry) {
            console.log('⏰ Cache expirado');
            return null;
        }

        return data.repositories;
    } catch (error) {
        console.error('Erro ao ler cache:', error);
        return null;
    }
}

/**
 * Salva dados no cache
 */
function setCachedData(repositories: Repository[]): void {
    // Verificar se está no cliente (não no SSR)
    if (typeof window === 'undefined') return;

    try {
        const data: CacheData = {
            repositories,
            timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Erro ao salvar cache:', error);
    }
}

/**
 * Limpa o cache (útil para forçar atualização)
 */
export function clearGitHubCache(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CACHE_KEY);
    console.log('🗑️ Cache do GitHub limpo');
}

/**
 * Dados de fallback caso a API falhe
 * Retorna TODOS os projetos configurados em projectsConfig.json
 */
function getFallbackData(): Repository[] {
    console.log('🔄 Carregando projetos do arquivo de configuração (fallback)');

    const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'r90ur7';

    const fallbackProjects: Repository[] = projectsConfig.projects
        .filter(project => project.imageURL) // Apenas projetos com imagem configurada
        .map((project, index) => {
            const config = getProjectConfig(project.name);

            return {
                id: index + 1,
                name: project.name,
                description: config.customDescription || `Projeto ${project.name}`,
                customDescription: config.customDescription,
                challenge: config.challenge,
                highlights: config.highlights,
                html_url: `https://github.com/${username}/${project.name}`,
                topics: ["project"],
                languages: [],
                stargazers_count: 0,
                forks_count: 0,
                featureImage: config.featureImage,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                pushed_at: new Date().toISOString(),
                isFeatured: config.isFeatured
            };
        });

    console.log(`✅ ${fallbackProjects.length} projetos carregados do fallback`);
    console.log('📋 Projetos fallback:', fallbackProjects.map(p => p.name));

    return fallbackProjects;
}

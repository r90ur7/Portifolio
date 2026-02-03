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
 */
export async function fetchGitHubProjects(): Promise<Repository[]> {
    // 1. Verificar cache primeiro (apenas no cliente)
    const cached = getCachedData();
    if (cached) {
        console.log('✅ Usando dados em cache do GitHub');
        return cached;
    }

    // 2. Obter credenciais
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'r90ur7';

    // Se não houver token, usar fallback imediatamente
    if (!token) {
        console.warn('⚠️ GitHub token não configurado. Usando dados de fallback.');
        return getFallbackData();
    }

    try {
        console.log('🔄 Buscando repositórios do GitHub...');

        // 3. Buscar repositórios (públicos e privados com token)
        const repos = await fetchAllRepositories(username, token);
        console.log(`📦 Total de repositórios encontrados: ${repos.length}`);

        // 4. Filtrar por tag "project" OU se está no projectsConfig.json
        const configuredProjectNames = projectsConfig.projects.map(p => p.name.toLowerCase());
        const projectRepos = repos.filter(repo => {
            const hasProjectTag = repo.topics && repo.topics.includes('project');
            const isInConfig = configuredProjectNames.includes(repo.name.toLowerCase());
            return hasProjectTag || isInConfig;
        });

        console.log(`🏷️ Repositórios com tag "project" ou em config: ${projectRepos.length}`);
        console.log('📋 Projetos encontrados:', projectRepos.map(r => r.name));

        // Se não encontrou nenhum projeto na API, usar fallback
        if (projectRepos.length === 0) {
            console.warn('⚠️ Nenhum projeto encontrado na API do GitHub. Usando fallback.');
            return getFallbackData();
        }

        // 5. Buscar linguagens e aplicar configurações personalizadas
        const reposWithLanguages = await Promise.all(
            projectRepos.map(async (repo) => {
                const languages = await fetchRepoLanguages(repo.name, username, token);
                const config = getProjectConfig(repo.name);

                return {
                    ...repo,
                    description: config.customDescription || repo.description, // Usa descrição personalizada se existir
                    customDescription: config.customDescription,
                    challenge: config.challenge,
                    highlights: config.highlights,
                    languages,
                    featureImage: config.featureImage,
                    isFeatured: config.isFeatured
                };
            })
        );

        // 6. Salvar no cache (apenas no cliente)
        setCachedData(reposWithLanguages);

        console.log(`✅ ${reposWithLanguages.length} projetos carregados do GitHub`);
        return reposWithLanguages;
    } catch (error: any) {
        console.error('❌ Erro ao buscar projetos do GitHub:', error);

        // Se houver erro, tentar retornar cache expirado
        const expiredCache = getCachedData(true);
        if (expiredCache && expiredCache.length > 0) {
            console.warn('⚠️ Usando cache expirado devido a erro na API');
            return expiredCache;
        }

        // Último recurso: dados de fallback completos
        console.warn('⚠️ Usando dados de fallback devido a erro na API');
        return getFallbackData();
    }
}

/**
 * Busca todos os repositórios do usuário (com paginação e timeout)
 */
async function fetchAllRepositories(username: string, token: string): Promise<any[]> {
    const headers = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
    };

    let page = 1;
    let allRepos: any[] = [];
    const perPage = 100;
    const timeout = 10000; // 10 segundos de timeout

    while (true) {
        try {
            // Criar uma Promise com timeout
            const fetchPromise = fetch(
                `${GITHUB_API_BASE}/user/repos?per_page=${perPage}&page=${page}&sort=updated&affiliation=owner`,
                { headers }
            );

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timeout')), timeout)
            );

            const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Rate limit excedido. Por favor, aguarde alguns minutos.');
                }
                if (response.status === 401) {
                    throw new Error('Token de autenticação inválido.');
                }
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const repos = await response.json();

            if (repos.length === 0) break;

            allRepos = allRepos.concat(repos);

            // Se retornou menos que perPage, não há mais páginas
            if (repos.length < perPage) break;

            page++;
        } catch (error) {
            console.error(`Erro na página ${page}:`, error);
            throw error;
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

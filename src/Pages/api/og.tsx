import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'edge',
};

// Mapeamento de palavras-chave para URLs de ícones (SVG/PNG públicos)
const iconMap: Record<string, string> = {
    react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    node: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    html: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    css: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    aws: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
    sql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    django: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    laravel: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg',
    vue: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    angular: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    flutter: 'https://cdn.jsdelivr.net/gh/devicons,devicon/icons/flutter/flutter-original.svg',
    ".net": 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg',
    java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    csharp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
};
const defaultIcon = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';

function getIconUrl(repo: string, desc: string) {
    const text = `${repo} ${desc}`.toLowerCase();
    for (const key in iconMap) {
        if (text.includes(key)) return iconMap[key];
    }
    return defaultIcon;
}

export default async function handler(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const repo = searchParams.get('repo') || '';
        const desc = searchParams.get('desc') || '';
        const iconUrl = getIconUrl(repo, desc);

        return new ImageResponse(
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #0F172A 60%, #B650F2 100%)',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <img src={iconUrl} width={180} height={180} style={{ borderRadius: 32, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }} alt="icon" />
            </div>,
            {
                width: 800,
                height: 400,
            }
        );
    } catch (err: any) {
        return new Response(`Erro ao gerar imagem OG: ${err?.message || err}`, {
            status: 500,
            headers: { 'Content-Type': 'text/plain' },
        });
    }
}

import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    const { searchParams } = new URL(req.url);
    const repo = searchParams.get('repo') || 'Projeto';
    const desc = searchParams.get('desc') || '';
    const author = searchParams.get('author') || 'r90ur7';

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #0F172A 60%, #B650F2 100%)',
                    color: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'Inter, sans-serif',
                    padding: 40,
                }}
            >
                <h1 style={{ fontSize: 56, margin: 0, fontWeight: 700, letterSpacing: -2 }}>{repo}</h1>
                <p style={{ fontSize: 28, margin: '24px 0 0 0', color: '#9AA6C4', maxWidth: 600, textAlign: 'center' }}>{desc}</p>
                <div style={{ fontSize: 22, marginTop: 32, opacity: 0.7 }}>by {author}</div>
            </div>
        ),
        {
            width: 800,
            height: 400,
        }
    );
}

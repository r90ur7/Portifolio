import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { Box } from "@chakra-ui/react";

const ParticlesBackground = () => {
    const [init, setInit] = useState(false);
    const containerRef = useRef<Container | null>(null);
    const engineInitialized = useRef(false);

    // Initialize particles engine only once
    useEffect(() => {
        if (!engineInitialized.current) {
            engineInitialized.current = true;
            initParticlesEngine(async (engine) => {
                await loadSlim(engine);
            }).then(() => {
                setInit(true);
            });
        }
    }, []);

    // Memoize the callback to prevent re-renders and force always-on behavior
    const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {
        if (container && !containerRef.current) {
            containerRef.current = container;

            // Force particles to always play initially
            container.play();

            // Override the intersection observer to prevent auto-pause
            // @ts-ignore - accessing private property to disable auto-pause
            if (container._intersectionObserver) {
                // @ts-ignore
                container._intersectionObserver.disconnect();
                // @ts-ignore
                container._intersectionObserver = null;
            }
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (containerRef.current) {
                containerRef.current.destroy();
                containerRef.current = null;
            }
        };
    }, []);

    // Memoize options to prevent recalculation
    const options: ISourceOptions = useMemo(
        () => ({
            autoPlay: true,
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 10, // Muito reduzido para performance máxima
            pauseOnBlur: false,
            pauseOnOutsideViewport: false,
            interactivity: {
                detectsOn: "window",
                events: {
                    onClick: {
                        enable: false,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    resize: {
                        enable: true,
                        delay: 1, // Delay maior para evitar recálculos frequentes
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 80, // Reduzido ainda mais
                        duration: 0.2, // Mais rápido
                    },
                },
            },
            particles: {
                color: {
                    value: ["#8b5cf6", "#ec4899", "#6366f1"],
                },
                links: {
                    color: "#8b5cf6",
                    distance: 300, // Aumentado ainda mais para menos links
                    enable: false, // DESABILITADO para melhor performance
                    opacity: 0.04,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 0.1, // Ainda mais lento
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800, // Área maior = menos partículas
                    },
                    value: 5, // Reduzido para apenas 5 partículas
                },
                opacity: {
                    value: 0.15,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    if (!init) {
        return null;
    }

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            width="100%"
            height="100%"
            zIndex={0}
            pointerEvents="none"
        >
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
            />
        </Box>
    );
};

export default ParticlesBackground;

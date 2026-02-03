"use client";

import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

const ParticlesBackground = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Apenas define mounted após hidratação estar completa
        setMounted(true);
    }, []);

    if (!mounted) {
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
            overflow="hidden"
        >
            {/* Partículas criadas com divs simples */}
            {Array.from({ length: 40 }).map((_, i) => (
                <Box
                    key={i}
                    className="particle"
                    position="absolute"
                    borderRadius="50%"
                    bg={
                        i % 3 === 0
                            ? "rgba(139, 92, 246, 0.3)"
                            : i % 3 === 1
                                ? "rgba(236, 72, 153, 0.3)"
                                : "rgba(99, 102, 241, 0.3)"
                    }
                    width={`${Math.random() * 3 + 2}px`}
                    height={`${Math.random() * 3 + 2}px`}
                    left={`${Math.random() * 100}%`}
                    top={`${Math.random() * 100}%`}
                    as="div"
                    style={{
                        animation: `float ${Math.random() * 20 + 10}s linear infinite`,
                        animationDelay: `${Math.random() * -20}s`
                    }}
                    sx={{
                        "@keyframes float": {
                            "0%": {
                                transform: `translate(0, 0) rotate(0deg)`,
                                opacity: 0,
                            },
                            "10%": {
                                opacity: 0.3,
                            },
                            "90%": {
                                opacity: 0.3,
                            },
                            "100%": {
                                transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100
                                    }px) rotate(360deg)`,
                                opacity: 0,
                            },
                        },
                    }}
                />
            ))}

            {/* Efeito de gradiente de fundo */}
            <Box
                position="absolute"
                top="20%"
                left="10%"
                width="500px"
                height="500px"
                borderRadius="50%"
                bg="radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)"
                filter="blur(60px)"
                animation="pulse 8s ease-in-out infinite"
                sx={{
                    "@keyframes pulse": {
                        "0%, 100%": {
                            transform: "scale(1)",
                            opacity: 0.5,
                        },
                        "50%": {
                            transform: "scale(1.2)",
                            opacity: 0.8,
                        },
                    },
                }}
            />

            <Box
                position="absolute"
                bottom="10%"
                right="15%"
                width="400px"
                height="400px"
                borderRadius="50%"
                bg="radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)"
                filter="blur(60px)"
                as="div"
                style={{
                    animation: "pulse 10s ease-in-out infinite",
                    animationDelay: "2s"
                }}
            />
        </Box>
    );
};

export default ParticlesBackground;

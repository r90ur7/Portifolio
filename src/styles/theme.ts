import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const colors = {
    brand: {
        50: "#f0e4ff",
        100: "#cbb2ff",
        200: "#a480ff",
        300: "#7a4dff",
        400: "#531aff",
        500: "#3900e6",
        600: "#2d00b4",
        700: "#200082",
        800: "#140051",
        900: "#080020",
    },
    dark: {
        bg: "#0F172A",
        bgSecondary: "#1E293B",
        surface: "rgba(30, 41, 59, 0.7)",
        border: "rgba(148, 163, 184, 0.1)",
    },
    accent: {
        cyan: "#06b6d4",
        purple: "#8b5cf6",
        pink: "#ec4899",
        glow: "rgba(139, 92, 246, 0.5)",
    },
    gradients: {
        primary: "linear(to-r, #8b5cf6, #ec4899)",
        secondary: "linear(to-r, #06b6d4, #3b82f6)",
        dark: "linear(to-b, #0F172A, #0F1729)",
        card: "linear(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.6) 100%)",
    }
};

const fonts = {
    heading: '"Outfit", "Inter", -apple-system, system-ui, sans-serif',
    body: '"Inter", -apple-system, system-ui, sans-serif',
    mono: '"Fira Code", monospace',
};

const styles = {
    global: (props: any) => ({
        body: {
            bg: mode("gray.50", "#0F172A")(props),
            color: mode("gray.800", "gray.100")(props),
            fontFamily: "body",
        },
        "*::selection": {
            bg: "brand.400",
            color: "white",
        },
        "::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
        },
        "::-webkit-scrollbar-track": {
            bg: "transparent",
        },
        "::-webkit-scrollbar-thumb": {
            bg: "whiteAlpha.200",
            borderRadius: "full",
            _hover: {
                bg: "whiteAlpha.300",
            },
        },
    }),
};

const components = {
    Button: {
        baseStyle: {
            fontWeight: "bold",
            borderRadius: "lg",
        },
        variants: {
            primary: {
                bgGradient: "linear(to-r, brand.400, accent.purple)",
                color: "white",
                _hover: {
                    bgGradient: "linear(to-r, brand.500, brand.400)",
                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                    transform: "translateY(-2px)",
                },
                _active: {
                    transform: "translateY(0)",
                },
            },
            outline: {
                border: "1px solid",
                borderColor: "whiteAlpha.300",
                color: "white",
                _hover: {
                    bg: "whiteAlpha.100",
                    borderColor: "brand.400",
                },
            },
            ghost: {
                color: "gray.300",
                _hover: {
                    bg: "whiteAlpha.100",
                    color: "white",
                },
            },
        },
    },
    Card: {
        baseStyle: {
            container: {
                bg: "dark.surface",
                backdropFilter: "blur(12px)",
                border: "1px solid",
                borderColor: "dark.border",
                borderRadius: "xl",
            },
        },
    },
    Heading: {
        baseStyle: {
            fontWeight: "700",
            letterSpacing: "-0.02em",
        },
    },
};

const shadows = {
    glow: "0 0 20px rgba(139, 92, 246, 0.3)",
    glowLg: "0 0 40px rgba(139, 92, 246, 0.4)",
    card: "0 8px 32px rgba(0, 0, 0, 0.2)",
};

const theme = extendTheme({
    config,
    colors,
    fonts,
    styles,
    components,
    shadows,
});

export default theme;

import { motion } from 'framer-motion';
import { Box, BoxProps } from '@chakra-ui/react';
import React, { ReactNode, useState, useEffect } from 'react';

interface AnimatedSectionProps extends BoxProps {
    children: ReactNode;
    delay?: number;
}

const MotionBox = motion(Box);

const AnimatedSection = React.memo(({ children, delay = 0, ...props }: AnimatedSectionProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Durante SSR e hidratação inicial, renderiza sem animação
    if (!isMounted) {
        return (
            <Box width="100%" {...props}>
                {children}
            </Box>
        );
    }

    // Após hidratação, renderiza com animação
    return (
        <MotionBox
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
            width="100%"
            style={{ willChange: 'transform, opacity' }}
            {...props}
        >
            {children}
        </MotionBox>
    );
});

AnimatedSection.displayName = 'AnimatedSection';

export default AnimatedSection;
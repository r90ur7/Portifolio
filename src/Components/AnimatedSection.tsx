import { motion } from 'framer-motion';
import { Box, BoxProps } from '@chakra-ui/react';
import React, { ReactNode, useState, useEffect, startTransition } from 'react';

interface AnimatedSectionProps extends BoxProps {
    children: ReactNode;
    delay?: number;
}

const MotionBox = motion(Box);

const AnimatedSection = React.memo(({ children, delay = 0, ...props }: AnimatedSectionProps) => {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Use startTransition to prevent hydration errors
        startTransition(() => {
            setIsHydrated(true);
        });
    }, []);

    return (
        <MotionBox
            initial={isHydrated ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
            whileInView={isHydrated ? { opacity: 1, y: 0 } : undefined}
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
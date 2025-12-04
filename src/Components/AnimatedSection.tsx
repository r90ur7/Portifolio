import { motion } from 'framer-motion';
import { Box, BoxProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface AnimatedSectionProps extends BoxProps {
    children: ReactNode;
    delay?: number;
}

const MotionBox = motion(Box);

const AnimatedSection = React.memo(({ children, delay = 0, ...props }: AnimatedSectionProps) => (
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
));

export default AnimatedSection;
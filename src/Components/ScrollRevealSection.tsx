import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface ScrollRevealSectionProps extends BoxProps {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
    threshold?: number;
    triggerOnce?: boolean;
}

const ScrollRevealSection = ({
    children,
    delay = 0,
    direction = 'up',
    threshold = 0.1,
    triggerOnce = true,
    ...boxProps
}: ScrollRevealSectionProps) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold,
        triggerOnce,
        rootMargin: '-50px 0px',
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        } else if (!triggerOnce) {
            controls.start('hidden');
        }
    }, [controls, inView, triggerOnce]);

    const getDirectionVariants = (): Variants => {
        const baseVariants: Variants = {
            hidden: {
                opacity: 0,
            },
            visible: {
                opacity: 1,
                transition: {
                    duration: 0.6,
                    delay,
                    ease: [0.25, 0.46, 0.45, 0.94],
                },
            },
        };

        switch (direction) {
            case 'up':
                return {
                    hidden: { ...baseVariants.hidden, y: 50 },
                    visible: { ...baseVariants.visible, y: 0 },
                };
            case 'down':
                return {
                    hidden: { ...baseVariants.hidden, y: -50 },
                    visible: { ...baseVariants.visible, y: 0 },
                };
            case 'left':
                return {
                    hidden: { ...baseVariants.hidden, x: 50 },
                    visible: { ...baseVariants.visible, x: 0 },
                };
            case 'right':
                return {
                    hidden: { ...baseVariants.hidden, x: -50 },
                    visible: { ...baseVariants.visible, x: 0 },
                };
            case 'fade':
            default:
                return baseVariants;
        }
    };

    return (
        <Box ref={ref} {...boxProps}>
            <motion.div
                initial="hidden"
                animate={controls}
                variants={getDirectionVariants()}
            >
                {children}
            </motion.div>
        </Box>
    );
};

export default ScrollRevealSection;


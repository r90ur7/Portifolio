// S - Single Responsibility Principle
// Hook para gerenciar animações

import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AnimationConfig, FormVariants } from '../types/contact.types';

export const useContactFormAnimation = (config: AnimationConfig) => {
    const controls = useAnimation();

    const [ref, inView] = useInView({
        threshold: config.threshold,
        triggerOnce: config.triggerOnce,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    const variants: FormVariants = {
        containerVariants: {
            hidden: { opacity: 0, y: 50, transition: { duration: 0.5 } },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        },
        itemVariants: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }
    };

    return {
        ref,
        controls,
        variants
    };
};

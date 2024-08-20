import { motion } from 'framer-motion'
import { VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
    children: ReactNode
}

const AnimatedSection = ({ children }: AnimatedSectionProps) => (
    <VStack
        spacing={4}
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transitionDuration={
            "0.5"
        }
    >
        {children}
    </VStack>
)

export default AnimatedSection
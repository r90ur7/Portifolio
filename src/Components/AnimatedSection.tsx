import { motion } from 'framer-motion'
import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
    children: ReactNode
}

const AnimatedSection = ({ children }: AnimatedSectionProps) => (
    <Box as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 as any }}>
        {children}
    </Box>
)

export default AnimatedSection
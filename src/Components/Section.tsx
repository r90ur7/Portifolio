import { Box, Heading } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface SectionProps {
    title: string
    children: ReactNode
}

const Section = ({ title, children }: SectionProps) => (
    <Box width="100%" textAlign="center" mb={8}>
        <Heading as="h2" size="xl" color="blue.700" mb={4}>{title}</Heading>
        {children}
    </Box>
)

export default Section
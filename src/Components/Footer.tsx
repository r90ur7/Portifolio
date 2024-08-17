// components/Footer.tsx
import { Box, HStack, Text, Icon } from '@chakra-ui/react'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'

const Footer = () => (
    <Box py={6} bg="brand.900" color="white">
        <HStack justify="center" spacing={8}>
            <Icon as={FaLinkedin} boxSize={6} />
            <Icon as={FaGithub} boxSize={6} />
            <Icon as={FaTwitter} boxSize={6} />
        </HStack>
        <Text textAlign="center" mt={4}>© 2024 Meu Portfólio. Todos os direitos reservados.</Text>
    </Box>
)

export default Footer

// components/AboutMe.tsx
import { Box, Flex, Heading, Text, Image, VStack, HStack, Icon } from '@chakra-ui/react'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'

const AboutMe = () => (
    <Box py={20} px={10} bg="brand.700" color="white">
        <Flex direction={{ base: 'column', md: 'row' }} align="center">
            <Image
                borderRadius="full"
                boxSize="150px"
                src="/me.jpg"
                alt="Minha Foto"
                mb={{ base: 8, md: 0 }}
                mr={{ md: 10 }}
            />
            <VStack align="start" spacing={4}>
                <Heading as="h2" size="xl">Sobre Mim</Heading>
                <Text fontSize="lg">
                    Sou um desenvolvedor fullstack com paixão por criar soluções digitais inovadoras...
                </Text>
                <HStack spacing={4}>
                    <Icon as={FaLinkedin} boxSize={6} />
                    <Icon as={FaGithub} boxSize={6} />
                    <Icon as={FaTwitter} boxSize={6} />
                </HStack>
            </VStack>
        </Flex>
    </Box>
)

export default AboutMe

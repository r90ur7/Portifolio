import { Box, SimpleGrid, Heading, VStack, Text } from '@chakra-ui/react'

const skills = [
    { name: 'JavaScript', level: 'Avançado' },
    { name: 'React', level: 'Avançado' },
    { name: 'Next.js', level: 'Intermediário' },
]

const Skills = () => (
    <Box py={20} px={10} bg="brand.50">
        <Heading as="h2" size="xl" mb={8} color="brand.700">Habilidades</Heading>
        <SimpleGrid columns={[2, 3, 4]} spacing={8}>
            {skills.map(skill => (
                <Box key={skill.name} p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
                    <Heading fontSize="lg">{skill.name}</Heading>
                    <Text>{skill.level}</Text>
                </Box>
            ))}
        </SimpleGrid>
    </Box>
)

export default Skills

import { Box, SimpleGrid, Heading, Text } from '@chakra-ui/react'
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react'
import axios from 'axios'

const Projects = () => {
    const [repos, setRepos] = useState<any>([])

    useEffect(() => {
        const fetchRepos = async () => {
            const { data } = await axios.get('https://api.github.com/users/seu-usuario/starred')
            setRepos(data)
        }
        fetchRepos()
    }, [])

    return (
        <Box py={20} px={10} bg="brand.100">
            <Heading as="h2" size="xl" mb={8} color="brand.700">Projetos</Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={8}>
                {repos.map((repo: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined }) => (
                    <Box key={repo.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
                        <Heading fontSize="xl">{repo.name}</Heading>
                        <Text mt={4}>{repo.description}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    )
}

export default Projects

// components/Sidebar.tsx
import { Box, Flex, Heading, Text, Image, VStack, HStack, Icon, Link, Button } from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const Sidebar = () => {

    const [isFixed, setIsFixed] = useState(true);

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [numbOIfLines, setNumberOflines] = useState(100);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
    const toggleNumbers = () => {
        if (numbOIfLines == 2) {
            setNumberOflines(!isCollapsed ? 2 : 100);
        } else {
            setTimeout(() => {
                setNumberOflines(!isCollapsed ? 2 : 100);
            }, 50);
        }
    }

    return (<Box position={"fixed"} right={0} left={5} as="aside" w={{ base: "75%", md: "25%" }} p={4} bg="#4A148C" color="white">
        <Flex direction="column" align="center">
            <Image
                borderRadius="full"
                boxSize="150px"
                src="/assets/perfil.png"
                alt="Minha Foto"
                mb={4}
            />
            <Heading as="h2" size="lg" mb={4}>Rallenson Silva</Heading>
            <Button onClick={() => {
                toggleCollapse()
                toggleNumbers();
            }} mb={4}>
                {isCollapsed ? "Expandir" : "Colapsar"}
            </Button>

            <motion.div
                initial={{ height: 0, opacity: 1 }}
                animate={{ height: isCollapsed ? 50 : 'auto' }}
                transition={{ duration: 0.5 }}
                style={{ overflow: 'hidden' }}
            >
                <Text textAlign="center" mb={4} noOfLines={numbOIfLines}>
                    Sou um Programador Full-Stack e Front-End dedicado a transformar ideias em realidade por meio da tecnologia.
                    Graduando em Sistemas de Informação na Faculdade UGB-Ferp, possuo uma sólida formação acadêmica e experiência prática no campo.
                    Minha expertise inclui o desenvolvimento de sistemas e sites do zero, bem como a configuração, ajuste e manutenção de plataformas existentes.
                    Além disso, atuo como Web Designer e Designer Gráfico garantindo qualidade em seu site.
                    Sou um profissional organizado e ágil, trabalhando em tempo integral e comprometido em entregar trabalhos de alta qualidade, mesmo sob prazos apertados.
                    Estou confiante de que juntos podemos realizar um excelente trabalho, formando uma parceria valiosa e agregando muito valor ao seu projeto.
                    Resumo de 2 anos experiência profissional:
                    Desenvolvimento de sistemas e sites.
                    Experiência em Desenvolvimento React/Nextjs.
                    Criação de páginas de vendas.
                    Desenvolvimento de plataformas de e-commerce.
                    Proficiência em ferramentas como Adobe Photoshop, Canva e Figma.
                    Conhecimento em C#, Python e Js/Ts.
                    Conhecimento em PHP, HTML e CSS.
                    Ampla experiência na criação de páginas de vendas utilizando React e VtexIO.
                </Text>
            </motion.div>

            <HStack spacing={4} mb={4}>
                <Link href="https://www.linkedin.com/in/gustavo-rallenson/" isExternal>
                    <Icon as={FaLinkedin} boxSize={6} />
                </Link>
                <Link href="https://github.com/r90ur7" isExternal>
                    <Icon as={FaGithub} boxSize={6} />
                </Link>
            </HStack>
        </Flex>
        {/* <Contact/> */}
    </Box>
    );
};

export default Sidebar;
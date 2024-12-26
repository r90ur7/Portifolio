import React from "react";
import Slider from "react-slick";
import { Box, Center, Flex, Heading, Link, VStack, Text } from "@chakra-ui/react";
import { FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sidebar from "@/Components/sideBar";
import Contact from "@/Components/Contact";
import Experience from "@/Components/Experiencie";

const technologies = [
    { name: "Node.js", icon: <FaNodeJs size={40} /> },
    { name: "Python", icon: <FaPython size={40} /> },
    { name: "JavaScript", icon: <FaJs size={40} /> },
    { name: "HTML5", icon: <FaHtml5 size={40} /> },
    { name: "CSS3", icon: <FaCss3Alt size={40} /> },
];

const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
    pauseOnFocus: true,
    pauseOnHover: true
};

const IndexPage = () => (
    <Flex position={"relative"} direction="column" minHeight="100vh" bgGradient="linear(to-b, #2d0331, #001b36)" color="white">

        {/* Header */}
        <Box as="header" bg="#4A148C" p={4} shadow="md">
            <Flex justify="space-between" align="center">
                <Heading size="lg">logo</Heading>
                <Flex gap={4}>
                    <Link href="#portfolio" _hover={{ textDecoration: "underline" }}>Portfólio</Link>
                    <Link href="#about" _hover={{ textDecoration: "underline" }}>Sobre Mim</Link>
                    <Link href="#work" _hover={{ textDecoration: "underline" }}>Trabalhos</Link>
                    <Link href="#experience" _hover={{ textDecoration: "underline" }}>Experiência</Link>
                    <Link href="#contact" _hover={{ textDecoration: "underline" }}>Contato</Link>
                </Flex>
            </Flex>
        </Box>
        {/* Main Section */}
        <VStack as="main" spacing={8} mt={10} flexGrow={1} align="center">
            <VStack alignItems={"flex-start"} justifyContent={"flex-end"} marginTop={0} mr={5} flexDirection={"row"} width={"75%"} h={"100vh"} spacing={8} mt={10} flexGrow={1} align="center">
                <Box position={"relative"} flex={1}>
                    <Sidebar />
                </Box>
                {/* Technologies Carousel */}
                <Box flex={3} id="portfolio" w="80%" p={6} bg="rgba(0,0,0,0.5)" borderRadius="lg">
                    <Slider {...sliderSettings}>
                        {technologies.map((tech, index) => (
                            <Center >
                                <Box key={index} p={4} textAlign="center" sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                    {tech.icon}
                                    <Heading size="md" mt={2}>{tech.name}</Heading>
                                </Box>
                            </Center>
                        ))}
                    </Slider>
                </Box>

            </VStack>
            {/* Sidebar */}
        </VStack>
        {/* <Experience /> */}
        {/* Footer */}
        {/* <Box position={"relative"}>
            <Contact />
        </Box> */}
        <Flex as='footer' position={"absolute"} bottom={0} minWidth={"full"}>
            <Box minWidth={"full"} as="footer" bg="#240046" p={6} textAlign="center">
                <Text fontSize="sm">&copy; 2024 Rallenson Silva - Desenvolvedor Web e Games</Text>
                <Text fontSize="sm" mt={2}>
                    Feito com paixão com React e Chakra UI. Explorando as profundezas da criatividade.
                </Text>
            </Box>
        </Flex >
    </Flex >
);

export default IndexPage;
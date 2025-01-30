import React from "react";
import Slider from "react-slick";
import { Box, Center, Flex, Heading, Link, VStack, Text } from "@chakra-ui/react";
import { FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sidebar from "@/Components/sideBar";
import Contact from "@/Components/Contact";
import Experience from "@/Components/Experiencie";
import Header from "@/Components/Header/header";

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
    <Box as="main" bgGradient="linear(to-b, #0F172A, #0F1729)" color="white" minHeight="100vh">
        <Flex wrap={"wrap"} p={"8px 15% 8px 15%"} direction="column">
            <Header />
        </Flex >
    </Box>
);

export default IndexPage;
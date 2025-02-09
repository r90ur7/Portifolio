import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/Components/Header/header";
import Footer from "@/Components/Footer/footer";
import Projects from "@/Components/modules/projects";
import Education from "@/Components/modules/education";
import ProfessionalExperience from "@/Components/modules/experiencie";
import About from "@/Components/modules/about";
import TechnologiesSection from "@/Components/modules/carrousel";

const IndexPage = () => (
    <Box
        as="main"
        bgGradient="linear(to-b, #0F172A, #0F1729)"
        color="white"
        minHeight="100vh"
        position="relative"
        overflow="hidden"
    >

        <Box position="relative" zIndex={2}>
            <Flex wrap="wrap" p="75px 15%" direction="column">
                <Header />
            </Flex>
            <Box bg="rgba(15, 23, 42, 0.95)">
                <About />
                <Education />
                <ProfessionalExperience />
                <TechnologiesSection />
                <Projects />
                <Footer />
            </Box>
        </Box>
    </Box>
);

export default IndexPage;
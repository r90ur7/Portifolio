import { Box } from "@chakra-ui/react"
import AboutMe from "../Components/AboutMe"
import Contact from "../Components/Contact"
import Experience from "../Components/Experiencie"
import Footer from "../Components/Footer"
import Hero from "../Components/Hero"
import Projects from "../Components/Projects"
import Skills from "../Components/Skills"
import React from "react"

const IndexPage = () => (
    <Box>
        <Hero />
        <AboutMe />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
    </Box>
)

export default IndexPage

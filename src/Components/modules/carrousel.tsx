import { Box, Heading, Flex } from "@chakra-ui/react";
import { FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt, FaReact, FaDatabase, FaGitAlt, FaDocker, FaAws } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MotionBox = motion(Box);

const technologies = [
    { name: "Node.js", icon: <FaNodeJs />, color: "#68A063" },
    { name: "Python", icon: <FaPython />, color: "#3776AB" },
    { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
    { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
    { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
    { name: "React", icon: <FaReact />, color: "#61DAFB" },
    { name: "SQL", icon: <FaDatabase />, color: "#00758F" },
    { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
    { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
    { name: "AWS", icon: <FaAws />, color: "#FF9900" },
];

const TechnologiesSection = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: { opacity: 0, y: 50, transition: { duration: 0.5 } },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 2200,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: true,
        arrows: false,
        customPaging: function (i: number) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 40 }}>
                    <span style={{ fontSize: '2rem', color: technologies[i].color, filter: 'drop-shadow(0 0 5px rgba(182, 80, 242, 0.3))' }}>
                        {technologies[i].icon}
                    </span>
                </div>
            );
        },
        dotsClass: "slick-dots custom-tech-dots",
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 }
            }
        ]
    };

    return (
        <MotionBox
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            maxW="1200px"
            mx="auto"
            py={20}
            px={{ base: 4, md: 8 }}
            id="technologies"
        >
            <Heading
                as="h2"
                fontSize="4xl"
                fontWeight="bold"
                bgGradient="linear(to-r, #B650F2, #9AA6C4)"
                bgClip="text"
                textAlign="center"
                mb={16}
            >
                Tecnologias que Utilizo
            </Heading>

            <Box
                w="100%"
                maxW="1200px"
                mx="auto"
                position="relative"
            >
                <Slider {...settings}>
                    {technologies.map((tech, index) => (
                        <MotionBox
                            key={index}
                            px={4}
                            textAlign="center"
                            variants={itemVariants}
                            initial="hidden"
                            animate={controls}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Box
                                p={6}
                                bg="rgba(13, 27, 42, 0.7)"
                                borderRadius="2xl"
                                backdropFilter="blur(10px)"
                                border="1px solid"
                                borderColor="rgba(182, 80, 242, 0.3)"
                                boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                            >
                                <Flex
                                    justify="center"
                                    align="center"
                                    fontSize="4rem"
                                    color={tech.color}
                                    mb={4}
                                    sx={{
                                        '& > svg': {
                                            transition: 'all 0.3s',
                                            filter: 'drop-shadow(0 0 5px rgba(182, 80, 242, 0.3))'
                                        }
                                    }}
                                    _hover={{
                                        '& > svg': {
                                            transform: 'scale(1.2)',
                                            filter: 'drop-shadow(0 0 15px rgba(182, 80, 242, 0.5))'
                                        }
                                    }}
                                >
                                    {tech.icon}
                                </Flex>
                                <Heading
                                    as="h3"
                                    size="md"
                                    color="gray.200"
                                    fontWeight="semibold"
                                >
                                    {tech.name}
                                </Heading>
                            </Box>
                        </MotionBox>
                    ))}
                </Slider>
            </Box>
        </MotionBox>
    );
};

export default TechnologiesSection;
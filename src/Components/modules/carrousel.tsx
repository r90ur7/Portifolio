import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Box, Heading, Flex, useMediaQuery } from "@chakra-ui/react";
import { FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import Slider from "react-slick";
import { useEffect, useState } from 'react';

const technologies = [
    { name: "Node.js", icon: <FaNodeJs />, color: "#68A063" },
    { name: "Python", icon: <FaPython />, color: "#3776AB" },
    { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
    { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
    { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
    { name: "React", icon: <FaReact />, color: "#61DAFB" },
];

const Carrousel = () => {
    const { scrollY } = useScroll();
    const [baseScroll, setBaseScroll] = useState<number | null>(null);
    const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");

    const { ref: inViewRef, inView } = useInView({
        threshold: 0.5,
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView && baseScroll === null) {
            setBaseScroll(scrollY.get());
        }
    }, [inView, baseScroll, scrollY]);

    useEffect(() => {
        const unsubscribe = scrollY.onChange((latest) => {
            if (baseScroll !== null && latest < baseScroll) {
                setBaseScroll(null);
            }
        });
        return () => unsubscribe();
    }, [scrollY, baseScroll]);

    const y = useTransform(scrollY, (latest) => {
        if (baseScroll === null || latest < baseScroll) return 0;
        return Math.min((latest - baseScroll) * 0.5, 200);
    });

    const scale = useTransform(scrollY, (latest) => {
        if (baseScroll === null || latest < baseScroll) return 1;
        return Math.max(1 - (latest - baseScroll) * 0.0005, 0.9);
    });

    const opacity = useTransform(scrollY, (latest) => {
        if (baseScroll === null || latest < baseScroll) return 1;
        return Math.max(1 - (latest - baseScroll) * 0.001, 0);
    });

    const settings = {
        dots: false,
        infinite: true,
        speed: 2200,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 }
            }
        ],
        pauseOnHover: true,
        arrows: false
    };

    const [topPosition, setTopPosition] = useState('45%');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setTopPosition('78%');
            } else {
                setTopPosition('45%');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isLargerThan1024) {
        return null;
    }

    return (
        <motion.div
            style={{
                y,
                scale,
                opacity,
                position: 'absolute',
                top: topPosition,
                left: 0,
                right: 0,
                zIndex: -1,
                transform: 'translateY(-50%)'
            }}
            ref={inViewRef}
        >
            <Flex
                zIndex={1}
                minH="10vh"
                align="center"
                justify="center"
                position="relative"
                overflow="hidden"
                id='carrousel'
            >
                <Box
                    position="absolute"
                    w="100%"
                    h="100%"
                    bgGradient="linear(to-b, rgba(182, 80, 242, 0.05), rgba(13, 27, 42, 0.1))"
                    backdropFilter="blur(10px)"
                    boxShadow="0 0 50px rgba(182, 80, 242, 0.1)"
                />

                <Box
                    w="100%"
                    maxW="1200px"
                    mx="auto"
                    py={20}
                    position="relative"
                >
                    <Slider {...settings}>
                        {technologies.map((tech, index) => (
                            <Box
                                key={index}
                                px={4}
                                textAlign="center"
                                _hover={{ transform: "translateY(-10px)" }}
                                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
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
                            </Box>
                        ))}
                    </Slider>
                </Box>
            </Flex>
        </motion.div>
    );
};

export default Carrousel;
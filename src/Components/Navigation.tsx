import React, { useState, useEffect } from 'react';
import { Box, Flex, Link, IconButton, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp, FaHome, FaUser, FaGraduationCap, FaBriefcase, FaCode, FaProjectDiagram, FaEnvelope, FaMagic } from 'react-icons/fa';
import { useAnimations } from '@/contexts/AnimationContext';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    { id: 'home', label: 'Início', icon: FaHome },
    { id: 'about', label: 'Sobre', icon: FaUser },
    { id: 'education', label: 'Formação', icon: FaGraduationCap },
    { id: 'experience', label: 'Experiência', icon: FaBriefcase },
    { id: 'skills', label: 'Habilidades', icon: FaCode },
    { id: 'projects', label: 'Projetos', icon: FaProjectDiagram },
    { id: 'contact', label: 'Contato', icon: FaEnvelope },
];

const Navigation = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [showScrollTop, setShowScrollTop] = useState(false);
    const { animationsEnabled, toggleAnimations } = useAnimations();

    const bgColor = useColorModeValue('rgba(15, 23, 42, 0.95)', 'rgba(15, 23, 42, 0.95)');
    const borderColor = useColorModeValue('rgba(182, 80, 242, 0.3)', 'rgba(182, 80, 242, 0.3)');
    const activeColor = useColorModeValue('#B650F2', '#C86BFD');

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            // Mostrar menu após rolar 100px
            setIsVisible(scrollY > 100);

            // Mostrar botão "Voltar ao topo" após rolar 300px
            setShowScrollTop(scrollY > 300);

            // Detectar seção ativa
            const sections = navItems.map(item => {
                const element = document.getElementById(item.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return {
                        id: item.id,
                        top: rect.top,
                        bottom: rect.bottom,
                    };
                }
                return null;
            }).filter(Boolean) as Array<{ id: string; top: number; bottom: number }>;

            // Verificar se estamos no topo
            if (scrollY < 200) {
                setActiveSection('home');
                return;
            }

            // Encontrar a seção visível
            const currentSection = sections.find(section => {
                return section.top <= 150 && section.bottom >= 150;
            });

            if (currentSection) {
                setActiveSection(currentSection.id);
            } else {
                // Se nenhuma seção está visível, usar a última que passou
                const passedSections = sections.filter(s => s.top < 150);
                if (passedSections.length > 0) {
                    const lastPassed = passedSections[passedSections.length - 1];
                    setActiveSection(lastPassed.id);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Verificar estado inicial

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        } else if (sectionId === 'home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <MotionBox
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        position="fixed"
                        top={0}
                        left={0}
                        right={0}
                        zIndex={1000}
                        bg={bgColor}
                        backdropFilter="blur(10px)"
                        borderBottom="1px solid"
                        borderColor={borderColor}
                        boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
                    >
                        <Flex
                            maxW="1400px"
                            mx="auto"
                            px={{ base: 4, md: 8 }}
                            py={4}
                            align="center"
                            justify="center"
                            gap={{ base: 2, md: 4 }}
                            flexWrap="wrap"
                        >
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;

                                return (
                                    <Link
                                        key={item.id}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(item.id);
                                        }}
                                        href={`#${item.id}`}
                                        position="relative"
                                        px={{ base: 3, md: 4 }}
                                        py={2}
                                        borderRadius="md"
                                        fontSize={{ base: 'sm', md: 'md' }}
                                        fontWeight={isActive ? 'bold' : 'medium'}
                                        color={isActive ? activeColor : 'gray.300'}
                                        transition="all 0.3s ease"
                                        _hover={{
                                            color: activeColor,
                                            transform: 'translateY(-2px)',
                                        }}
                                        display="flex"
                                        alignItems="center"
                                        gap={2}
                                    >
                                        <Icon size={16} />
                                        <Box as="span" display={{ base: 'none', md: 'inline' }}>
                                            {item.label}
                                        </Box>
                                        {isActive && (
                                            <MotionBox
                                                layoutId="activeIndicator"
                                                position="absolute"
                                                bottom={0}
                                                left={0}
                                                right={0}
                                                height="2px"
                                                bgGradient="linear(to-r, #B650F2, #C86BFD)"
                                                borderRadius="full"
                                                initial={false}
                                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </Flex>
                    </MotionBox>
                )}
            </AnimatePresence>

            {/* Botão Voltar ao Topo */}
            <AnimatePresence>
                {showScrollTop && (
                    <MotionFlex
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        position="fixed"
                        bottom={8}
                        right={8}
                        zIndex={999}
                    >
                        <IconButton
                            aria-label="Voltar ao topo"
                            icon={<FaArrowUp />}
                            onClick={scrollToTop}
                            size="lg"
                            borderRadius="full"
                            bgGradient="linear(to-r, #B650F2, #C86BFD)"
                            color="white"
                            boxShadow="0 4px 20px rgba(182, 80, 242, 0.4)"
                            _hover={{
                                bgGradient: "linear(to-r, #C86BFD, #B650F2)",
                                boxShadow: "0 6px 30px rgba(182, 80, 242, 0.6)",
                            }}
                            transition="all 0.3s ease"
                        />
                    </MotionFlex>
                )}
            </AnimatePresence>

            {/* Botão Toggle Animações */}
            <AnimatePresence>
                {showScrollTop && (
                    <MotionFlex
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        position="fixed"
                        bottom={8}
                        right={24}
                        zIndex={999}
                    >
                        <Tooltip
                            label={animationsEnabled ? "Desativar Animações" : "Ativar Animações"}
                            placement="left"
                            hasArrow
                        >
                            <IconButton
                                aria-label="Toggle animations"
                                icon={<FaMagic />}
                                onClick={() => {
                                    console.log('🔘 Toggle button clicked! Current state:', animationsEnabled);
                                    toggleAnimations();
                                }}
                                size="lg"
                                borderRadius="full"
                                bgGradient={animationsEnabled ? "linear(to-r, #B650F2, #C86BFD)" : "gray.600"}
                                color="white"
                                boxShadow={animationsEnabled ? "0 4px 20px rgba(182, 80, 242, 0.4)" : "0 4px 20px rgba(0, 0, 0, 0.3)"}
                                _hover={{
                                    bgGradient: animationsEnabled ? "linear(to-r, #C86BFD, #B650F2)" : "gray.500",
                                    boxShadow: animationsEnabled ? "0 6px 30px rgba(182, 80, 242, 0.6)" : "0 6px 30px rgba(0, 0, 0, 0.5)",
                                }}
                                transition="all 0.3s ease"
                                opacity={animationsEnabled ? 1 : 0.6}
                            />
                        </Tooltip>
                    </MotionFlex>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;


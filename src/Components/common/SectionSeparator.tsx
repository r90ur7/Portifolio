import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const SectionSeparator = () => {
    return (
        <Flex
            align="center"
            justify="center"
            py={20}
            w="full"
            as={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            <Box
                h="1px"
                w={{ base: "30%", md: "20%" }}
                bgGradient="linear(to-r, transparent, purple.500)"
                opacity={0.4}
            />
            <Box
                mx={6}
                w="8px"
                h="8px"
                transform="rotate(45deg)"
                bg="purple.400"
                boxShadow="0 0 15px 2px rgba(159, 122, 234, 0.6)"
                borderRadius="1px"
            />
            <Box
                h="1px"
                w={{ base: "30%", md: "20%" }}
                bgGradient="linear(to-l, transparent, purple.500)"
                opacity={0.4}
            />
        </Flex>
    );
};

export default SectionSeparator;

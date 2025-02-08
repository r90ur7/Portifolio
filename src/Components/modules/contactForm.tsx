// ContactForm.jsx
import { Box, Text, Input, Textarea, Button, Flex } from "@chakra-ui/react";
import { FaRegEnvelope } from "react-icons/fa";

const ContactForm = () => {
    return (
        <Box
            maxW="1200px"
            mx="auto"
            px={4}
            py={20}
            bg="linear-gradient(180deg, rgba(54, 37, 88, 0.8) 0%, rgba(13, 27, 42, 0.9) 100%)"
            borderRadius="2xl"
            backdropFilter="blur(10px)"
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
        >
            <Text
                fontSize="4xl"
                fontWeight="bold"
                bgGradient="linear(to-r, #B650F2, #9AA6C4)"
                bgClip="text"
                textAlign="center"
                mb={12}
            >
                Vamos Trabalhar Juntos?
            </Text>

            <Flex direction="column" maxW="600px" mx="auto" gap={6}>
                <Input
                    placeholder="Seu Nome"
                    size="lg"
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid"
                    borderColor="rgba(182, 80, 242, 0.3)"
                    _focus={{ borderColor: "#B650F2" }}
                    _placeholder={{ color: "gray.400" }}
                />

                <Input
                    placeholder="Seu Email"
                    type="email"
                    size="lg"
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid"
                    borderColor="rgba(182, 80, 242, 0.3)"
                    _focus={{ borderColor: "#B650F2" }}
                    _placeholder={{ color: "gray.400" }}
                />

                <Textarea
                    placeholder="Sua Mensagem"
                    size="lg"
                    rows={6}
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid"
                    borderColor="rgba(182, 80, 242, 0.3)"
                    _focus={{ borderColor: "#B650F2" }}
                    _placeholder={{ color: "gray.400" }}
                />

                <Button
                    size="lg"
                    bgGradient="linear(to-r, #B650F2, #362558)"
                    color="white"
                    _hover={{ bgGradient: "linear(to-r, #C86BFD, #48307A)" }}
                    _active={{ transform: "scale(0.98)" }}
                    rightIcon={<FaRegEnvelope />}
                    type="submit"
                >
                    Enviar Mensagem
                </Button>
            </Flex>
        </Box>
    );
};

export default ContactForm;
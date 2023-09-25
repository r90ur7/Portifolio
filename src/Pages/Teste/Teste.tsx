import React from "react";
import { Flex, Button, Stack, Input, Text, FormControl, FormLabel } from "@chakra-ui/react";

const Teste = () =>{
    return (
        <Flex
            w="100vw"
            h="100vh"
            align="center"
            justify="center">
            <Flex
                as="form"
                w="100%"
                maxWidth="360"
                bg="gray.800"
                p="8"
                borderRadius="8"
                flexDir="column">
                <FormControl>
                    <FormLabel>E-mail</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        focusBorderColor="pink.500"
                        bgColor="gray.900"
                        size="lg"
                        variant="filled"
                        _hover={{
                            bgColor:
                                "gray.900",
                        }} />
                    <FormLabel>Senha</FormLabel>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        focusBorderColor="pink.500"
                        bgColor="gray.900"
                        size="lg"
                        variant="filled"
                        _hover={{
                            bgColor:
                                "gray.900",
                        }} />
                </FormControl>
                <Button
                    type="submit"
                    mt="6"
                    colorScheme="pink"
                    size="lg">
                    Entrar
                </Button>
            </Flex>
        </Flex>
    )
}
export default Teste;
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FormControl, FormLabel, Input, VStack, Text, useToast, Button, Box, Heading } from '@chakra-ui/react';

const Contact = () => {
    const toast = useToast();

    return (
        <Box display="flex" justifyContent="center"  flexDirection={"column"} alignItems="center" bg="#6E14DBFF" p={8} shadow="md">
            <Heading as="h2" size="lg" mb={4}>Contato</Heading>
            <Formik
                initialValues={{ name: '', email: '', message: '' }}
                onSubmit={(values, actions) => {
                    console.log(values);
                    toast({
                        title: 'Mensagem enviada!',
                        description: 'Sua mensagem foi enviada com sucesso.',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    actions.setSubmitting(false);
                    actions.resetForm();
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <VStack spacing={4} align="stretch" borderRadius="md" width="100%" maxWidth="800px">
                            {/* Nome */}
                            <FormControl>
                                <FormLabel htmlFor="name">Nome</FormLabel>
                                <Field
                                    as={Input}
                                    id="name"
                                    name="name"
                                    bg="white"
                                    color="black"
                                    _hover={{ bg: "gray.100" }}
                                    _focus={{ borderColor: "brand.500" }}
                                />
                                <ErrorMessage name="name">
                                    {(msg) => <Text color="red.400" fontSize="sm">{msg}</Text>}
                                </ErrorMessage>
                            </FormControl>

                            {/* E-mail */}
                            <FormControl>
                                <FormLabel htmlFor="email">E-mail</FormLabel>
                                <Field
                                    as={Input}
                                    id="email"
                                    name="email"
                                    type="email"
                                    bg="white"
                                    color="black"
                                    _hover={{ bg: "gray.100" }}
                                    _focus={{ borderColor: "brand.500" }}
                                />
                                <ErrorMessage name="email">
                                    {(msg) => <Text color="red.400" fontSize="sm">{msg}</Text>}
                                </ErrorMessage>
                            </FormControl>

                            {/* Mensagem */}
                            <FormControl>
                                <FormLabel htmlFor="message">Mensagem</FormLabel>
                                <Field
                                    as={Input}
                                    id="message"
                                    name="message"
                                    bg="white"
                                    color="black"
                                    _hover={{ bg: "gray.100" }}
                                    _focus={{ borderColor: "brand.500" }}
                                />
                                <ErrorMessage name="message">
                                    {(msg) => <Text color="red.400" fontSize="sm">{msg}</Text>}
                                </ErrorMessage>
                            </FormControl>

                            {/* Botão de Envio */}
                            <Button
                                mt={4}
                                colorScheme="teal"
                                isLoading={isSubmitting}
                                type="submit"
                            >
                                Enviar
                            </Button>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default Contact;
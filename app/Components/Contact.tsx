// components/Contact.tsx
import { Box, Heading, VStack, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Contact = () => (
    <Box py={20} px={10} bg="brand.700" color="white">
        <VStack spacing={8}>
            <Heading as="h2" size="xl">Contato</Heading>
            <Formik
                initialValues={{ name: '', email: '', message: '' }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Obrigatório'),
                    email: Yup.string().email('E-mail inválido').required('Obrigatório'),
                    message: Yup.string().required('Obrigatório'),
                })}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {() => (
                    <Form>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel htmlFor="name">Nome</FormLabel>
                                <Field as={Input} id="name" name="name" bg="white" color="black" />
                                <ErrorMessage name="name" component="div" />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="email">E-mail</FormLabel>
                                <Field as={Input} id="email" name="email" bg="white" color="black" />
                                <ErrorMessage name="email" component="div" />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="message">Mensagem</FormLabel>
                                <Field as={Textarea} id="message" name="message" bg="white" color="black" />
                                <ErrorMessage name="message" component="div" />
                            </FormControl>
                            <Button type="submit" colorScheme="brand" size="lg">Enviar</Button>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </VStack>
    </Box>
)

export default Contact

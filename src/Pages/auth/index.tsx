import { Formik, Field } from "formik";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    VStack,
} from "@chakra-ui/react";

const Auth = () => {
    return (
        <Flex bgImage={"/assets/banner_de_fundo.jpg"} bgSize={"cover"} bgPos={"center"}  bgBlendMode={"darken"} bgRepeat="no-repeat" align="center" justify="center" w={"full"} h="100vh">
            <Box bgColor={"rgba(128, 0, 128, 0.5)"}  p={6} rounded="md" w={"md"}>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        rememberMe: false
                    }}
                    onSubmit={(values) => {
                        alert(JSON.stringify(values, null, 2));
                    }}
                >
                    {({ handleSubmit, errors, touched }) => (
                        <Box w={"full"} as="form" onSubmit={handleSubmit}>
                            <VStack  spacing={4} align="flex-start">
                                <FormControl>
                                    <FormLabel htmlFor="email">Email Address</FormLabel>
                                    <Field
                                        as={Input}
                                        id="email"
                                        name="email"
                                        type="email"
                                        variant="filled"
                                    />
                                </FormControl>
                                <FormControl isInvalid={!!errors.password && touched.password}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Field
                                        as={Input}
                                        id="password"
                                        name="password"
                                        type="password"
                                        variant="filled"
                                        validate={(value: string | any[]) => {
                                            let error;

                                            if (value.length < 6) {
                                                error = "Password must contain at least 6 characters";
                                            }

                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                </FormControl>
                                <Field
                                    as={Checkbox}
                                    id="rememberMe"
                                    name="rememberMe"
                                    colorScheme="purple"
                                >
                                    Remember me?
                                </Field>
                                <Button type="submit" colorScheme="purple" width="full">
                                    Login
                                </Button>
                            </VStack>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Flex>
    );
}

export default Auth;
import { useRef, useState } from "react";
import React from "react";
import { Input, Button, FormLabel, VStack, FormControl, useDisclosure,
        Modal, ModalOverlay, ModalHeader, ModalContent, ModalBody, ModalCloseButton, Container, HStack, Center} from "@chakra-ui/react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { Navigate } from "react-router-dom";
import { ForgotpassPage } from "./forgotpassPage";
import Swal from 'sweetalert2'
// import { Register } from "./RegisterPage"

const url = "http://localhost:2000/user/login"

export const LoginPage = () => {
    const usernameEmailPhone = useRef("");
    const password = useRef("");
    const dispatch = useDispatch();
    const [move, setMove] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onLogin = async () => {

        try {
            const user = {
                password: password.current.value,
                data: usernameEmailPhone.current.value,
            };

            const result = await Axios.post(url, user);
        
            dispatch(login({
                id: result.data.isAccountExist.id,
                username: result.data.isAccountExist.username,
                email: result.data.isAccountExist.email,
                profilePic: result.data.isAccountExist.profilePic,
                isVerified: result.data.isAccountExist.isVerified
            }));

            localStorage.setItem("token", result.data.token);

            setMove(true);
        
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data}`,
                timer: 1000,
                customClass: {
                    container: 'my-swal'
                }
            })
        }
    };
    return move ? (
        <Navigate to="/" />
    ) : (
        <>
        <HStack bg="white">
        <Button mr={4} onClick={onOpen} _focus={{ boxShadow: "outline" }} >
            Login
        </Button>

        
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay zIndex="1000" />
            <ModalContent>
            <ModalHeader> 
                <Center>Masuk ke Tokopedia </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>                
                    <Container >
                        <VStack spacing={4} align="flex-start">
                                <FormControl>
                                    <FormLabel htmlFor="email">Email atau Username</FormLabel>
                                        <Input type="email" name="email" variant="filled" ref={usernameEmailPhone} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                        <Input  type="password" name="password" variant="filled" ref={password} />
                                </FormControl>
                            <Button colorScheme="teal" mb={8} onClick={onLogin} _hover={{ colorScheme: "gray" }} _focus={{ boxShadow: "outline" }} >
                                Masuk
                            </Button>
                                <ForgotpassPage/>
                        </VStack>
                    </Container>              
            </ModalBody>
            </ModalContent>
        </Modal>
        </HStack>
    </>
    )
}
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, Button, 
    Table, TableContainer, Tbody, Th, Thead, Tr, PopoverFooter, ButtonGroup, Menu, MenuButton, Flex, Tag, Avatar, Box, Text, MenuList, MenuItem, InputGroup, InputLeftElement, Input } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'
import { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../redux/chartSlice"
import {logout} from "../redux/userSlice"
import Swal from "sweetalert2";


import { Register } from "../pages/registerPage"
import { LoginPage } from "../pages/loginPage"
import { useState } from "react";


export const NavbarComp = () => {
    const { id, username, isVerified, profilePic } = useSelector((state) => state.userSlice.value)
    // const data = useSelector((state) => state.chartSlice.value);
    const dispatch = useDispatch();
    const tokenlocalstorage = localStorage.getItem("token");
    let [token, setToken] = useState("")
    const [move, setMove] = useState(false);

    const fotoProfil = 'http://localhost:2000/' + profilePic

        const onVerification = async () => {
        try {
            const result = await Axios.post("http://localhost:2000/user/changeotp", {id});
            setToken(result.data.token)
            Swal.fire({
                icon: 'success',
                title: 'Good Job',
                text: `${result.data.massage}`,
                timer: 2000,
                customClass: {
                    container: 'my-swal'
                }
            })
            setTimeout(() => setMove(true), 2000);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data}`,
                customClass: {
                    container: 'my-swal'
                }
            })
        }
    };

    const onLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
    };


    
    const getData = async () => {
        try {
        const res = await Axios.get("http://localhost:2000/product/all");
        console.log(res.data);
        dispatch(syncData(res.data));
        } catch (err) {
        console.log(err);
        }
    };
    
    useEffect(() => {
        getData();
    }, []);
    

    return move ? (
        <Navigate to={`/verification/${token}`} />
    ) : (
        <Navbar expand="lg"  className= "shadow" >
        <Container>
            <Navbar.Brand as={Link} to="/" href="#home"><img src="https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg" alt="tokopedia logo"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <InputGroup>
                <InputLeftElement
                pointerEvents="fill"
                children={<SearchIcon color='gray.300' />}
                />
                <Input w="2xl" size="md" type='tel' placeholder='Search' _placeholder={{ opacity: 1, color: 'gray.500' }} mr="5" />
            </InputGroup>
        
                <Popover isLazy>
                <PopoverTrigger>

                    <button type="button" class="btn position-relative btn-outline-success" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    {/* <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {data.length}
                        <span class="visually-hidden">unread messages</span>
                    </span> */}
                    </button>

                </PopoverTrigger>
                <PopoverContent>
                    <PopoverHeader fontWeight='semibold'>My Cart</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                    <TableContainer bg="grey.100">
                        <Table >
                            <Thead>
                            <Tr>
                                <Th>Img</Th>
                                <Th>Name</Th>
                                <Th>Price</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                                {/* {data.map((item, index) => {
                                return (
                                <Tr key={index}>
                                    <Td><Stack><Image
                                        boxSize='35px'
                                        objectFit='cover'
                                        src={item.images}
                                        alt={item.name_product}
                                    /></Stack></Td>
                                    <Td>{item.name_product}</Td>
                                    <Td>{item.price}</Td>
                                </Tr>
                                );
                            })} */}
                            </Tbody>
                            </Table>
                        </TableContainer>
                    </PopoverBody>
                    <PopoverFooter display='flex' justifyContent='flex-end'>
                        <ButtonGroup size='sm'>
                        <Button colorScheme='teal' as={Link} to="/chart" >Selengkapnya</Button>
                        </ButtonGroup>
                    </PopoverFooter>
                </PopoverContent>
                </Popover>
            </Nav>
            {tokenlocalstorage ? 
                <Menu>
                    <MenuButton>
                        <Flex>
                            <Tag size='lg' bgColor="white"  borderRadius='full' p="6px" pr={5} _focus={{ boxShadow: "outline" }}>
                                <Avatar size='sm' name={username} src={fotoProfil} />
                                <Box ml='3'>
                                    <Text fontWeight='bold'>
                                        {username}
                                    </Text>
                                </Box>
                            </Tag>
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        <MenuItem as={Link} to="/" onClick={onLogout}>Keluar dari {username}</MenuItem>
                        <MenuItem as={Link} to="/profil">Profil</MenuItem>
                        {isVerified ? "" : <MenuItem onClick={onVerification}>Verifikasi Akun</MenuItem> }
                    </MenuList>
                </Menu>
                :
                <>
                <LoginPage/>
                <Register/>
                </>
            }

            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
    };
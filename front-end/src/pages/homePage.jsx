import { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../redux/chartSlice"
import { Container, Box, Flex, Image, Badge, Grid, GridItem, } from "@chakra-ui/react";
import { Carousel } from "react-bootstrap";
import { useState } from "react";


export const HomePage = () => {
    const data = useSelector((state) => state.chartSlice.value);
    const dispatch = useDispatch();
    let [panjang, setPanjang] = useState([])
const getData = async () => {
    try {
        let p = []
        const res = await Axios.get("http://localhost:2000/product/all");
        res.data.map((item, index) => {
            if(index % 4 === 0) p.push(index)
        })
        dispatch(syncData(res.data));
        setPanjang(p)
        console.log(p)
    } catch (err) {
        console.log(err);
    }   
};

useEffect(() => {
    getData();
}, []);


    return (
        <>
        <Container maxW='container.xl' borderRadius="lg">
            <Carousel>
            <Carousel.Item interval={500}>
                <img
                className="d-block w-100 rounded-4"
                src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2022/11/8/dee2ede1-2ab3-430e-9bff-fa826996eeae.jpg.webp?ect=4g"
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                className="d-block w-100 rounded-4"
                src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2022/11/8/6f1140a6-6d17-437e-aeee-c87fe2a5dc9e.jpg?ect=4g"
                alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100 rounded-4"
                src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2022/11/7/2e00e748-fcaf-4dda-a9c4-5549798f6d2e.jpg.webp?ect=4g"
                alt="Third slide"
                />
            </Carousel.Item>
            </Carousel>
            <Grid templateColumns={"20vw 70vw"}>
                <GridItem>
                    <Image bgGradient='linear(to-r, teal.500, green.500)' rounded="lg" maxH="96" pr="8" pl="8" mt="4"
                        src={`https://images.tokopedia.net/img/cache/240/PYbRbC/2022/10/31/70cb617e-c012-4609-af20-62f92870ff20.png.webp?ect=4g`}
                        alt={`Picture of tokopedia`} 
                        />
                </GridItem>
                <GridItem>
                    <Box w="70vw" justifyContent="right" alignContent="center" mt="5" ml="-10">
                        <Carousel>
                            {panjang.map((item2) => {
                                return (
                                <Carousel.Item interval={2000}>
                                    <Flex>
                                        
                                        {data.map((item, index) => {
                                            if (index >= item2 && index < item2 + 4)
                                            return (
                                                <Box w="xl" bg='white' rounded="lg" m="2" shadow="lg" >
                                                    <Image
                                                    src={item.images}
                                                    alt={`Picture of ${item.name_product}`}
                                                    roundedTop="lg"
                                                    />
                                                    <Box pr="36"></Box>

                                                    <Box p="2" >
                                                    <Box d="flex" alignItems="baseline" >
                                                        <Badge rounded="full" px="2" fontSize="0.5em" colorScheme="teal">
                                                            Diskon 50%
                                                        </Badge>
                                                    </Box>
                                                    
                                                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                                                        <Box
                                                        lineHeight="tight"
                                                        isTruncated fontSize="sm" h="10" overflow="hidden">
                                                        {item.name_product}
                                                        </Box>
                                                    </Flex>

                                                    <Flex justifyContent="space-between" alignContent="center">
                                                        {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
                                                        <Box fontSize="2xl" color='gray.800'>
                                                        <Box as="span" color={'gray.600'} fontSize="lg">
                                                        {new Intl.NumberFormat("id-ID", {
                                                                style: "currency",
                                                                currency: "IDR"
                                                                }).format(item.price)}
                                                        </Box>
                                                        
                                                        </Box>
                                                    </Flex>
                                                    </Box>
                                                </Box>
                                            )
                                        })}
                                    </Flex>
                                </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </Box>
                </GridItem>
            </Grid>
        
            {/* <Flex>
                    <Image bgGradient='linear(to-r, teal.500, green.500)' rounded="lg" maxH="96" pr="8" pl="8" mt="4"
                    src={`https://images.tokopedia.net/img/cache/240/zssuBf/2022/11/7/25172b9c-a987-4798-8208-9686964ff373.png.webp?ect=4g`}
                    alt={`Picture of tokopedia`} 
                    />
                <Flex overflowY="scroll" mt="12" mb="12" maxH="96">
                    {data.map(item => {
                        return (
                            <Box w="xl" bg='white' rounded="lg" m="2" shadow="lg" >
                                <Image
                                src={item.images}
                                alt={`Picture of ${item.name_product}`}
                                roundedTop="lg"
                                />
                                <Box pr="36"></Box>

                                <Box p="2" >
                                <Box d="flex" alignItems="baseline" >
                                    <Badge rounded="full" px="2" fontSize="0.5em" colorScheme="teal">
                                        Diskon 50%
                                    </Badge>
                                </Box>
                                
                                <Flex mt="1" justifyContent="space-between" alignContent="center">
                                    <Box
                                    lineHeight="tight"
                                    isTruncated fontSize="sm" h="10" overflow="hidden">
                                    {item.name_product}
                                    </Box>
                                </Flex>

                                <Flex justifyContent="space-between" alignContent="center">
                                    <Box fontSize="2xl" color='gray.800'>
                                    <Box as="span" color={'gray.600'} fontSize="lg">
                                        Rp.{item.price.toFixed(2)}
                                    </Box>
                                    
                                    </Box>
                                </Flex>
                                </Box>
                            </Box>
                        )
                    })}
                </Flex>
            </Flex> */}
        </Container>
        </>
    );
}

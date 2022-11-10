import { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../redux/chartSlice"
import { ChakraProvider, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Image, Stack } from "@chakra-ui/react";



export const ChartPage = () => {
const data = useSelector((state) => state.chartSlice.value);
const dispatch = useDispatch();

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

return (
    <ChakraProvider>
    <TableContainer bg="grey.100">
    <Table >
        {/* <TableCaption>Daftar User</TableCaption> */}
        <Thead>
        <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Img</Th>
            <Th isNumeric>Qty</Th>
        </Tr>
        </Thead>
        <Tbody>
            {data.map((item, index) => {
            return (
            <Tr key={index}>
                <Td>{item.name_product}</Td>
                <Td>{item.price}</Td>
                <Td><Stack><Image
                    boxSize='100px'
                    objectFit='cover'
                    src={item.images}
                    alt={item.name}
                /></Stack></Td>
            </Tr>
            );
        })}
        </Tbody>
        </Table>
    </TableContainer>
    
    </ChakraProvider>
);
};

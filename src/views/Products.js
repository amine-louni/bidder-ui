import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/layout';
import {
  HiFilter,
  HiOutlineCash,
  HiOutlineFilter,
  HiOutlineTicket,
  HiOutlineViewGrid,
  HiShoppingBag,
} from 'react-icons/hi';
import {
  Button,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Switch,
} from '@chakra-ui/react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [value, setValue] = React.useState(0);
  const handleChange = value => setValue(value);

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [tags, setTags] = useState([]);
  const fetchProducts = async () => {
    setLoadingProducts(true);
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/?currentPrice[lte]=${
          value === 0 ? '100000' : value
        }`
      )
      .catch(function (error) {
        console.log(error.response);
        setLoadingProducts(false);
      });
    console.log(res);
    if (res.data.status === 'success') {
      setProducts(res.data.data.docs);
      setLoadingProducts(false);
    }
  };
  const fetchTags = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/categories`
    );
    console.log(res.data.data.docs);
    setTags(res.data.data.docs);
  };
  useEffect(() => {
    fetchProducts();
    fetchTags();
  }, []);
  return (
    <>
      <Navbar />
      <Box bg="teal.900" color="white" py="6rem">
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" fontWeight="medium" display="flex">
            <HiShoppingBag /> All the products
          </Heading>
        </Container>
      </Box>

      <Box as="section" my="3rem">
        <Container maxW="container.xl">
          <Flex align="flex-start" wrap="wrap" justify="space-between">
            <Box
              mb="1rem"
              bg="gray.100"
              rounded="lg"
              p="2rem"
              width={['100%', '100%', '100%', '28%']}
            >
              <Heading mb="2rem" display="flex" size="md" fontWeight="semibold">
                <HiOutlineViewGrid /> <Text ml=".7rem">Filter</Text>
              </Heading>

              <Heading mb=".7rem" display="flex" size="sm" fontWeight="medium">
                <HiOutlineCash />{' '}
                <Text fontWeight="semibold" ml=".7rem">
                  Price
                </Text>
              </Heading>
              <Box>
                <Text>{value}.00 DA</Text>
                <Slider
                  flex="1"
                  focusThumbOnChange={false}
                  value={value}
                  onChange={handleChange}
                  max={100000}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
              <Divider color="red" marginY="2rem" />
              <Heading mb=".7rem" display="flex" size="sm" fontWeight="medium">
                <HiOutlineTicket />{' '}
                <Text fontWeight="semibold" ml=".7rem">
                  Category
                </Text>
              </Heading>

              <Select
                mb=".5rem"
                name="category"
                borderColor="teal"
                placeholder="Select a cateogry"
              >
                {tags.map(tag => (
                  <option value={tag._id}>{tag.name}</option>
                ))}
              </Select>

              <Button
                onClick={fetchProducts}
                mt="3rem"
                colorScheme="blue"
                isFullWidth
              >
                Submit
              </Button>
            </Box>
            <Box
              mb="1rem"
              rounded="lg"
              p="2rem"
              width={['100%', '100%', '100%', '72%']}
            >
              <Flex flexWrap="wrap" gridGap="1">
                {loadingProducts ? (
                  <Box width="100%" textAlign="center">
                    <Spinner size="xl" />
                  </Box>
                ) : (
                  products.map(product => (
                    <ProductCard product={product} compact={true} />
                  ))
                )}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import {
  Badge,
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/layout';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from '@chakra-ui/react';
import { Image, Input, List, ListIcon, ListItem } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MinusIcon } from '@chakra-ui/icons';
import { HiCheckCircle, HiClock } from 'react-icons/hi';
import Countdown from 'react-countdown';
import SellerCard from '../components/product/SellerCard';

const data = {
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
  name: 'Wayfarer Classic',
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

export default function Product() {
  let { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const res = await axios
          .get(`${process.env.REACT_APP_API_URL}/api/v1/products/${id}`)
          .catch(function (error) {
            console.log(error.response, 'error res');
            setLoadingProduct(false);
          });
        console.log(res);
        if (res.data.status === 'success') {
          setProduct(res.data.data);
          setLoadingProduct(false);
        }
      };
      fetchProduct();
    }
  }, [id]);
  return (
    <>
      <Navbar />
      {!loadingProduct && (
        <>
          <Box bg="teal.900" color="white" py="6rem">
            <Container maxW="container.xl">
              <Heading
                as="h2"
                textTransform="capitalize"
                size="xl"
                fontWeight="medium"
              >
                Products / {product.name}
              </Heading>
            </Container>
          </Box>
          <Box py="3rem" as="section">
            <Container maxW="container.xl">
              <Flex align="flex-start" wrap="wrap" justify="space-between">
                <Box
                  mb="1rem"
                  width={['100%', '100%', '100%', '34%']}
                  height={['600px', '600px', '600px', 'auto']}
                >
                  <Image
                    rounded="lg"
                    boxSize="100%"
                    objectFit="contain"
                    src={data.imageURL}
                    alt="Dan Abramov"
                  />
                </Box>
                <Box width={['100%', '100%', '100%', '65%']}>
                  <Flex
                    wrap="wrap"
                    justify="space-between"
                    p="2rem"
                    bg="gray.100"
                  >
                    <Box width={['100%', '100%', '60%', '60%']}>
                      <Box>
                        <Heading
                          as="h1"
                          textTransform="capitalize"
                          size="md"
                          fontWeight="medium"
                        >
                          {product.name}
                        </Heading>
                        <Badge colorScheme="purple">
                          {product?.category?.name}
                        </Badge>
                        <Text mt="1rem">{product.description}</Text>
                        <Divider my=".5rem" />
                        <List spacing={3}>
                          <ListItem>
                            <ListIcon as={MinusIcon} color="green.500" />
                            <Badge>
                              initial Price: {product.currentPrice.toFixed(2)}{' '}
                              DA
                            </Badge>
                          </ListItem>
                          <ListItem>
                            <ListIcon as={HiCheckCircle} color="green.500" />
                            <Badge colorScheme="green.300">
                              current Price: {product.currentPrice.toFixed(2)}{' '}
                              DA
                            </Badge>
                          </ListItem>
                          <ListItem>
                            <ListIcon as={HiClock} color="green.500" />
                            <Badge size="6xl" colorScheme="yellow">
                              <Countdown
                                renderer={props => (
                                  <Text size="3xl">
                                    {props.days} days | {props.hours}:
                                    {props.minutes} :{props.seconds}
                                  </Text>
                                )}
                                date={product.deadDate}
                              />
                            </Badge>
                          </ListItem>
                        </List>
                        <Box p="1.5rem" mt="2rem" bg="white" rounded="lg">
                          <Flex
                            mb="1.7rem"
                            align="center"
                            justify="space-between"
                          >
                            <Text fontWeight="medium" mb=".7rem" size="md">
                              Place your bid
                            </Text>
                            <NumberInput
                              isRequired600
                              defaultValue={product.currentPrice}
                              min={product.currentPrice}
                              clampValueOnBlur={false}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </Flex>
                          <Button isFullWidth colorScheme="blue">
                            Submit
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      padding="1.5rem"
                      width={['100%', '100%', '39%', '39%']}
                    >
                      <Heading as="h3" size="md" fontWeight="semibold">
                        The seller
                      </Heading>
                      <SellerCard
                        firstName={product.user.firstName}
                        lastName={product.user.lastName}
                        avatar={product.user.avatar}
                        email={product.user.email}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Container>
          </Box>
        </>
      )}
      <Footer />
    </>
  );
}

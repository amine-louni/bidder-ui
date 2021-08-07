import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiTag, HiTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
export default function Main() {
  //{{URL}}/api/v1/products/bids/pending
  const [pendings, setPendings] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [tags, setTags] = useState([]);
  const [loadingPendings, setloadingPendings] = useState(false);
  const [sellings, setSellings] = useState([]);
  const [sellingsLoading, setLoadingSellings] = useState([]);
  const [accptedBids, setAccptedBids] = useState([]);
  const [accptedBidsLoading, setAccptedBidsLoading] = useState(false);
  const [acceptedSellBids, setAcceptedSellBids] = useState([]);
  const [acceptedSellBidsLoading, setAcceptedSellBidsLoading] = useState(false);
  const [markedAsSold, setMarkedAsSold] = useState([]);
  const [markedAsSoldLoading, setMarkedAsSoldLoading] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [purchaseHistoryLoading, setPurchaseHistoryLoading] = useState(false);
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [expiredProductsLoading, setExpiredProductsLoading] = useState(false);

  const [category, setCategory] = useState('');

  const storeToken = localStorage.getItem('user-token');
  const fetchPendings = async () => {
    setloadingPendings(true);
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/super/all-pendings`,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
        setloadingPendings(false);
      });

    if (res?.data?.status === 'success') {
      setPendings(res?.data?.data);
      setloadingPendings(false);
    }
  };
  const fetchAllUsers = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${storeToken}`,
        },
      })
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
      });

    if (res?.data?.status === 'success') {
      setUsers(res?.data?.data.docs);
    }
  };
  const fetchMarkedAsSold = async () => {
    setMarkedAsSoldLoading(true);
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/super/all-products?sold=true`,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        setMarkedAsSoldLoading(false);

        toast.error(error.response.data.message);
      });

    if (res?.data?.status === 'success') {
      setMarkedAsSold(res?.data?.data.docs);
      setMarkedAsSoldLoading(false);
    }
  };

  const fetchProducts = async () => {
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/super/all-products`,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        toast.error(error.response.data.message);
      });

    if (res?.data?.status === 'success') {
      setProducts(res?.data?.data.docs);
    }
  };

  const fetchExpiredProducts = async () => {
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/super/all-products?expired=true`,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        toast.error(error.response.data.message);
      });

    if (res?.data?.status === 'success') {
      setExpiredProducts(res?.data?.data.docs);
    }
  };

  const fetchTags = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/categories`
    );
    console.log(res.data.data.docs);
    setTags(res.data.data.docs);
  };
  //{{URL}}/api/v1/categories
  const addCategory = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/categories`,
      {
        name: category,
      },
      {
        headers: {
          Authorization: `Bearer ${storeToken}`,
        },
      }
    );
    console.log(res.data.data.docs);
    if (res?.data?.status === 'success') {
      setTags([...tags, res.data.data]);
      toast.success('Category added');
    }
  };
  const deleteCategory = async id => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/v1/categories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${storeToken}`,
        },
      }
    );

    if (res?.status === 204) {
      const newTags = tags.filter(tag => tag._id !== id);
      setTags(newTags);
      toast.warn('Category removed');
    }
  };
  useEffect(() => {
    fetchPendings();
    fetchAllUsers();
    fetchMarkedAsSold();
    fetchProducts();
    fetchExpiredProducts();
    fetchTags();
  }, []);
  return (
    <div>
      <Navbar />
      <Box py="3rem">
        <Container maxW="container.lg">
          <Heading as="h2" size="lg">
            Statistics
          </Heading>
          <Flex wrap="wrap">
            <Box
              borderColor="gray.400"
              borderWidth="1px"
              rounded="lg"
              my="7px"
              p="3rem"
              m="6px"
              w={['100%', '100%', '32%', '30%']}
            >
              <Heading mb="1rem" fontWeight="medium" size="md">
                All users
              </Heading>
              <Heading as="h4" size="md">
                {users.length}
              </Heading>
            </Box>
            <Box
              borderColor="gray.400"
              borderWidth="1px"
              rounded="lg"
              my="7px"
              p="3rem"
              m="6px"
              w={['100%', '100%', '32%', '30%']}
            >
              <Heading mb="1rem" fontWeight="medium" size="md">
                All products
              </Heading>
              <Heading as="h4" size="md">
                {products.length}
              </Heading>
            </Box>
            <Box
              borderColor="gray.400"
              borderWidth="1px"
              rounded="lg"
              my="7px"
              p="3rem"
              m="6px"
              w={['100%', '100%', '32%', '30%']}
            >
              <Heading mb="1rem" fontWeight="medium" size="md">
                Sold products
              </Heading>
              <Heading as="h4" size="md">
                {markedAsSold.length}
              </Heading>
            </Box>
            <Box
              borderColor="gray.400"
              borderWidth="1px"
              rounded="lg"
              my="7px"
              p="3rem"
              m="6px"
              w={['100%', '100%', '32%', '30%']}
            >
              <Heading mb="1rem" fontWeight="medium" size="md">
                Expired products
              </Heading>
              <Heading as="h4" size="md">
                {expiredProducts.length}
              </Heading>
            </Box>
            <Box
              borderColor="gray.400"
              borderWidth="1px"
              rounded="lg"
              my="7px"
              p="3rem"
              m="6px"
              w={['100%', '100%', '32%', '30%']}
            >
              <Heading mb="1rem" fontWeight="medium" size="md">
                Pending products
              </Heading>
              <Heading as="h4" size="md">
                {pendings.length}
              </Heading>
            </Box>
          </Flex>

          <Box py="3rem">
            <Container maxW="container.lg">
              <Heading as="h2" size="lg">
                Users
              </Heading>
              <Box height="70vh" overflow="auto">
                {users.map(user => {
                  return (
                    <HStack marginBottom="1.5rem" align="center">
                      <HStack>
                        <Avatar src={'https://' + user.avatar} />
                        <Box>
                          <Text>
                            {user.firstName} {user.lastName}
                          </Text>
                        </Box>
                      </HStack>
                      <Box flexGrow="1" textAlign="right">
                        <Button width="10rem" colorScheme="red">
                          Ban
                        </Button>
                        <br />
                        <Button mt="7px" width="10rem">
                          View profile
                        </Button>
                      </Box>
                    </HStack>
                  );
                })}
              </Box>
            </Container>
          </Box>

          <Box py="3rem">
            <Container maxW="container.lg">
              <Heading as="h2" mb="2rem" size="lg">
                Admin actions
              </Heading>

              <Heading size="sm">Create a cateogry</Heading>
              <Flex align="center">
                <InputGroup height="3rem" maxW="30rem" size="lg">
                  <Input
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    height="3rem"
                    placeholder="Enter a category name"
                  />
                </InputGroup>
                <Button height="3rem" onClick={addCategory} colorScheme="blue">
                  Add a cateogry
                </Button>
              </Flex>
              <Flex>
                {tags.map(tag => (
                  <Flex
                    align="center"
                    justify="center"
                    mr="2"
                    p="1rem"
                    rounded="lg"
                    bg="gray.100"
                  >
                    <Box>{tag.name}</Box>
                    <IconButton
                      onClick={() => deleteCategory(tag._id)}
                      ml="2"
                      colorScheme="red"
                      size="sm"
                      icon={<HiTrash />}
                    />
                  </Flex>
                ))}
              </Flex>
            </Container>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

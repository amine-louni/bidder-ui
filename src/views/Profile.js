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
  Spinner,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { Image, Input, List, ListIcon, ListItem } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { MinusIcon } from '@chakra-ui/icons';
import { HiCheckCircle, HiClock } from 'react-icons/hi';
import Countdown from 'react-countdown';
import SellerCard from '../components/product/SellerCard';
import ProductImages from '../components/product/ProductImages';
import { toast } from 'react-toastify';
import { useUser } from '../hooks/user';
import PendingCard from '../components/profile/PendingCard';
import SellCard from '../components/profile/SellCard';

export default function Profile() {
  let { id } = useParams();
  const storeToken = localStorage.getItem('user-token');
  //{{URL}}/api/v1/products/bids/pending
  const [pendings, setPendings] = useState([]);
  const [loadingPendings, setloadingPendings] = useState(false);
  const [sellings, setSellings] = useState([]);
  const [sellingsLoading, setLoadingSellings] = useState([]);

  const fetchPendings = async () => {
    setloadingPendings(true);
    const res = await axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/products/bids/pending`, {
        headers: {
          Authorization: `Bearer ${storeToken}`,
        },
      })
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
  const fetchSellings = async () => {
    setLoadingSellings(true);
    const res = await axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/products/me/sellings`, {
        headers: {
          Authorization: `Bearer ${storeToken}`,
        },
      })
      .catch(function (error) {
        setLoadingSellings(false);
        console.log(error.response);
        toast.error(error.response.data.message);
      });

    if (res?.data?.status === 'success') {
      setSellings(res?.data?.data);
      setLoadingSellings(false);
    }
  };

  useEffect(() => {
    fetchPendings();
    fetchSellings();
  }, []);
  return (
    <>
      <Navbar />

      <Box bg="teal.900" color="white" py="6rem">
        <Container maxW="container.lg">
          <Heading
            as="h2"
            textTransform="capitalize"
            size="xl"
            fontWeight="medium"
          >
            My profile
          </Heading>
        </Container>
      </Box>
      <Box py="3rem">
        <Container maxW="container.lg">
          <Tabs>
            <TabList>
              <Tab>My pending bids</Tab>
              <Tab>My purchase list</Tab>
              <Tab>My selling list</Tab>
              <Tab>My confirmed list</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {pendings.length === 0 && !loadingPendings && (
                  <Heading size="lg">You have no selling products</Heading>
                )}
                {loadingPendings && <Spinner />}
                {pendings.map(product => (
                  <PendingCard
                    key={product._id}
                    product={product}
                    setPendings={setPendings}
                    pendings={pendings}
                  />
                ))}
              </TabPanel>
              <TabPanel></TabPanel>
              <TabPanel>
                {sellings.length === 0 && !sellingsLoading && (
                  <Heading size="lg">You have no selling products</Heading>
                )}
                {sellingsLoading && <Spinner />}
                {sellings.map(product => (
                  <>
                    <SellCard
                      setSellings={setSellings}
                      sellings={sellings}
                      key={product._id}
                      product={product}
                    />
                    <Divider key={product._id + 1} my="1.5rem" />
                  </>
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

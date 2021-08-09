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
  Spinner,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Avatar,
} from '@chakra-ui/react';

import axios from 'axios';

import { toast } from 'react-toastify';
import { useUser } from '../hooks/user';
import PendingCard from '../components/profile/PendingCard';
import SellCard from '../components/profile/SellCard';
import AcceptedSellingBidCard from '../components/profile/AcceptedSellingBidCard';
import MarkedAsSoldCard from '../components/profile/MarkedAsSoldCard';
import AcceptedBuyBidCard from '../components/profile/AcceptedBuyBidCard';
import PurchaseCard from '../components/profile/PurchaseCard';
import ExpiredProductCard from '../components/profile/ExpiredProductCard';
import { HiMail, HiPhone } from 'react-icons/hi';

export default function Profile() {
  const { user } = useUser();
  const storeToken = localStorage.getItem('user-token');
  //{{URL}}/api/v1/products/bids/pending
  const [pendings, setPendings] = useState([]);
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

  const fetchPendings = async () => {
    setloadingPendings(true);
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/bids/pending?closed=false`,
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
  const fetchAcceptedBids = async () => {
    setAccptedBidsLoading(true);
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/bids/pending?closed=true`,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
        setAccptedBidsLoading(false);
      });

    if (res?.data?.status === 'success') {
      setAccptedBids(res?.data?.data);
      setAccptedBidsLoading(false);
    }
  };
  const fetchSellings = async () => {
    setLoadingSellings(true);
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/me/sellings/?closed=false&expired=false&banned=false`,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
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

  const fetchAcceptedSellingsBids = async () => {
    setAcceptedSellBidsLoading(true);
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/me/sellings/?closed=true&expired=false&banned=false&sold=false`,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        setAcceptedSellBidsLoading(false);
        console.log(error.response);
        toast.error(error.response.data.message);
      });

    if (res?.data?.status === 'success') {
      setAcceptedSellBids(res?.data?.data);
      setAcceptedSellBidsLoading(false);
    }
  };
  const fetchMarkedAsSold = async () => {
    setMarkedAsSoldLoading(true);
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/me/sellings/?closed=true&banned=false&sold=true`,
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
      setMarkedAsSold(res?.data?.data);
      setMarkedAsSoldLoading(false);
    }
  };

  //{{URL}}/api/v1/products/me/purchase-history
  const fetchPurchaseHistory = async () => {
    setPurchaseHistoryLoading(true);
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/me/sellings/?closed=true&banned=false&sold=true`,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        setPurchaseHistoryLoading(false);

        toast.error(error.response.data.message);
      });

    if (res?.data?.status === 'success') {
      setPurchaseHistory(res?.data?.data);
      setPurchaseHistoryLoading(false);
    }
  };
  const fetchExpiredProducts = async () => {
    setPurchaseHistoryLoading(true);
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/me/sellings/?expired=true&sold=false`,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        setExpiredProductsLoading(false);

        toast.error(error.response.data.message);
      });

    if (res?.data?.status === 'success') {
      setExpiredProducts(res?.data?.data);
      setExpiredProductsLoading(false);
    }
  };

  const fetchAll = () => {
    fetchPendings();
    fetchSellings();
    fetchAcceptedBids();
    fetchAcceptedSellingsBids();
    fetchMarkedAsSold();
    fetchPurchaseHistory();
    fetchExpiredProducts();
  };
  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <Navbar />

      <Box bg="teal.900" color="white" py="6rem">
        <Container maxW="container.lg">
          <Heading
            as="h2"
            textTransform="capitalize"
            size="lg"
            fontWeight="medium"
          >
            My Profile
          </Heading>
        </Container>
      </Box>
      <Container
        mt="2rem"
        p="3rem"
        bg="gray.100"
        rounded="lg"
        maxW="container.lg"
      >
        <Flex flexWrap="wrap" align="center">
          <Avatar size="2xl" src={user?.avatar} />
          <Box ml="4rem">
            <Heading mb=".7rem">
              {user?.firstName} {user?.lastName}
            </Heading>
            <Flex align="center">
              <HiMail color="teal" />
              <Text ml=".3rem" fontWeight="semibold">
                {user?.email}
              </Text>
            </Flex>
            <Flex align="center">
              <HiPhone color="teal" />
              <Text ml=".3rem" fontWeight="semibold">
                {user?.phoneNumber}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Container>

      <Footer />
    </>
  );
}

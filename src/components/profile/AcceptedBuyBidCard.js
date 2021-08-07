import { Badge, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as BrowserLink } from 'react-router-dom';
import Countdown from 'react-countdown';
import { useUser } from '../../hooks/user';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiPhone } from 'react-icons/hi';

export default function AcceptedBuyBidCard({ product, fetchAll }) {
  const storeToken = localStorage.getItem('user-token');
  //{{URL}}/api/v1/products/bids/6106958479ac3c30c4030cb7
  const [confirm, setConfirm] = useState(false);

  //{{URL}}/api/v1/products/6107b9dadcda78274c7eb2ea

  return (
    <div>
      <Flex mb="2rem">
        <Image
          rounded="lg"
          mr=".8rem"
          width="100px"
          height="100px"
          objectFit="cover"
          src={product.thumbnail}
        />
        <Box>
          <Text fontWeight="semibold">{product.name}</Text>
          <Badge>{product.category.name}</Badge>

          <Text fontSize="14px">
            Seller : {product?.user?.firstName} {product.user.lastName}
          </Text>
          <Text fontSize="14px">
            Phone :{' '}
            <Badge>
              {' '}
              <a href={`tel:${product.buyer.phoneNumber}`}>
                {product?.buyer?.phoneNumber}
              </a>
            </Badge>
          </Text>
          <Badge colorScheme="yellow">
            Pending your contact to pay {product.currentPrice} DA
          </Badge>
        </Box>
        <Box textAlign="right" flexGrow="1">
          <Button
            as="a"
            href={`tel:${product.buyer.phoneNumber}`}
            leftIcon={<HiPhone />}
            colorScheme="green"
            width="11rem"
            mb=".5rem"
          >
            Call
          </Button>{' '}
        </Box>
      </Flex>
    </div>
  );
}

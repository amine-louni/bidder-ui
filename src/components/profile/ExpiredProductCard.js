import { Badge, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as BrowserLink } from 'react-router-dom';
import Countdown from 'react-countdown';
import { useUser } from '../../hooks/user';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiPhone } from 'react-icons/hi';

export default function MarkedAsSoldCard({ product, fetchAll }) {
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
            Current price : <Badge>{product.currentPrice} DA</Badge>
          </Text>

          <Badge size="lg" colorScheme="red">
            expired
          </Badge>
        </Box>
      </Flex>
    </div>
  );
}

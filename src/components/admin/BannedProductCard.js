import { Badge, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { HiFlag } from 'react-icons/hi';

export default function BannedProductCard({ product, fetchAll, reporter }) {
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
            Reported by : {reporter?.firstName} {reporter?.lastName}
          </Text>
        </Box>
        <Box textAlign="right" flexGrow="1">
          <Button
            as="a"
            leftIcon={<HiFlag />}
            colorScheme="green"
            width="11rem"
            mb=".5rem"
          >
            Ban
          </Button>{' '}
        </Box>
      </Flex>
    </div>
  );
}

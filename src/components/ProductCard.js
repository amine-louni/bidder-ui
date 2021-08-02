import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';

const data = {
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
  name: 'Wayfarer Classic',
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

function ProductCard() {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      width={['100%', '50%', '30%', '30%']}
      maxW="sm"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
    >
      {data.isNew && (
        <Circle
          size="10px"
          position="absolute"
          top={2}
          right={2}
          bg="red.200"
        />
      )}

      <Image
        src={data.imageURL}
        alt={`Picture of ${data.name}`}
        roundedTop="lg"
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {data.isNew && (
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
              Category
            </Badge>
          )}
        </Box>
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box
            fontSize="2xl"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {data.name}
          </Box>
        </Flex>

        <Flex justifyContent="space-between" alignContent="center">
          <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
            {data.price.toFixed(2)} DA
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default ProductCard;

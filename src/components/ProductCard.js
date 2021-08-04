import { MinusIcon } from '@chakra-ui/icons';
import { Link as BrowserLink } from 'react-router-dom';
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Text,
  ListItem,
  ListIcon,
  List,
} from '@chakra-ui/react';
import {
  HiCheck,
  HiCheckCircle,
  HiClock,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import Countdown from 'react-countdown';

function ProductCard({ product }) {
  const {
    name,
    _id,
    thumbnail,
    initialPrice,
    category,
    currentPrice,
    deadDate,
  } = product;
  return (
    <Box
      as={BrowserLink}
      to={`/products/${_id}`}
      bg={useColorModeValue('white', 'gray.800')}
      width={['100%', '46%', '38%', '38%']}
      maxW="sm"
      borderWidth="2px"
      rounded="lg"
      position="relative"
      cursor="pointer"
      overflow="hidden"
      _hover={{
        '& img': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <Image
        css={{ transition: 'all 250ms linear' }}
        src={`${process.env.REACT_APP_API_URL}/img/products/${thumbnail}`}
        alt={`Picture of ${name}`}
        roundedTop="lg"
      />

      <Box p="6" bg="gray.100">
        <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
          {category.name}
        </Badge>
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box
            textTransform="capitalize"
            fontSize="2xl"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            mb="1rem"
          >
            {name}
          </Box>
        </Flex>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={MinusIcon} color="green.500" />
            <Badge>initial Price: {initialPrice.toFixed(2)} DA</Badge>
          </ListItem>
          <ListItem>
            <ListIcon as={HiCheckCircle} color="green.500" />
            <Badge colorScheme="green.300">
              current Price: {currentPrice.toFixed(2)} DA
            </Badge>
          </ListItem>
          <ListItem>
            <ListIcon as={HiClock} color="green.500" />
            <Badge colorScheme="yellow">
              <Countdown
                renderer={props => (
                  <Text>
                    {props.days} days | {props.hours}:{props.minutes} :
                    {props.seconds}
                  </Text>
                )}
                date={deadDate}
              />
            </Badge>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default ProductCard;

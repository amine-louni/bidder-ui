import React from 'react';
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
import { Image } from '@chakra-ui/react';
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
  return (
    <>
      <Navbar />
      <Box py="3rem" as="section">
        <Container maxW="container.xl">
          <Flex justify="space-between">
            <Box width={['100%', '100%', '34%', '34%']}>
              <Image
                rounded="lg"
                boxSize="100%"
                objectFit="contain"
                src={data.imageURL}
                alt="Dan Abramov"
              />
            </Box>
            <Box width={['100%', '100%', '65%', '65%']}>
              <Flex justify="space-between" p="2rem" bg="gray.100">
                <Box width={['100%', '100%', '60%', '60%']}>
                  <Box>
                    <Heading as="h1" size="md" fontWeight="medium">
                      {data.name}
                    </Heading>
                    <Badge colorScheme="purple">Clothes</Badge>
                    <Text mt="1rem">
                      Cloud bread VHS hell of banjo bicycle rights jianbing
                      umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist
                      yr dreamcatcher waistcoat, authentic chillwave trust fund.
                      Viral typewriter fingerstache pinterest pork belly
                      narwhal. Schlitz venmo everyday carry kitsch pitchfork
                      chillwave iPhone taiyaki trust fund hashtag kinfolk
                      microdosing gochujang live-edge
                    </Text>
                    <Divider my=".5rem" />
                    <HStack mb=".7rem">
                      <Text
                        color="gray.600"
                        fontSize="xl"
                        fontWeight="semibold"
                        minWidth="15rem"
                      >
                        Initial price :
                      </Text>
                      <Text fontSize="xl" fontWeight="semibold">
                        1555 DZD
                      </Text>
                    </HStack>

                    <HStack mb=".7rem">
                      <Text
                        color="gray.600"
                        fontSize="xl"
                        fontWeight="semibold"
                        minWidth="15rem"
                      >
                        Current bid price :
                      </Text>
                      <Text fontSize="xl" fontWeight="semibold">
                        1600 DZD
                      </Text>
                    </HStack>
                  </Box>
                </Box>
                <Box width={['100%', '100%', '39%', '39%']}>user Profile</Box>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

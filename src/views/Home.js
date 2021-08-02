import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import Hero from '../components/home/Hero';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Box py="20">
        <Container maxW="container.lg">
          <Heading mb="10">
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '20%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'teal.200',
                zIndex: -1,
              }}
            >
              Explore The Recent Products
            </Text>
          </Heading>
          <Flex flexWrap="wrap" gridGap="1.5" justify="space-between">
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Flex>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

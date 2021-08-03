import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  CloseButton,
  Flex,
  Image,
  Radio,
  Text,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import {
  InputControl,
  ResetButton,
  SelectControl,
  SubmitButton,
  TextareaControl,
} from 'formik-chakra-ui';

import * as Yup from 'yup';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Box, Container, Heading } from '@chakra-ui/react';
import { HiOutlineTrash } from 'react-icons/hi';
import UploadThumbnail from '../components/sell/UploadThumbnail';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import DeadDatePicker from '../components/sell/DeadDatePicker';
import { useUser } from '../hooks/user';

export default function Sell() {
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const history = useHistory();
  const { user } = useUser();
  const acesssToken = localStorage.getItem('user-token');
  const fetchTags = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/categories`
    );
    console.log(res.data.data.docs);
    setTags(res.data.data.docs);
  };
  useEffect(() => {
    fetchTags();
  }, []);

  const initialValues = {
    name: '',
    initialPrice: '',
    deadDate: new Date(),
    category: '',
    description: '',
    thumbnail: '',
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('Required field !'),
    initialPrice: Yup.number().required('Required field !'),
    category: Yup.string().required('Required field !'),
    description: Yup.string().required('Required field !'),
    deadDate: Yup.date().required('Required field !'),
    thumbnail: Yup.mixed().required('Required field !'),
  });
  const onSubmit = async values => {
    const formData = new FormData();
    formData.append('thumbnail', values.thumbnail);
    formData.append('name', values.name);
    formData.append('initialPrice', values.initialPrice);
    formData.append('category', values.category);
    formData.append('description', values.description);
    formData.append('deadDate', values.deadDate);

    const res = await axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/products`, formData, {
        headers: {
          Authorization: `Bearer ${acesssToken}`,
        },
      })
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
      });

    if (res.data.status === 'success') {
      toast.success(`Product created !`);
    }
  };

  return (
    <div>
      <Navbar />
      <Box as="section" my="5rem">
        <Container maxW="container.lg">
          <Box
            borderWidth="3px"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            borderColor="gray.100"
            p="3rem"
            rounded="lg"
          >
            <Heading mb="1.5rem">Add a product</Heading>

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                errors,
                setFieldValue,
              }) => (
                <Box m="10px auto" as="form" onSubmit={handleSubmit}>
                  <Flex justifyContent="space-between">
                    <Box width={['100%', '100%', '60%', '60%']}>
                      <InputControl
                        mb=".5rem"
                        name="name"
                        label="Product name"
                      />
                      <SelectControl
                        mb=".5rem"
                        name="category"
                        label="Select category"
                        selectProps={{ placeholder: 'Select category' }}
                      >
                        {tags.map(tag => (
                          <option value={tag._id}>{tag.name}</option>
                        ))}
                      </SelectControl>
                      <InputControl
                        mb=".5rem"
                        name="initialPrice"
                        label="Initial price"
                      />
                      <TextareaControl name="description" label="Description" />
                      <Box py="1rem">
                        <Text>Pick up the expiration date</Text>
                        <DeadDatePicker
                          setFieldValue={setFieldValue}
                          value={values.deadDate}
                        />
                      </Box>
                      <ButtonGroup>
                        <SubmitButton>Submit</SubmitButton>
                        <ResetButton>Reset</ResetButton>
                      </ButtonGroup>

                      <Box as="pre" marginY={10}>
                        {JSON.stringify(values, null, 2)}
                        <br />
                        {JSON.stringify(errors, null, 2)}
                      </Box>
                    </Box>
                    <Box width={['100%', '100%', '35%', '35%']}>
                      <Heading
                        textTransform="capitalize"
                        fontWeight="semibold"
                        size="sm"
                      >
                        Upload your product thumbanil
                      </Heading>
                      <Text color="red.400" mb="3rem">
                        Please make sure it's clear enough{' '}
                      </Text>
                      {errors.thumbnail && (
                        <Alert status="error">
                          <AlertIcon />
                          <AlertTitle mr={2}>Required</AlertTitle>
                        </Alert>
                      )}
                      {files.length === 0 && (
                        <UploadThumbnail
                          setFiles={setFiles}
                          setFieldValue={setFieldValue}
                        />
                      )}

                      {files.length > 0 && (
                        <>
                          <Button
                            onClick={() => {
                              setFiles([]);
                              setFieldValue('thumbnail', '');
                            }}
                            leftIcon={<HiOutlineTrash />}
                            colorScheme="red"
                            mb=".8rem"
                            variant="solid"
                          >
                            Delete the thumbnail
                          </Button>
                          <Image
                            src={files[0].preview}
                            rounded="lg"
                            width="100%"
                          />
                        </>
                      )}
                    </Box>
                  </Flex>
                </Box>
              )}
            </Formik>
          </Box>
        </Container>
      </Box>
      <Footer />
    </div>
  );
}

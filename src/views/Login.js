import {
  Flex,
  Box,
  Stack,
  Link,
  Heading,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useUser } from '../hooks/user';

export default function SimpleCard() {
  const history = useHistory();
  const { setUserAndToken } = useUser();
  const onSubmit = async values => {
    console.log('submit');
    const res = await axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/users/login`, values)
      .catch(function (error) {
        toast.error(error.response.data.message);
      });

    if (res.data.status === 'success') {
      toast.success(`Login with success`);
      history.push('/');
      setUserAndToken(res.data.data.user, res.data.token);
    }
  };
  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .max(15, 'Must be 6 characters or more')
      .required('Required'),

    email: Yup.string().email('Invalid email address').required('Required'),
  });

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={12}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, values, errors }) => (
              <Stack spacing={4}>
                <InputControl
                  id="email"
                  name="email"
                  type="email"
                  label="Email address"
                />

                <InputControl
                  id="password"
                  type="password"
                  name="password"
                  label="Password"
                />

                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <div></div>
                    <Link color={'blue.400'}>You don't have an account ?</Link>
                  </Stack>
                  <Button
                    onClick={handleSubmit}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Sign in to {process.env.REACT_APP_API_URL}
                  </Button>
                </Stack>
              </Stack>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}

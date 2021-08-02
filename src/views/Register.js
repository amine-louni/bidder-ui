import {
  Flex,
  Box,
  Stack,
  Link,
  Heading,
  useColorModeValue,
  Button,
  Image,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useUser } from '../hooks/user';
import RegisterImg from '../assets/undraw_Mobile_posts_re_bpuw.svg';

export default function Register() {
  const history = useHistory();
  const { setUserAndToken } = useUser();
  const onSubmit = async values => {
    console.log('submit');
    const res = await axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/users/signup`, values)
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
      });

    if (res.data.status === 'success') {
      toast.success(`Signup with success`);
      history.push('/');
      setUserAndToken(res.data.data.user, res.data.token);
    }
  };
  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required')
      .min(3, 'Name must contain at least 2 characters'),
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required').min(6, {
      message: `invalid`,
    }),
    passwordConfirm: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password')], 'Password is not match'),
  });
  return (
    <Flex minH={'100vh'}>
      <Stack width={['100%', '100%', '60%', '60%']} py={12} px={12}>
        <Stack>
          <Heading mb="10">
            <Text
              as={'span'}
              position={'relative'}
              zIndex={4}
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
                  id="name"
                  type="name"
                  name="name"
                  label="Your full name"
                />
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
                  label="Enter your password"
                />

                <InputControl
                  id="passwordConfirm"
                  type="passwordConfirm"
                  name="passwordConfirm"
                  label="Confirm your password"
                />

                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <div></div>
                    <Link color={'teal.400'}>You don't have an account ?</Link>
                  </Stack>
                  <Button
                    onClick={handleSubmit}
                    bg={'teal.400'}
                    color={'white'}
                    _hover={{
                      bg: 'teal.500',
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            )}
          </Formik>
        </Box>
      </Stack>

      <Flex width={['100%', '100%', '38%', '38%']}>
        <Image boxSize="100%" objectFit="contain" src={RegisterImg} />
      </Flex>
    </Flex>
  );
}

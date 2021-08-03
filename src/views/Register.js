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
import { Link as BrowserLink } from 'react-router-dom';
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
      history.goBack();
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
      <Flex
        display={['none', 'none', 'flex', 'flex']}
        width={['100%', '100%', '48%', '48%']}
      >
        <Image boxSize="100%" objectFit="contain" src={RegisterImg} />
      </Flex>

      <Stack
        bg="gray.100"
        width={['100%', '100%', '50%', '50%']}
        py={12}
        px={12}
      >
        <Stack>
          <Heading mb="15">
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
              Create Your Account For Free.
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
            {({ handleSubmit, values, errors, loading, isSubmitting }) => (
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
                  label="Your email address"
                />

                <InputControl
                  id="password"
                  type="password"
                  name="password"
                  label="Your password"
                />

                <InputControl
                  id="passwordConfirm"
                  type="passwordConfirm"
                  name="passwordConfirm"
                  label="Confirm your password"
                />
                <Button
                  isLoading={isSubmitting}
                  loadingText="Submitting"
                  onClick={handleSubmit}
                  bg={'teal.400'}
                  color={'white'}
                  _hover={{
                    bg: 'teal.500',
                  }}
                >
                  SIGN UP
                </Button>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <div></div>
                    <Link
                      fontWeight="bold"
                      to="/login"
                      as={BrowserLink}
                      color={'teal.400'}
                    >
                      You already have an account ? Login
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}

import { Box, Flex, Button, useColorModeValue, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../store/actions/auth';
import { useDispatch } from 'react-redux';
export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem('email')));
  }, [email, navigate, dispatch]);

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {email ? <Box>{email}</Box> : <Box>&nbsp;</Box>}

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}></Stack>
            <Button
              onClick={() => {
                dispatch(signOut());
                navigate('/');
              }}
              style={{ border: '1px solid teal', width: '200px' }}
            >
              {email ? 'Logout' : 'Login'}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

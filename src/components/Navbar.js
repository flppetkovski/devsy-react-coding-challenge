import { Box, Flex, Button, useColorModeValue, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {loggedIn ? <Box>Email</Box> : <Box>&nbsp;</Box>}

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}></Stack>
            <Button
              onClick={() => {
                navigate('/');
              }}
              style={{ border: '1px solid teal', width: '200px' }}
            >
              {loggedIn ? 'Logout' : 'Login'}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

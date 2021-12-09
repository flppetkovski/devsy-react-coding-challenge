import { Box, Flex, Button, useColorModeValue, Stack } from '@chakra-ui/react';
import { useState } from 'react';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        style={{ marginTop: '-40px' }}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {loggedIn ? <Box>Email</Box> : <Box>&nbsp;</Box>}

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}></Stack>
            <Button style={{ border: '1px solid teal', width: '200px' }}>
              {loggedIn ? 'Logout' : 'Login'}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

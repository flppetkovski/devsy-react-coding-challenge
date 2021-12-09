import { Box, Flex, Button, useColorModeValue, Stack } from '@chakra-ui/react';

export default function Navbar() {
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>email</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}></Stack>
            <Button>Logout</Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

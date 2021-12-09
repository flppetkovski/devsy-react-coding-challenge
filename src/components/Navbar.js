import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  Center,
} from '@chakra-ui/react';

export default function Nav() {
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

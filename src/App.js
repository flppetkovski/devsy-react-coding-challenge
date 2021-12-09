import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import HookForm from './components/HookForm';
import Navbar from './components/Navbar';
import { CSSReset, Box } from '@chakra-ui/react';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box p={4}>
        <Navbar />
        <HookForm />
      </Box>
    </ChakraProvider>
  );
}
export default App;

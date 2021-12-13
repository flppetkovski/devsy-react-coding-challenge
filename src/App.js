import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Login from './components/Login';
import Main from './pages/Main';
import Form from './pages/Form';
import { CSSReset, Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box p={4}>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/edit-book/:id" exact element={<Form />} />
          <Route path="/edit-book" exact element={<Form />} />
          <Route path="/" exact element={<Login />} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
}
export default App;

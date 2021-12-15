import React, { useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Login from './pages/Login';
import Main from './pages/Main';
import Form from './pages/Form';
import { CSSReset, Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

let user = JSON.parse(localStorage.getItem('email'));

function App() {
  useEffect(() => {
    user = JSON.parse(localStorage.getItem('email'));
  }, [user]);
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box p={4}>
        <Routes>
          {user && <Route path="/main" element={<Main />} />}
          {user && <Route path="/edit-book/:id" exact element={<Form />} />}
          {user && <Route path="/edit-book" exact element={<Form />} />}
          <Route exact element={<Login />} path="/" />
        </Routes>
      </Box>
    </ChakraProvider>
  );
}
export default App;

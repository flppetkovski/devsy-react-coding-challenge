import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Login from './components/Login';
import Main from './pages/Main';
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';
import { CSSReset, Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box p={4}>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/add-book" exact element={<CreateBook />} />
          <Route path="/edit-book/:id" exact element={<EditBook />} />
          <Route path="/" exact element={<Login />} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
}
export default App;

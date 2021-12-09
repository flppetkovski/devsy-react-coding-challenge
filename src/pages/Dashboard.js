import { Box, ChakraProvider, theme, CSSReset, Table } from '@chakra-ui/react';
import Searchbar from '../components/Searchbar';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box p={4}>
        <Navbar />
        <Searchbar />
        <Table />
      </Box>
    </ChakraProvider>
  );
};

export default Dashboard;

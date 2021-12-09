import { Box, ChakraProvider, theme, CSSReset, Button } from '@chakra-ui/react';
import Searchbar from '../components/Searchbar';
import Navbar from '../components/Navbar';
import BookTable from '../components/Table';
import Container from '../components/Container';

const Dashboard = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box p={4}>
        <CSSReset />
        <Navbar />
        <Button
          size="md"
          height="48px"
          width="200px"
          border="2px"
          borderColor="green.500"
          display="inline-block"
          marginBottom="-260px"
          marginLeft="50px"
        >
          Add a Book
        </Button>
        <Searchbar
          style={{
            display: 'inline-block',
            marginTop: '30rem',
            height: '50px',
          }}
        />{' '}
        <BookTable />
      </Box>
    </ChakraProvider>
  );
};

export default Dashboard;

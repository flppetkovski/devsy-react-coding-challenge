import { Box, ChakraProvider, theme, CSSReset, Button } from '@chakra-ui/react';
import Searchbar from '../components/Searchbar';
import Navbar from '../components/Navbar';
import BookTable from '../components/Table';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../store/actions/books';
const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredBooks, setFilteredBooks] = useState([]);
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch, filteredBooks]);
  const books = useSelector(state => state.books);

  return (
    <ChakraProvider theme={theme}>
      <Box p={4}>
        <CSSReset />
        <Navbar />
        <div style={{ marginTop: '-100px' }}>
          <Button
            size="md"
            height="48px"
            width="200px"
            border="2px"
            borderColor="green.500"
            display="inline-block"
            marginBottom="-260px"
            marginLeft="50px"
            onClick={() => {
              navigate('/add-book');
            }}
          >
            Add a Book
          </Button>
          <Searchbar
            style={{
              marginBottom: '-560px',
              display: 'inline-block',
              marginTop: '30rem',
              height: '50px',
            }}
          />{' '}
          <BookTable books={books} setFilteredBooks={setFilteredBooks} />
        </div>
      </Box>
    </ChakraProvider>
  );
};

export default Main;

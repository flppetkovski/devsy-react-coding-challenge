import {
  Box,
  ChakraProvider,
  theme,
  CSSReset,
  Button,
  Input,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import BookTable from '../components/Table';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../store/actions/books';

const Main = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector(state => state.books);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const initRef = useRef('');
  const loggedInUser = useSelector(state => state.loggedInUser);

  useEffect(() => {
    dispatch(getBooks());
    setFilteredBooks(books.books);
  }, [books.books.length]);
  useEffect(() => {
    setTimeout(() => {
      setValue(' ');
      setValue('');
    }, 0.05);
  }, []);

  const searchBooks = books?.books?.filter(
    book =>
      book.name?.toLowerCase().includes(value.toLowerCase() || '') ||
      book.author?.toLowerCase().includes(value.toLowerCase() || '') ||
      book.year?.includes(value.toLowerCase() || '')
  );

  useEffect(() => {
    initRef.current.focus();
    setFilteredBooks(searchBooks);
  }, [value]);

  useEffect(() => {
    setFilteredBooks(searchBooks);
  }, [value]);

  useEffect(() => {
    if (!loggedInUser.length === 0) {
      <Navigate to="/" />;
    }
  });

  return (
    <ChakraProvider theme={theme}>
      <Box p={4}>
        <CSSReset />
        <Navbar />
        <div style={{ marginTop: '-460px' }}>
          <Button
            size="md"
            height="48px"
            width="200px"
            borderColor="green.500"
            display="inline-block"
            marginLeft="50px"
            marginRight="50px"
            border="2px solid teal"
            onClick={() => {
              navigate('/edit-book', {
                state: {
                  id: '',
                  name: '',
                  year: '',
                  author: '',
                  tags: '',
                },
              });
            }}
          >
            Add a Book
          </Button>
          <Input
            placeholder="Search..."
            value={value}
            onChange={e => setValue(e.target.value)}
            ref={initRef}
            style={{
              width: '50%',
              margin: '150px 50px -70px auto',
              border: '2px solid teal',
              display: 'inline-block',
              marginTop: '30rem',
              height: '50px',
            }}
          />
          <BookTable
            books={books}
            filteredBooks={filteredBooks}
            setFilteredBooks={setFilteredBooks}
            value={value}
            searchBooks={searchBooks}
          />
        </div>
      </Box>
    </ChakraProvider>
  );
};

export default Main;

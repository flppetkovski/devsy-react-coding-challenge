import {
  Box,
  ChakraProvider,
  theme,
  CSSReset,
  Button,
  Input,
  Select,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import BookTable from '../components/Table';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags, getBooks } from '../store/actions/books';

const Main = () => {
  const [value, setValue] = useState('');
  const [booktag, setBookTag] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector(state => state.books);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [initialBooks, setInitialBooks] = useState([]);
  const initRef = useRef('');
  const loggedInUser = useSelector(state => state.loggedInUser);
  useEffect(() => {
    const tgs = async () => {
      return dispatch(await fetchTags());
    };
    tgs();
  }, []);

  const booktags = useSelector(state => books.tags);

  useEffect(() => {
    dispatch(getBooks());
    setInitialBooks(books.books);
  }, [books.books.length]);
  useEffect(() => {
    !loggedInUser && navigate('/');
    setTimeout(() => {
      setValue(' ');
      setValue('');
    }, 0.05);
  }, [loggedInUser, navigate]);

  const searchBooks = initialBooks.filter(
    book =>
      (book.name?.toLowerCase().includes(value.toLowerCase()) ||
        book.author?.toLowerCase().includes(value.toLowerCase()) ||
        book.year?.includes(value.toLowerCase())) &&
      book.tags?.some(tag => tag.includes(booktag))
  );

  useEffect(() => {
    setFilteredBooks(searchBooks);
  }, [value, booktag]);

  useEffect(() => {
    if (!loggedInUser.length === 0) {
      navigate('/');
    }
  }, [loggedInUser.length]);

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
          <Select
            variant="filled"
            size="lg"
            style={{
              width: '15%',
              display: 'inline',
              position: 'absolute',
              top: '-50px',
              right: '50px',
              textAlign: 'center',
              border: '2px solid teal',
            }}
            placeholder={booktag !== '' ? 'Clear Genres' : 'Select Genre'}
            value={booktag}
            onChange={e => setBookTag(e.target.value)}
          >
            {booktags.map(tag => (
              <option key={Math.random()}>{tag}</option>
            ))}
          </Select>
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

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
import { fetchTags, getBooks, getTags } from '../store/actions/books';

const Main = () => {
  const [value, setValue] = useState('');
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector(state => state.books);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const initRef = useRef('');
  const loggedInUser = useSelector(state => state.loggedInUser);
  useEffect(() => {
    const tgs = async () => {
      return dispatch(await fetchTags());
    };
    tgs();
  }, []);

  // function q(books) {
  //   for (let [key, value] of books.entries()) {
  //     let a = JSON.stringify(value);

  //     let b = JSON.parse(a);
  //     console.log(a);
  //   }
  // }
  // q(books.books);
  const booktags = useSelector(state => books.tags);
  const [tags, setTags] = useState([booktags]);
  useEffect(() => {
    dispatch(getBooks());
    setFilteredBooks(books.books);
  }, [books.books.length]);
  useEffect(() => {
    !loggedIn && navigate('/');
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
          {/* <Select
            variant="filled"
            size="lg"
            style={{
              width: '15%',
              display: 'inline',
              position: 'absolute',
              top: '-45px',
              right: '50px',
              textAlign: 'center',
              border: '2px solid teal',
            }}
            placeholder="Select Genre"
          >
            {booktags.map(tag => (
              <option key={tag.genre}>{tag}</option>
            ))}
          </Select> */}
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

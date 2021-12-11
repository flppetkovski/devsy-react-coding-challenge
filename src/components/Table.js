import {
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Modal from '../components/Modal';
import { useEffect, useState } from 'react';
import { deleteBook, getBooks } from '../store/actions/books';

const BookTable = props => {
  const {
    books: { books },
    setFilteredBooks,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getBooks());
  }, []);

  const deleteTheBook = async id => {
    dispatch(deleteBook(id));
    setFilteredBooks(books);
  };

  return (
    <Table size="md" variant="striped" colorScheme="gray">
      <TableCaption style={{ fontSize: '30px' }} placement="top">
        List of Books
      </TableCaption>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Author</Th>
          <Th>Year</Th>
          <Th>Tags</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      {books.map(book => {
        return (
          <Tbody key={book.id}>
            <Tr>
              <Td>{book.id}</Td>
              <Td>{book.name}</Td>
              <Td>{book.author}</Td>
              <Td>{book.year}</Td>
              <Td>
                {book.tags.map(tag => (tag.length < 7 ? `${tag}` : `${tag}, `))}
              </Td>

              <Td style={{ display: 'flex', gap: '15px' }}>
                <IconButton
                  colorScheme="teal"
                  aria-label="Edit Book"
                  icon={<EditIcon />}
                  onClick={() =>
                    navigate(`/edit-book/${book.id}`, {
                      state: {
                        id: book.id,
                        name: book.name,
                        year: book.year,
                        author: book.author,
                        tags: book.tags,
                      },
                    })
                  }
                />
                <Modal id={book.id} deleteTheBook={deleteTheBook} />
              </Td>
            </Tr>
          </Tbody>
        );
      })}
    </Table>
  );
};
export default BookTable;

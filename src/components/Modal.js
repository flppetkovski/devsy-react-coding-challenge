import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { deleteBook } from '../store/actions/books';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

export default function InternalStateEx({ deleteTheBook, id, table, editId }) {
  const dispatch = useDispatch();
  const initRef = useRef();
  const params = useParams();
  const navigate = useNavigate();
  return (
    <Popover closeOnBlur={false} placement="left" initialFocusRef={initRef}>
      {({ isOpen, onClose }) => (
        <>
          {table ? (
            <PopoverTrigger>
              <IconButton
                colorScheme="red"
                aria-label="Edit Book"
                icon={<DeleteIcon />}
              >
                {isOpen ? 'close' : 'open'}{' '}
              </IconButton>
            </PopoverTrigger>
          ) : (
            <PopoverTrigger>
              <Button
                style={{ marginTop: '16px', width: '33%' }}
                colorScheme="teal"
                aria-label="Delete Book"
              >
                {isOpen ? 'DELETE' : 'DELETE'}{' '}
              </Button>
            </PopoverTrigger>
          )}
          <Portal>
            <PopoverContent>
              <PopoverHeader style={{ color: 'red', textAlign: 'center' }}>
                Delete Book
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Box>Are you sure you want to delete the book?</Box>
                <div
                  style={{
                    dislpay: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    mt={4}
                    colorScheme="teal"
                    onClick={onClose}
                    ref={initRef}
                    marginRight="100px"
                    marginLeft="20px"
                  >
                    Close
                  </Button>
                  {table && (
                    <Button
                      mt={4}
                      colorScheme="red"
                      ref={initRef}
                      onClick={() => deleteTheBook(id)}
                    >
                      Delete
                    </Button>
                  )}
                  {!table && (
                    <Button
                      mt={4}
                      colorScheme="red"
                      ref={initRef}
                      onClick={() => {
                        dispatch(deleteBook(params.id));
                        navigate('/main');
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}

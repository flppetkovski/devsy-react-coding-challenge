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
export default function InternalStateEx({ deleteTheBook, id }) {
  const initRef = useRef();
  return (
    <Popover closeOnBlur={false} placement="left" initialFocusRef={initRef}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <IconButton
              colorScheme="red"
              aria-label="Edit Book"
              icon={<DeleteIcon />}
            >
              {isOpen ? 'close' : 'open'}{' '}
            </IconButton>
          </PopoverTrigger>
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
                  <Button
                    mt={4}
                    colorScheme="red"
                    ref={initRef}
                    onClick={() => deleteTheBook(id)}
                  >
                    Delete
                  </Button>
                </div>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}

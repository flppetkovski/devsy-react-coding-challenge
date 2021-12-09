import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';

const BookTable = () => {
  return (
    <Table
      variant="striped"
      style={{ width: '70%', margin: '0 auto', marginTop: '-45px' }}
    >
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
    </Table>
  );
};

export default BookTable;

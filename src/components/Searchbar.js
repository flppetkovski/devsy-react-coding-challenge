import { Input } from '@chakra-ui/react';

const Searchbar = () => {
  return (
    <div
      style={{
        width: '50%',
        margin: '0 auto',
        marginTop: '100px',
        marginBottom: '100px',
        border: '2px',
      }}
    >
      <Input placeholder="Search..." />
    </div>
  );
};

export default Searchbar;

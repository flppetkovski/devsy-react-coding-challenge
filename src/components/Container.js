const Container = ({ children }) => {
  return (
    <div
      style={{
        maxWidth: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0,
      }}
    >
      {children}
    </div>
  );
};

export default Container;

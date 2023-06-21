import { ChakraProvider } from '@chakra-ui/react';
import Form from './component/Form';

function App2() {
  return (
    <ChakraProvider>
      <Form />
    </ChakraProvider>
  );
}

export default App2;

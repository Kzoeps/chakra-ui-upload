import { ChakraProvider } from '@chakra-ui/react';
import './style/upload.css';
import Upload from './upload';

function App() {
  return (
    <ChakraProvider>
      <Upload beforeUpload={(file: File) => console.log(file)} multiple={true} accept='image/*' >
        <h1>Drag and Drop Files here</h1>
      </Upload>
    </ChakraProvider>
  )
}

export default App

import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Upload from './lib/upload.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <ChakraProvider>
        <Upload beforeUpload={(file: File) => console.log(file)} multiple={true} accept='image/*' >
          <h1>Drag and Drop Files here</h1>
        </Upload>
      </ChakraProvider>
    </>
  </React.StrictMode>,
)

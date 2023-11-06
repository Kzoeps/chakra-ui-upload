import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Upload from './lib/upload.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <ChakraProvider>
        <Upload listenToFileList={(files) => console.log(files, 'from file list')} beforeUpload={(file: File) => console.log(file, 'from before uplaod')} multiple={true} accept='image/*' >
          <h1>Drag and Drop Files here</h1>
        </Upload>
      </ChakraProvider>
    </>
  </React.StrictMode>,
)

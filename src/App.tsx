import './style/upload.css';
import Upload from './upload';

function App() {
  return (
    <div>
      <Upload beforeUpload={(file: File) => console.log(file)} multiple={true} accept='image/*' >
        <h1>Drag and Drop Files here</h1>
      </Upload>
    </div>
  )
}

export default App

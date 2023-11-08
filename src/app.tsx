import Upload from "./lib/upload";

export default function App() {
    const validateFileSize = (file: File, sizeInMB: number) => {
        return file.size / 1024 / 1024 < sizeInMB
    }
    const beforeUpload = (file: File) => {
        return validateFileSize(file, 0.5)
    }

    return (
        <Upload listenToFileList={(files) => console.log(files, 'from file list')} beforeUpload={beforeUpload} multiple={true} accept='image/*' >
            <h1>Drag and Drop Files here</h1>
        </Upload>
    );
}
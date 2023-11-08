import userEvent from '@testing-library/user-event';
import Upload from "../upload";
import { fireEvent, render, screen } from "./test-utils";

const file = new File(['hello'], 'hello.png', { type: 'image/png' });
test('should render upload ui', async () => {
    render(<>
        <Upload beforeUpload={function (file: File): void {
            console.log(file)
        }}><p>Click to Upload</p></Upload>
    </>)
    expect(screen.getByText('Click to Upload')).toBeInTheDocument()
    // expect(screen.getByRole('paragraph', {description: 'Click to Upload'})).toBeInTheDocument()
})

test('accepts file upload on click', async () => {
    render(<>
        <Upload beforeUpload={function (file: File): void { console.log(file) }} multiple={true} >
            Click to upload
        </Upload>
    </>)
    const fileUi: HTMLInputElement = screen.getByRole('button')
    fireEvent.change(fileUi, { target: { files: [file] } })
    expect(fileUi.files).toHaveLength(1)
    expect(fileUi.files?.[0]).toBe(file)
})


test('should accept file upload', async () => {
    const user = userEvent.setup()
    render(<>
        <Upload beforeUpload={function (file: File): void { console.log(file) }} multiple={true} >
            Click to upload
        </Upload>
    </>)
    const input: HTMLInputElement = screen.getByTestId('file-upload-input')
    await user.upload(input, file)
    expect(input.files?.[0]).toBe(file)
    expect(input.files).toHaveLength(1)
})

test('renders uploaded file list', async () => {
    const user = userEvent.setup()
    render(
        <>
            <Upload beforeUpload={function (file: File): void {
                console.log(file)
            }} multiple >Click to upload</Upload>
        </>
    )
    const input: HTMLInputElement = screen.getByTestId('file-upload-input')
    await user.upload(input, file)
    expect(screen.queryAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByText('hello.png')).toBeInTheDocument()
})

test('accepts file upload on drop', async () => {
    render(<>
        <Upload beforeUpload={function (file: File): void { console.log(file) }} multiple={true} >
            Click to upload
        </Upload>
    </>)
    const fileUi: HTMLInputElement = screen.getByRole('button', { name: 'Click to upload' })
    fireEvent.drop(fileUi, { dataTransfer: { files: [file] } })
    expect(screen.queryAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByText('hello.png')).toBeInTheDocument()
})

test('delete file from list on delete click', async () => {
    const user = userEvent.setup()
    render(<>
        <Upload beforeUpload={function (file: File): void { console.log(file) }} multiple={true} >
            Click to upload
        </Upload>
    </>)
    const input: HTMLInputElement = screen.getByTestId('file-upload-input')
    await user.upload(input, file)
    expect(screen.queryAllByRole('listitem')).toHaveLength(1)
    const deleteButton = screen.getByRole('button', { name: 'delete button' })
    await user.click(deleteButton)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
})

test('should accept only one file if multiple is false', async () => {
    const user = userEvent.setup()
    const files = [file, new File(['hello'], 'hello2.png', { type: 'image/png' })]
    render(<>
        <Upload beforeUpload={function (file: File): void { console.log(file) }} multiple={false} >Click to upload</Upload>
    </>)
    const input: HTMLInputElement = screen.getByTestId('file-upload-input')
    await user.upload(input, files)
    expect(screen.queryAllByRole('listitem')).toHaveLength(1)
    expect(input.files).toHaveLength(1)
    expect(input.files?.[0]).toBe(files[0])
})

test('should accept only allowed mime types', async () => {
    const user = userEvent.setup()
    const files = [file, new File(['hello'], 'hello.txt', { type: 'text/plain' })]
    render(
        <>
            <Upload beforeUpload={() => undefined} multiple={true} accept="image/*">Click to upload</Upload>
        </>
    )
    const input: HTMLInputElement = screen.getByTestId('file-upload-input')
    await user.upload(input, files)
    expect(screen.queryAllByRole('listitem')).toHaveLength(1)
    expect(input.files).toHaveLength(1)
    expect(input.files?.[0]).toBe(files[0])
})

test('can accept multiple mime types', async () => {
    const user = userEvent.setup()
    const files = [file, new File(['hello'], 'hello.txt', { type: 'text/plain' }), new File(['jpegImg'], 'hello2.jpg', { type: 'image/jpg' })]
    render(
        <>
            <Upload beforeUpload={() => undefined} multiple={true} accept={['image/png', 'text/plain']}>Click to upload</Upload>
        </>
    )
    const input: HTMLInputElement = screen.getByTestId('file-upload-input')
    await user.upload(input, files)
    expect(screen.queryAllByRole('listitem')).toHaveLength(2)
    expect(input.files).toHaveLength(2)
    expect(input.files?.[0]).toBe(files[0])
    expect(input.files?.[1]).toBe(files[1])
})

test('should not render file list if show is false', async () => {
    const user = userEvent.setup()
    render(
        <>
            <Upload beforeUpload={() => undefined} showUploadList={false}>Click to upload</Upload>
        </>
    )
    const input: HTMLInputElement = screen.getByTestId('file-upload-input')
    await user.upload(input, file)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    expect(input.files).toHaveLength(1)
    expect(input.files?.[0]).toBe(file)
})

test('should not upload file if beforeUpload returns false', async () => {
    const user = userEvent.setup()
    const files = [file, new File(['hello'], 'hello2.png', { type: 'image/png' })]
    const beforeUpload = (file: File) => {
        if (file.name === 'hello.png') return false
    }
    render(
        <>
            <Upload multiple beforeUpload={beforeUpload}>Click to upload</Upload>
        </>
    )
    const input: HTMLInputElement = screen.getByTestId('file-upload-input')
    await user.upload(input, files)
    expect(screen.queryAllByRole('listitem')).toHaveLength(1)
})
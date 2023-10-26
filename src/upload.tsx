import {Text, Box, ChakraProvider, Flex, Input, List, ListIcon, ListItem, IconButton, Icon, } from '@chakra-ui/react';
import classnames from 'classnames';
import { ChangeEvent, DragEvent, MouseEvent, useRef, useState } from 'react';
import FileIcon from './FileIcon';
import TrashIcon from './TrashIcon';
import attrAccept from './attr-accept';
import './style/upload.css';
import UploadList from './upload-list';

export interface UploadProps {
    multiple?: boolean;
    accept?: string;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    beforeUpload: (file: File) => void;
    children: React.ReactNode;
    showUploadList?: boolean
}

function Upload(props: UploadProps) {
    const [dragState, setDragState] = useState('')
    const [fileList, setFileList] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { onClick, multiple, showUploadList = true,  accept = '', beforeUpload, children } = props

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        let files = [...e.dataTransfer.files]
        files = files.filter(file => attrAccept(file, accept))
        if (!multiple) {
            files = files.slice(0, 1)
            setFileList(files)
        }
        setFileList((fileList) => [...files, ...fileList])
        uploadFiles(files)
    }

    // for now constraining it to manual upload if i ever need an automatic download will add it later
    const uploadFiles = (files: File[]) => {
        files.forEach(file => {
            beforeUpload?.(file)
        })
    }

    const handleFileDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const type = e.type
        setDragState(type)
        if (type === 'drop') {
            console.log(e.dataTransfer.items)
            onDrop?.(e)
        }
    }

    const openFileDialog = (e: MouseEvent<HTMLDivElement>) => {
        if (!fileInputRef.current) return;
        fileInputRef.current.click()
        if (onClick) onClick(e);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        const acceptedFiles = [...files].filter(file => attrAccept(file, accept))
        setFileList((files) => [...files, ...acceptedFiles])
        uploadFiles(acceptedFiles)
    }

    const renderUploadList = () => {
        if (showUploadList) {
            return <UploadList files={fileList}/>
        }
    }

    return (
        <ChakraProvider>
            <>
                <Box onClick={openFileDialog} className={classnames('dragger', { 'drag-over': dragState === 'dragover' })}  role='button' onDragOver={handleFileDrag} onDragLeave={handleFileDrag} onDrop={handleFileDrag}>
                    <Input onChange={handleChange} multiple={multiple} ref={fileInputRef} type='file' hidden />
                    {children}
                </Box>
                {renderUploadList()}
            </>
        </ChakraProvider>
    )
}

export default Upload;
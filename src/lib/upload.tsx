import { Box, Input } from '@chakra-ui/react';
import classnames from 'classnames';
import { ChangeEvent, DragEvent, MouseEvent, useRef, useState } from 'react';
import attrAccept from './attr-accept';
import idGenerator from './id';
import type { CuiFile, FileRemoveFunction, UploadProps } from './interface.d.ts';
import './style/upload.css';
import UploadList from './upload-list';


function Upload(props: UploadProps,) {
    const [dragState, setDragState] = useState('')
    const [fileList, setFileList] = useState<CuiFile[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { style = {}, onClick, onFileRemove, listenToFileList , onDrop: onFileDrop, multiple, showUploadList = true, accept = '', beforeUpload, children } = props

    const mapIds = (files: File[]): CuiFile[] => {
        return files.map((file) => { (file as CuiFile).id = idGenerator(); return file }) as CuiFile[]
    }

    const handleFileSet = (files: File[]) => {
        const acceptedFiles = mapIds(files)
        listenToFileList?.([...fileList, ...acceptedFiles])
        setFileList((ogFiles) => [...ogFiles, ...acceptedFiles])
    }

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        let files = [...e.dataTransfer.files]
        files = files.filter(file => attrAccept(file, accept))
        if (!multiple) {
            files = files.slice(0, 1)
            setFileList(mapIds(files))
        } else {
            handleFileSet(files)
        }
        onFileDrop?.(e)
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
            onDrop(e)
        }
    }

    const openFileDialog = (e: MouseEvent<HTMLDivElement>) => {
        if (!fileInputRef.current) return;
        fileInputRef.current.click()
        if (onClick) onClick(e);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        const acceptedFiles = [...(files || [])].filter(file => attrAccept(file, accept))
        handleFileSet(acceptedFiles)
        uploadFiles(acceptedFiles)
    }

    const handleRemove: FileRemoveFunction = (file, e?): void => {
        setFileList((fileList) => fileList.filter(item => item.id !== file.id))
        onFileRemove?.(file, e)
    }

    const renderUploadList = () => {
        if (showUploadList) {
            return <UploadList onRemove={handleRemove} files={fileList} />
        }
    }

    const formatAcceptedAttributes = (accept: string | string[]) => {
        if (Array.isArray(accept)) {
            return accept.join(',')
        }
        return accept
    }

    return (
        <>
            <Box onClick={openFileDialog} className={classnames('dragger', { 'drag-over': dragState === 'dragover' })} style={{ ...style }} role='button' onDragOver={handleFileDrag} onDragLeave={handleFileDrag} onDrop={handleFileDrag}>
                <Input data-testid="file-upload-input" onChange={handleChange} accept={formatAcceptedAttributes(accept)} multiple={multiple} ref={fileInputRef} type='file' hidden={true} />
                {children}
            </Box>
            {renderUploadList()}
        </>
    )
}

export default Upload;
import { Flex, Icon, IconButton, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import FileIcon from "./FileIcon";
import TrashIcon from "./TrashIcon";
import { CuiFile, FileRemoveFunction } from "./interface";

export default function UploadList({ files, onRemove }: { files: CuiFile[]; onRemove: FileRemoveFunction}) {
    return (
        <>
            <List spacing={0}>
                {files.map((file) => {
                    return (
                        <ListItem key={file.id}>
                            <Flex alignItems={'center'} >
                                <ListIcon color={'gray.500'} as={FileIcon} />
                                <Text overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} flex={1} flexBasis={'80%'} >{file.name}</Text>
                                <IconButton onClick={(e) => onRemove(file, e)} aria-label='delete button' variant={'ghost'} icon={<Icon color={'gray.500'} as={TrashIcon} />} />
                            </Flex>
                        </ListItem>
                    )
                })}
            </List>

        </>
    )
}
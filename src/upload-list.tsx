import { Text, List, ListItem, Flex, ListIcon, IconButton, Icon } from "@chakra-ui/react"
import FileIcon from "./FileIcon"
import TrashIcon from "./TrashIcon"

export default function UploadList({ files }: { files: File[] }) {
    return (
        <>
            <List spacing={0}>
                {files.map((file, index) => {
                    return (
                        <ListItem  key={index}>
                            <Flex alignItems={'center'} >
                                <ListIcon color={'gray.500'} as={FileIcon} />
                                <Text overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} flex={1} flexBasis={'80%'} >{file.name}</Text>
                                <IconButton aria-label='delete button' variant={'ghost'} icon={<Icon color={'gray.500'} as={TrashIcon} />} />
                            </Flex>
                        </ListItem>
                    )
                })}
            </List>

        </>
    )
}
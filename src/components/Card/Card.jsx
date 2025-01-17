import { Image } from '@chakra-ui/image'
import { Badge, Box } from '@chakra-ui/layout'
import { useRouter } from "next/router"
import React, { useEffect } from 'react'
import { useData } from '../../state/DataProvider'

const Card = ({item, favorite}) => {
    const {data, dispatch} = useData()
    const router = useRouter();
    let objDispatch = {}
    const property = {
        videoId: item.id.videoId,
        imageUrl: item.snippet.thumbnails.high.url,
        imageAlt: "youtube image",
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        description: item.snippet.description
      }

    const videoHandler = () => {
        console.log("item: ",item)
        dispatch({
            type: "CHANGE_PLAYER",
            payload: item
        })
        if (favorite) {
            router.push({
                pathname: "/favoriteVideoPlayer"
            })
        } else {
            router.push({
                pathname: "/videoPlayer"
            })
        }
        
    }
    
    return (
        <Box key={property.videoId} onClick={videoHandler} cursor="pointer" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image width="100%" maxW="382px" maxHeight="286px" src={property.imageUrl} alt={property.imageAlt} />

            <Box p="6">
            <Box d="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" color="teal">
                New
                </Badge>
            </Box>

            <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
            >
                {property.title}
            </Box>
            <Box as="span" color="gray.600" fontSize="sm">
                {property.channelTitle} 
            </Box>
            </Box>
        </Box>
    )
}

export default Card

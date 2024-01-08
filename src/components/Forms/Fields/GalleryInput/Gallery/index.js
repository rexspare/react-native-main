import Box from 'components/Box';
import React from 'react';
import {  ScrollView } from 'react-native';
import GalleryPhoto from './GalleryPhoto';

const Gallery = ({ values, onDelete }) => {
    return (
        <Box>
            <Box mt={3} ml={0.5} as={ScrollView} horizontal flexDirection={"row"}>
                {values?.map(image => <GalleryPhoto img={image} onDelete={onDelete} />)}
            </Box>
        </Box>
    )
}


export default Gallery;
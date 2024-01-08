import React from 'react';
import Box from '../Box';
import { Dimensions, ImageBackground } from 'react-native';

const w = Dimensions.get('window').width;
const CategoryBox = ({ imageChildren, children, styles, image, ...props }) => {
    return (
        <Box {...styles?.container}>
            <Box as={ImageBackground} source={image} m="6px" flexBasis={(w - 36) / 2} {...props} style={styles?.background} >
                {imageChildren}
            </Box>
            {children}
        </Box>
    )
}

export default CategoryBox;

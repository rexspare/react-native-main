import Box from 'components/Box';
import React from 'react';
import Carousel from 'react-native-snap-carousel'
import {styles} from './styles'
import Text from 'components/Text';
import { t } from 'helpers/react';

const ImageCarousel = ({photos, galleryWidth, renderImage, setActiveIndex, activeIndex})=>{
    return (
        <Box style={styles.imageBox}>
        <Box
          as={Carousel}
          style={{
            width: galleryWidth,
            resizeMode:'cover',
          }}
          data={photos?.length ? photos : [null]}
          sliderWidth={galleryWidth}
          itemWidth={galleryWidth}
          inactiveSlideScale={1}
          onSnapToItem={setActiveIndex}
          useScrollView
          renderItem={renderImage}
        />
        {t(photos?.length > 1,(
          <Box style={styles.pager} px={'8px'} py={'4px'}>
            <Text style={styles.pagerText}>{activeIndex+1}/{photos?.length}</Text>
          </Box>
        ))}
        
        </Box>
    )
}

export default ImageCarousel

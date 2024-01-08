import React, { useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageCarousel from 'components/ImageCarousel';
import WhiteCard from 'components/Cards/WhiteCard';
import Box from 'components/Box';
import Text from 'components/Text';
import { typography } from 'styles/typography';

const galleryHeight = Dimensions.get('screen').height * 0.18;
const galleryWidth = Dimensions.get('screen').width;

const CarouselCard = ({
  images,
  unit,
  title,
  isProperty,
  isUnit,
  children,
  texStyle,
}) => {
  const [activeImage, setActiveImage] = useState(0);

  const renderImage = useCallback(
    ({ item }) => (
      <Box
        as={FastImage}
        width={galleryWidth}
        height={galleryHeight}
        source={item ? { uri: item } : require('img/placeholder-building.jpeg')}
      />
    ),
    [],
  );

  const styles = {
    textStyleStopWorkOrder: {
      borderRadius: 12,
      fontSize: 12,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 15,
      paddingRight: 12,
      lineHeight: 18,
      textTransform: 'uppercase',
      borderColor: '#fff',
      borderWidth: 1,
      color: '#fff',
      marginTop: 8,
      backgroundColor: '#727978',
    },
    unitPrice: {
      fontWeight: '700',
      fontSize: 22,
      lineHeight: 22,
    },
  };

  return (
    <WhiteCard>
      <Box style={{ height: 100 }}>
        <ImageCarousel
          photos={images}
          galleryWidth={galleryWidth}
          renderImage={renderImage}
          setActiveIndex={setActiveImage}
          activeIndex={activeImage}
        />
      </Box>
      <Box px={20}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mt={24}>
          <Text
            style={{ ...typography['headline'], ...texStyle, width: '65%' }}
            category="label"
            mb={10}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {title}
          </Text>
          {isProperty && (
            <Text style={styles.textStyleStopWorkOrder}>Stop work order</Text>
          )}
          {isUnit && <Text style={styles.unitPrice}>{unit}</Text>}
        </Box>
        {children}
      </Box>
    </WhiteCard>
  );
};

export default CarouselCard;

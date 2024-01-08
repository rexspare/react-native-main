import React from 'react';
import { ImageBackground } from 'react-native';
import Box from 'components/Box';
import Button from 'components/Button';
import { deleteBtnProps } from 'components/Button/const';
import { t } from 'helpers/react';
import { colors } from 'styles/theme';

const GalleryPhoto = ({ img, onDelete }) => {
  return (
    <Box
      as={ImageBackground}
      source={img}
      style={styles.container}
      overflow={'hidden'}
      mx={'7px'}>
      {t(
        onDelete,
        <Button
          {...deleteBtnProps}
          onPress={() => onDelete(img)}
          style={{
            ...deleteBtnProps.style,
            ...styles.del,
          }}
          containerStyle={styles.delContainer}
        />,
      )}
    </Box>
  );
};

const styles = {
  container: {
    height: 160,
    width: 160,
    borderWidth: 1,
    borderColor: colors['gray scale/10'],
    borderRadius: 12,
  },
  delContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  del: {
    marginTop: 10,
    marginRight: 10,
  },
};

export default GalleryPhoto;

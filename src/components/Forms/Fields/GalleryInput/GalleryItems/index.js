import React from 'react';
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import useTheme from 'hooks/useTheme';
import Box from 'components/Box';
import Icon from 'components/Icon';
import FileIcon from 'img/icons/file.svg';
import Text from 'components/Text';
import Button from 'components/Button';
import { splitString } from 'utils/exchanges';
import { styles } from './styles';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const GalleryItem = ({ isImage, file, ext, theme }) => {
  return (
    <Box flexDirection="row" borderRadius={8} alignItems="center">
      {isImage ? (
        <Box borderRadius={8} overflow="hidden" marginRight={16}>
          <Box
            as={FastImage}
            borderRadius={8}
            overflow="hidden"
            source={file}
            {...styles.file(theme)}
          />
        </Box>
      ) : (
        <Box
          alignItems="center"
          {...styles.file(theme)}
          justifyContent="center"
          marginRight={16}>
          <FileIcon width="30" height="30" />
        </Box>
      )}
      <Text
        style={{
          ...typography['body/medium – regular'],
          color: colors['gray scale/90'],
        }}>
        {splitString(file.name, 25)}
      </Text>
    </Box>
  );
};

const GalleryItems = ({ value, disabled, readOnly, download, onRemove }) => {
  const theme = useTheme();
  const renderFile = React.useCallback(
    file => {
      let isImage = false;
      let ext = 'file';
      if (typeof file === 'number' || !file.type) {
        isImage = true;
      } else {
        if (file.name) {
          ext = `${file.name}`.substr(
            `${file.name}`.lastIndexOf('.') === -1
              ? `${file.name}`.length
              : `${file.name}`.lastIndexOf('.') + 1,
          );
        } else {
          ext = `${file.uri}`.substr(
            `${file.uri}`.lastIndexOf('.') === -1
              ? `${file.uri}`.length
              : `${file.uri}`.lastIndexOf('.') + 1,
          );
        }
        const [_, mime, type] = /(.*)\/(.*)/g.exec(file.type) || [];
        isImage =
          isImage ||
          ['png', 'jpeg', 'jpg', 'gif'].indexOf(type) !== -1 ||
          mime === 'image';
        ext = ext || type;
      }
      return (
        <GalleryItem file={file} ext={ext} theme={theme} isImage={isImage} />
      );
    },
    [theme],
  );
  return (
    <Box my={2} width="100%">
      {value &&
        Array.isArray(value) &&
        value.map((img, index) => (
          <>
            <Box mb="10px" flexDirection="row" width="100%">
              <Box position="relative" key={index} {...styles.fileWrapper}>
                <TouchableOpacity
                  overflow={'hidden'}
                  borderRadius={8}
                  activeOpacity={download ? 0.65 : 1}
                  onPress={download ? () => Linking.openURL(img?.uri) : null}>
                  {renderFile(img)}
                </TouchableOpacity>
              </Box>
              {!readOnly && !disabled && (
                <Box style={styles.deleteIconContainer}>
                  <Button
                    appearance="ghost"
                    {...styles.deleteBtn}
                    onPress={() => onRemove(index)}
                    icon={style =>
                      Icon('delete', 'pm')({ ...style, ...styles.deleteIcon })
                    }
                  />
                </Box>
              )}
            </Box>
          </>
        ))}
    </Box>
  );
};
export default GalleryItems;

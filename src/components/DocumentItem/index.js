import React, { memo } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import FileIcon from 'img/icons/file.svg';
import FolderIcon from 'img/icons/folder-open.svg';
import BuildingIcon from 'img/icons/document-building.svg'
import Box from '../Box';
import Text from '../Text';
import { DOCUMENT_TYPE } from 'constants/enums';
import Button from 'components/Button';
import Icon from '../Icon';
import { t } from 'helpers/react';
import { styles } from './style';
import { colors } from 'styles/theme';

const DocumentItem = ({
  name,
  type,
  isBuildingDocument,
  value = '',
  rightIcon = 'dots',
  onPress,
  onMore,
  isPrivate,
  showMoreBtn = true,
  addBorder = false,
  isTenant = false,
  permissions = null,
  buidlingFolders = false,
  my = 3,
  children,
  ...props
}) => {

  const Folder_Building_Icon = (isBuildingDocument && !buidlingFolders) ? BuildingIcon : FolderIcon;

  return (
    <Box
      as={TouchableOpacity}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      my={my}
      onPress={permissions?.view ? onPress : null}
      style={[
        { minHeight: 65 },
        !buidlingFolders && addBorder && {
          borderWidth: 1,
          borderColor: colors['gray scale/10'],
          borderRadius: 12,
          marginHorizontal: 10
        },
      ]}
      {...props}>
      <Box
        py="0px"
        height={48}
        width={48}
        style={{
          marginRight: 10,
          marginLeft: 10,
          borderRadius: 8,
          backgroundColor: isBuildingDocument ? 'transparent' : colors['gray scale/10'],
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {
          type == DOCUMENT_TYPE.FOLDER ? <Folder_Building_Icon
            width="30"
            height="30"
          /> : <FileIcon
            width="30"
            height="30"
          />
        }

      </Box>
      <Text
        numberOfLines={2}
        category={'s4'}
        borderWidth={1}
        flex={4}
        pt="1"
        style={[styles.name, (isBuildingDocument && !buidlingFolders) && { textTransform: "uppercase" }]}>
        {name}
      </Text>
      <Box
        as={TouchableOpacity}
        activeOpacity={onPress ? 0.7 : 1}
        onPress={onMore || onPress}
        flex={1}>
        <Text
          category="p2"
          status={onPress ? 'primary' : 'basic'}
          textAlign="right"
          style={styles.name}>
          {value}
        </Text>
      </Box>
      <Box flexDirection={'row'}>
        {t(
          isPrivate,
          <Box
            as={Button}
            appearance="ghost"
            opacity={0.54}
            py="0px"
            px="0px"
            style={styles.iconButton}
            icon={style => Icon('lock', 'pm')({ ...style, ...styles.icon })}
          />,
        )}

        {t(
          showMoreBtn,
          <Box
            as={Button}
            appearance="ghost"
            py="0px"
            px="0px"
            style={styles.iconButton}
            icon={
              permissions?.edit &&
              (style => Icon(rightIcon, 'pm')({ ...style, ...styles.icon }))
            }
            onPress={onMore}
          />,
        )}
        {children}
      </Box>
    </Box>
  );
};

export default memo(DocumentItem);

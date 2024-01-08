import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import Box from 'components/Box';
import { t } from 'helpers/react';
import { styles } from './styles';

const CheckboxField = ({ isSelected, onPress, style }) => {
  return (
    <Box style={[styles.checkbox, style]} as={TouchableOpacity} onPress={onPress}>
      {t(
        isSelected,
        <Icon width={15} height={15} pack={'pm'} name={'checkIcon'} />,
      )}
    </Box>
  );
};

export default CheckboxField;

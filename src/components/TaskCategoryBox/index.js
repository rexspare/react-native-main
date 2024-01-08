import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'components/Icon';
import Text from './../Text';
import { styles } from './styles'

const TaskCategoryBox = ({ name, onPress, icon }) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={styles.categoryItem}>
        <Text style={styles.categoryItemText}>{name}</Text>
        {Icon(icon, "pm")( styles.categoryItemIcon )}
  </TouchableOpacity>
  );
};

export default TaskCategoryBox;

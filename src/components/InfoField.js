import React from 'react';
import Text from './Text';
import Box from './Box';
import Icon from './Icon';
import Button from './Button';
import { TouchableOpacity } from 'react-native';

const InfoField = ({ label, value, secValue, leftIcon, rightIcon, onPress, my = "12px", labelCategory = "s3", labelStyle = {}, valueStyle = {}, ...props }) => {
  return value !== null && value !== undefined ? (
    <Box
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="space-between"
      my={my}
      {...props}>
      {leftIcon && <Box
        as={Button}
        appearance="ghost"
        py="0px"
        px="0px"
        icon={style => Icon(leftIcon, 'pm')({ ...style, width: 40, height: 40, })}
        style={{ marginRight: 10 }}
      />}
      <Text category={labelCategory} transform="uppercase" flex={2} pt="1" style={labelStyle}>
        {label}
      </Text>

      <Box
        as={TouchableOpacity}
        activeOpacity={onPress ? 0.7 : 1}
        onPress={onPress}
        flex={3}>
        <Text
          category="p2"
          status={onPress ? 'primary' : 'basic'}
          textAlign="right"
          style={valueStyle}>
          {value}
        </Text>
        {!!secValue && <Text
          category="p2"
          status={onPress ? 'primary' : 'basic'}
          textAlign="right"
          style={valueStyle}>
          {secValue}
        </Text>}
      </Box>
      {rightIcon && <Box
        as={Button}
        appearance="ghost"
        py="0px"
        px="0px"
        icon={style => Icon(rightIcon, 'pm')({ ...style, width: 20, height: 20, })}
      />}
    </Box>
  ) : null;
};

export default InfoField;

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Box from 'components/Box';
import { t } from 'helpers/react';
import { styles } from './styles';

export const RadioCircle = ({ isChecked }) => (
  <View
    style={[isChecked ? styles.radioButtonIconActive : styles.radioButtonIcon]}>
    {t(isChecked, <View style={[styles.radioButtonIconInnerIcon]} />)}
  </View>
);
const TabListButton = ({
  isChecked,
  text,
  icon,
  onButtonPress,
  isRadio,
  buttonWidth,
  textStyle,
  key,
  ...props
}) => {
  return (
    <>
      <Box
        key={key}
        width={buttonWidth}
        as={TouchableOpacity}
        style={[isChecked ? styles.mainContainerActive : styles.mainContainer]}
        onPress={onButtonPress}
        {...props}>
        {icon}
        <View style={[styles.radioButtonTextContainer]}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[
              isChecked ? styles.radioButtonTextActive : styles.radioButtonText,
              textStyle,
            ]}>
            {text}
          </Text>
        </View>
        {isRadio && <RadioCircle isChecked={isChecked} />}
      </Box>
    </>
  );
};

export default TabListButton;

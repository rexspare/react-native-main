import React from 'react';
import Box from 'components/Box';
import Button from 'components/Button';
import InputLabel from 'components/InputLabel';
import Icon from 'components/Icon';
import { stringifyEnumKey } from 'constants/enums';
import { styles } from './styles';
import { input_label_16 } from 'styles/reusable-classes';

const MultiSelectBoxes = ({
  label,
  onPress,
  values,
  value,
  containerStyle,
  activeColor,
  isRequired,
  styles: _styles,
  style,
  icon,
  activeIcon,
  iconProps,
  ...itemProps
}) => {
  const getIsActive = v => value === values[v];
  const valuesArray = Object.keys(values);

  return (
    <Box style={containerStyle} {..._styles?.container}>
      <InputLabel
        labelStyle={[input_label_16, _styles?.label]}
        label={label}
        isRequired={isRequired}
      />
      <Box
        justifyContent={'space-between'}
        {...styles.optionsContainer}
        {..._styles?.optionsContainer}>
        {valuesArray.map((v, i) => {
          const isActive = getIsActive(v);
          return (
            <Box
              as={Button}
              key={v}
              backgroundColor="transparent"
              appearance="outline"
              mr={i < valuesArray.length - 1 && 1}
              py={0}
              textStyle={[
                styles.optionText,
                _styles?.optionText,
                isActive && styles.activeOptionText(activeColor),
                isActive && _styles?.activeTxt,
              ]}
              style={[
                styles.option,
                isActive && styles.activeOption(activeColor),
                style,
                isActive && _styles?.active,
                _styles?.option,
              ]}
              icon={
                !!icon
                  ? () =>
                      Icon(
                        isActive ? activeIcon : icon,
                        'pm',
                      )({ ...styles.icon })
                  : null
              }
              onPress={() => onPress(values[v])}
              containerStyle={_styles?.buttonStyle}
              {...itemProps}>
              {stringifyEnumKey(v)}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MultiSelectBoxes;

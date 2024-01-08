import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { isString } from 'lodash';
import Box from '../Box';
import Text from '../Text';
import InputLabel from '../InputLabel';
import SelectButton from './SelectButton';
import Calendar from 'img/icons/calendar_black.svg';
import GreyCalendar from 'img/icons/calendar_grey.svg';
import { t } from 'helpers/react';
import { input_label_16 } from 'styles/reusable-classes';
import { style } from './style';

const SelectButtonInput = ({
  value,
  label,
  addLabel,
  onAdd,
  icon = 'plus',
  labelCategory = 'label',
  renderValue: _renderValue,
  addLabelTransform = null,
  displayChange = true,
  buttonProps,
  LabelComponent = Text,
  styles,
  disabled = false,
  labelStyle,
  renderValueProps,
  changeBtnText = 'Change',
  chooseBtnText = 'SELECT',
  isRequired,
  error,
  titleAppender,
  setValue,
  isPlusIcon,
  isSelected,
  actionProps,
  isCalendarIcon = true,
  subtitle,
  isGreyCalendar,
  ...props
}) => {
  const renderTitleAppender = useCallback(() => {
    if (titleAppender) return titleAppender;
    return (
      <SelectButton
        isChange={!!value}
        chooseBtnText={chooseBtnText}
        changeBtnText={changeBtnText}
        onPress={onAdd}
        displayChange={displayChange}
        isPlusIcon={isPlusIcon}
        isSelected={isSelected}
        value={value}
        disabled={disabled}
        {...buttonProps}
        {...props}
      />
    );
  }, [
    titleAppender,
    changeBtnText,
    chooseBtnText,
    disabled,
    onAdd,
    displayChange,
    value,
  ]);

  const customStyle = StyleSheet.create({
    valueContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  const renderValue = useCallback(() => {
    if (!value || value?.length === 0) return null;
    if (_renderValue) return _renderValue?.(value, renderValueProps);

    const textStyle = [{ ...input_label_16 }, styles?.textStyle];

    if (Array.isArray(value)) {
      return (
        <Box style={customStyle.valueContainer}>
          {isCalendarIcon &&
            (isGreyCalendar ? (
              <GreyCalendar
                width="25"
                height="25"
                style={[{ marginRight: 10, marginTop: 2 }, styles?.iconStyle]}
              />
            ) : (
              <Calendar
                style={[{ marginRight: 10, marginTop: 2 }, styles?.iconStyle]}
                width="20"
                height="20"
              />
            ))}
          <Text style={textStyle}>
            {value.map((item, index) => (
              <Text key={index}>
                {item[0]}
                {index !== value.length - 1 ? ', ' : ''}
              </Text>
            ))}
          </Text>
        </Box>
      );
    }

    if (isString(value)) {
      return (
        <Box style={customStyle.valueContainer}>
          {isCalendarIcon &&
            (isGreyCalendar ? (
              <GreyCalendar
                width="25"
                height="25"
                style={[{ marginRight: 10, marginTop: 2 }, styles?.iconStyle]}
              />
            ) : (
              <Calendar
                style={[{ marginRight: 10, marginTop: 2 }, styles?.iconStyle]}
                width="20"
                height="20"
              />
            ))}
          <Text style={textStyle}>{value}</Text>
        </Box>
      );
    }
    return value;
  }, [value, _renderValue, renderValueProps]);

  return (
    <Box style={style.container}>
      <Box style={style.wrapper} {...props}>
        <Box style={style.headerContainer}>
          <Box style={style.labelContainer}>
            <InputLabel
              labelStyle={[input_label_16, labelStyle]}
              label={label}
              isRequired={isRequired}
            />
            {subtitle && <Text style={style.subtitleStyle}>{subtitle}</Text>}
          </Box>
          {renderTitleAppender()}
        </Box>
        <Box width={'100%'} flex={1} flexDirection="column" >
          {renderValue()}
        </Box>
      </Box>
      {t(
        !!error,
        <Text mt={1} style={style.error}>
          {error}
        </Text>,
      )}
    </Box>
  );
};

export default SelectButtonInput;

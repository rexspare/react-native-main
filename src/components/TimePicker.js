import React from 'react';
import {Platform, PickerIOS as Picker} from 'react-native';
import Box from './Box';
import SelectInputForward from './SelectInput';
import useTheme from 'hooks/useTheme';
import Text from './Text';

const hours = [...Array(12).keys()];
const minutes = [...Array(60).keys()];

const sanitizeDate = date => {
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

const _styles = {
  itemStyle: (theme)  => ({
      fontSize: theme['text-paragraph-1-font-size'],
      fontFamily: theme['text-paragraph-1-font-family'],
      fontWeight: theme['text-paragraph-1-font-weight'],
      lineHeight: theme['text-paragraph-1-line-height'],
      height: 120,
      width: 60,
  })
}

const TimePicker = ({value, onChange, styles}) => {
  const theme = useTheme();

  const parsedValue = React.useMemo(() => {
    const d = new Date(value);
    const hour = d.getHours();
    return {
      hour: hour < 12 ? hour : hour - 12,
      minute: d.getMinutes(),
      am: hour < 12,
    };
  }, [value]);

  const onHourSelect = React.useCallback(
    hour => {
      const d = new Date(value);
      sanitizeDate(d);
      d.setHours((d.getHours() < 12 ? 0 : 12) + hour);
      onChange?.(d);
    },
    [onChange, value],
  );

  const onMinuteSelect = React.useCallback(
    min => {
      const d = new Date(value);
      sanitizeDate(d);
      d.setMinutes(min);
      onChange?.(d);
    },
    [onChange, value],
  );

  const onAMPMSelect = React.useCallback(
    am => {
      const d = new Date(value);
      sanitizeDate(d);
      const wasAm = d.getHours() < 12;
      if (wasAm !== am) {
        d.setHours(d.getHours() + (am ? -12 : 12));
      }
      onChange?.(d);
    },
    [onChange, value],
  );

  return (
    <Box
      py="2"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-around"
      {...styles?.container}
    >
      <Box
        flexDirection="row"
        flex={2}
        justifyContent="space-around"
        alignItems={Platform.OS === 'ios' && false ? 'flex-end' : 'center'}>
        <Box flex={1} alignItems="center" justifyContent="center">
          {Platform.OS === 'ios' ? (
            <Picker
              onValueChange={onHourSelect}
              selectedValue={parsedValue.hour}
              itemStyle={_styles.itemStyle(theme)}>
              {hours.map((value, i) => (
                <Picker.Item
                  label={`0${value}`.substr(`${value}`.length - 1)}
                  value={value}
                  key={value}
                />
              ))}
            </Picker>
          ) : (
            <SelectInputForward
              value={`0${parsedValue.hour}`.substr(
                `${parsedValue.hour}`.length - 1,
              )}
              onSelect={val => onHourSelect(val.key)}
              options={hours.map(h => ({
                key: h,
                title: `0${h}`.substr(`${h}`.length - 1),
              }))}
              size="small"
            />
          )}
        </Box>
        <Box alignItems="center" justifyContent="center">
          <Text mt={0} mx="2">
            :
          </Text>
        </Box>
        <Box flex={1} alignItems="center" justifyContent="center">
          {Platform.OS === 'ios' ? (
            <Picker
              onValueChange={onMinuteSelect}
              selectedValue={parsedValue.minute}
              itemStyle={_styles.itemStyle(theme)}>
              {minutes.map((value, i) => (
                <Picker.Item
                  label={`0${value}`.substr(`${value}`.length - 1)}
                  value={i}
                  key={value}
                />
              ))}
            </Picker>
          ) : (
            <SelectInputForward
              value={`0${parsedValue.minute}`.substr(
                `${parsedValue.minute}`.length - 1,
              )}
              onSelect={val => onMinuteSelect(val.key)}
              options={minutes.map(m => ({
                key: m,
                title: `0${m}`.substr(`${m}`.length - 1),
              }))}
              size="small"
            />
          )}
        </Box>
      </Box>
      <Box mx="2" />
      <Box flex={1} alignItems="center" justifyContent="center">
        {Platform.OS === 'ios' ? (
          <Picker
            onValueChange={onAMPMSelect}
            selectedValue={parsedValue.am}
            itemStyle={{..._styles.itemStyle(theme), width: 80}}
          >
            <Picker.Item label="AM" value={true}  style={{backgroundColor: "red"}}/>
            <Picker.Item label="PM" value={false} />
          </Picker>
        ) : (
          <SelectInputForward
            value={parsedValue.am ? 'AM' : 'PM'}
            onSelect={val => onAMPMSelect(val.key)}
            options={[
              {
                key: true,
                title: 'AM',
              },
              {
                key: false,
                title: 'PM',
              },
            ]}
            size="small"
          />
        )}
      </Box>
    </Box>
  );
};

export default TimePicker;

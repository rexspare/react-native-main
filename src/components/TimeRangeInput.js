import React from 'react';
import Box from './Box';
import Text from './Text';
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
  PickerIOS as Picker,
} from 'react-native';
import styled from 'styled-components/native';
import {Toggle} from '@ui-kitten/components';
import Collapsible from 'react-native-collapsible';
import useTheme from 'hooks/useTheme';
// import Picker from '@gregfrench/react-native-wheel-picker';
import Switch from './Switch';
import SelectInputForward from './SelectInput';

const HourButton = styled(Text).attrs(({active}) => ({
  status: active ? 'primary' : 'basic',
}))`
  text-decoration: underline;
  text-decoration-color: ${({active, theme}) =>
    theme[active ? 'text-primary-color' : 'text-basic-color']};
`;

const hours = [...Array(12).keys()].map(h => h + 1);
const minutes = [...Array(60).keys()];

const TimeRangeInput = ({
  label,
  startLabel,
  endLabel,
  value,
  onChange,
  error,
  groupKey,
  openKey,
  setOpenKey,
  ...props
}) => {
  const theme = useTheme();
  const [activeSetter, setActiveSetter] = React.useState(null);

  React.useEffect(() => {
    if (groupKey && openKey && openKey !== groupKey) {
      setActiveSetter(null);
    }
  }, [groupKey, openKey]);

  const start = React.useMemo(() => {
    if (value?.start) {
      return {
        hour: value.start?.hour ?? 0,
        minute: value.start?.minute ?? 0,
        am: value.start?.am ?? true,
      };
    }
    return {
      hour: 0,
      minute: 0,
      am: true,
    };
  }, [value]);
  const end = React.useMemo(() => {
    if (value?.end) {
      return {
        hour: value.end.hour ?? 0,
        minute: value.end.minute ?? 0,
        am: value.end?.am ?? true,
      };
    }
    return {
      hour: 0,
      minute: 0,
      am: true,
    };
  }, [value]);

  const toggleActiveSetter = React.useCallback(
    type => () => {
      setActiveSetter(active => (active === type ? null : type));
      setOpenKey?.(groupKey);
    },
    [groupKey, setOpenKey],
  );

  const onToggle = React.useCallback(
    checked => {
      if (!checked) {
        onChange?.(null);
        setActiveSetter(null);
      } else {
        onChange?.({
          start: {
            hour: 0,
            minute: 0,
            am: true,
          },
        });
        setOpenKey?.(groupKey);
        setActiveSetter('start');
      }
    },
    [groupKey, onChange, setOpenKey],
  );

  const onHourSelect = React.useCallback(
    type => hour =>
      onChange?.({
        ...(value || {}),
        [type]: {
          minute: 0,
          am: true,
          ...(value?.[type] ?? {}),
          hour: hour - 1,
        },
      }),
    [onChange, value],
  );

  const onMinuteSelect = React.useCallback(
    type => index =>
      onChange?.({
        ...(value || {}),
        [type]: {
          hour: 0,
          am: true,
          ...(value?.[type] ?? {}),
          minute: index,
        },
      }),
    [onChange, value],
  );

  const onAMPMSelect = React.useCallback(
    type => val =>
      onChange?.({
        ...(value || {}),
        [type]: {
          hour: 0,
          minute: 0,
          ...(value?.[type] ?? {}),
          am: val,
        },
      }),
    [onChange, value],
  );

  return (
    <Box my="1" {...props}>
      <Box flexDirection="row" alignItems="center">
        <Text flex={1}>{label}</Text>
        <Box flex={2} flexDirection="row">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleActiveSetter('start')}>
            <HourButton category="p2" active={activeSetter === 'start'}>
              {value?.start
                ? `${`0${(value.start?.hour ?? 0) + 1}`.substr(
                    `${(value.start?.hour ?? 0) + 1}`.length - 1,
                  )}:${`0${value.start?.minute ?? 0}`.substr(
                    `${value.start?.minute ?? 0}`.length - 1,
                  )} ${value.start?.am ?? true ? 'AM' : 'PM'}`
                : startLabel}
            </HourButton>
          </TouchableOpacity>
          <Text mx="3">-</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleActiveSetter('end')}>
            <HourButton category="p2" active={activeSetter === 'end'}>
              {value?.end
                ? `${`0${(value.end?.hour ?? 0) + 1}`.substr(
                    `${(value.end?.hour ?? 0) + 1}`.length - 1,
                  )}:${`0${value.end?.minute ?? 0}`.substr(
                    `${value.end?.minute ?? 0}`.length - 1,
                  )} ${value.end?.am ?? true ? 'AM' : 'PM'}`
                : endLabel}
            </HourButton>
          </TouchableOpacity>
        </Box>
        <Box>
          <Switch
            status="primary"
            checked={!!(value && (value.end || value.start))}
            onChange={onToggle}
          />
        </Box>
      </Box>
      {error ? (
        <Text category="caption" status="danger">
          {error}
        </Text>
      ) : null}
      {['start', 'end'].map(type => (
        <Collapsible collapsed={activeSetter !== type} key={type}>
          <Box flexDirection="row" my={3}>
            <Text flex={2} category="s3" transform="uppercase" status="primary">
              {type === 'start' ? startLabel : endLabel}
            </Text>
            <Box
              flex={Platform.OS === 'ios' ? 5 : 7}
              pt={40}
              flexDirection="row"
              alignItems="center">
              {Platform.OS === 'ios' ? (
                <Picker
                  onValueChange={onHourSelect(type)}
                  selectedValue={(type === 'start' ? start : end).hour + 1}
                  itemStyle={{
                    fontSize: theme['text-paragraph-1-font-size'],
                    fontFamily: theme['text-paragraph-1-font-family'],
                    fontWeight: theme['text-paragraph-1-font-weight'],
                    lineHeight: theme['text-paragraph-1-line-height'],
                    height: 120,
                    width: 40,
                    marginBottom: -30,
                    marginTop: -60,
                  }}>
                  {hours.map((value, i) => (
                    <Picker.Item
                      label={`0${value}`.substr(`${value}`.length - 1)}
                      value={value}
                      key={value}
                    />
                  ))}
                </Picker>
              ) : (
                <Box width={100} mt={-25}>
                  <SelectInputForward
                    value={`0${(type === 'start' ? start : end).hour +
                      1}`.substr(
                      `${(type === 'start' ? start : end).hour + 1}`.length - 1,
                    )}
                    onSelect={val => onHourSelect(type)(val.key)}
                    options={hours.map(h => ({
                      key: h,
                      title: `0${h}`.substr(`${h}`.length - 1),
                    }))}
                    size="small"
                  />
                </Box>
              )}
              <Text mt={-30} mx="2">
                :
              </Text>
              {Platform.OS === 'ios' ? (
                <Picker
                  onValueChange={onMinuteSelect(type)}
                  selectedValue={(type === 'start' ? start : end).minute}
                  itemStyle={{
                    fontSize: theme['text-paragraph-1-font-size'],
                    fontFamily: theme['text-paragraph-1-font-family'],
                    fontWeight: theme['text-paragraph-1-font-weight'],
                    lineHeight: theme['text-paragraph-1-line-height'],
                    height: 120,
                    width: 40,
                    marginBottom: -30,
                    marginTop: -60,
                  }}>
                  {minutes.map((value, i) => (
                    <Picker.Item
                      label={`0${value}`.substr(`${value}`.length - 1)}
                      value={i}
                      key={value}
                    />
                  ))}
                </Picker>
              ) : (
                <Box width={100} mt={-25}>
                  <SelectInputForward
                    value={`0${(type === 'start' ? start : end).minute}`.substr(
                      `${(type === 'start' ? start : end).minute}`.length - 1,
                    )}
                    onSelect={val => onMinuteSelect(type)(val.key)}
                    options={minutes.map(m => ({
                      key: m,
                      title: `0${m}`.substr(`${m}`.length - 1),
                    }))}
                    size="small"
                  />
                </Box>
              )}
              <Box mx="2" />
              {Platform.OS === 'ios' ? (
                <Picker
                  onValueChange={onAMPMSelect(type)}
                  selectedValue={(type === 'start' ? start : end).am}
                  itemStyle={{
                    fontSize: theme['text-paragraph-1-font-size'],
                    fontFamily: theme['text-paragraph-1-font-family'],
                    fontWeight: theme['text-paragraph-1-font-weight'],
                    lineHeight: theme['text-paragraph-1-line-height'],
                    height: 120,
                    width: 40,
                    marginBottom: -30,
                    marginTop: -60,
                  }}>
                  <Picker.Item label="AM" value={true} />
                  <Picker.Item label="PM" value={false} />
                </Picker>
              ) : (
                <Box width={100} mt={-25}>
                  <SelectInputForward
                    value={(type === 'start' ? start : end).am ? 'AM' : 'PM'}
                    onSelect={val => onAMPMSelect(type)(val.key)}
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
                </Box>
              )}
            </Box>
          </Box>
        </Collapsible>
      ))}
    </Box>
  );
};

export default TimeRangeInput;

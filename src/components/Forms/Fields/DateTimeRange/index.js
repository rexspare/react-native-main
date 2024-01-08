import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Divider, Icon } from '@ui-kitten/components';
import useTheme from 'hooks/useTheme';
import { useIsOpen } from 'hooks/useIsOpen';
import Box from 'components/Box';
import SelectButtonInput from 'components/SelectButtonInput';
import FullPageBottomModal from 'components/FullPageBottomModal';
import Calendar from 'components/Calendar';
import TouchableText from 'components/TouchableText';
import SwitchField from 'components/Forms/Fields/SwitchField';
import TimePickerModalField from 'components/Forms/Fields/TimePickerModalField';
import SelectInput from 'components/SelectInput';
import { workHoursDaysOptions } from './WorkHoursField';
import Text from '../../../Text';
import { t } from 'helpers/react';
import { format } from 'helpers/date';
import { chain } from 'helpers/func';
import { standardShortDateFormat } from 'constants/dateFormat';
import { TAB_ENUM } from './const';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import { styles, defaultCopy } from './styles';

const defaultRenderValue = (value, weekDays, labelStyle, clearDate) => {
  const dateText =
    format(value?.startDate, standardShortDateFormat) +
    (value?.endDate
      ? `- ${format(value?.endDate, standardShortDateFormat)}`
      : '');

  const timeText =
    formatTime(value?.startTime) +
    (value?.endTime ? ` - ${formatTime(value?.endTime)}` : '');

  return (
    <Box flex={1}>
      <Box
        flex={1}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Box my={1} flexDirection="row" alignItems="center">
          {t(
            !!value?.startDate,
            <Icon
              style={{ marginRight: 8 }}
              width={20}
              height={20}
              pack={'pm'}
              name={'calendar_black'}
            />,
          )}
          {t(!!value?.startDate, <Text style={labelStyle}>{dateText}</Text>)}
        </Box>
        {t(
          !!value?.startDate && clearDate,
          <Box as={TouchableOpacity} onPress={clearDate}>
            <Icon width={20} height={20} pack={'pm'} name={'remove-filter'} />
          </Box>,
        )}
      </Box>
      <Box my={1} flexDirection="row" alignItems="center">
        {t(
          !!value?.startTime,
          <Icon
            style={{ marginRight: 8 }}
            width={20}
            height={20}
            pack={'pm'}
            name={'clock'}
          />,
        )}
        {t(!!value?.startTime, <Text style={labelStyle}>{timeText}</Text>)}
      </Box>
    </Box>
  );
};

const { height } = Dimensions.get('screen');
const formatTime = date => format(date, 'hh:mm aaa', '', { toDate: true });

const DateTimeRange = ({
  value,
  boundingMonth,
  onSelect,
  isDateRange,
  inputProps,
  copy = defaultCopy,
  labelStyle,
  Component = SelectButtonInput,
  triggerKey = 'onAdd',
  editable = true,
  renderValue = defaultRenderValue,
  displayAllDay = true,
  displayDone = false,
  isWeekdays,
  clearDate,
  title = 'DATE',
  leftIcon = 'chevron-right',
  btnText = 'SAVE',
  displayDoneRight = false,
  showTimePicker = false,
  ...props
}) => {
  const { isOpen, open, close } = useIsOpen();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeTab, setActiveTab] = useState(TAB_ENUM.START_DATE);
  const [startTime, setStartTime] = useState(value?.startTime ?? new Date());
  const [endTime, setEndTime] = useState(value?.endTime ?? new Date());
  const [allDay, setAllDay] = useState(value?.allDay ?? false);
  const [isOpenTime, setIsOpenTime] = useState(false);
  const [weekDays, setWeekDays] = useState(workHoursDaysOptions);
  const [dayIndex, setDayIndex] = useState(null);
  const startTimeRef = useRef();
  const endTimeRef = useRef();

  const theme = useTheme();
  const actionsProps = { [triggerKey]: () => editable && open() };

  const convertAMPM = time => {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice(1);
      time.pop();
      time[5] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = +time[0] % 12 || 12;
    }
    return time.join('');
  };

  useEffect(() => {
    if (value && !isDateRange) {
      weekDays.map(day => {
        const index = value.findIndex(val2 => val2.day == day.key);
        if (index != -1 && !day?.isUpdate) {
          day.start = convertAMPM(value[index]?.start);
          day.end = convertAMPM(value[index]?.end);
          day.isUpdate = true;
        } else if (!day?.isUpdate) {
          day.start =
            new Date().getHours() < 12
              ? convertAMPM(format(new Date(), 'HH:mm:ss'))
              : convertAMPM(
                format(
                  new Date(new Date().getTime() - 12 * 60 * 60 * 1000),
                  'HH:mm:ss',
                ),
              );
          day.end =
            new Date().getHours() >= 12
              ? convertAMPM(format(new Date(), 'HH:mm:ss'))
              : convertAMPM(
                format(
                  new Date(new Date().getTime() - 12 * 60 * 60 * 1000),
                  'HH:mm:ss',
                ),
              );
        }
        return day;
      });
    }
  }, [value]);

  useEffect(() => {
    const initialStartDate =
      value?.startDate ?? !isWeekdays
        ? value?.startDate
          ? value?.startDate
          : new Date()
        : workHoursDaysOptions[0];
    const initialEndDate =
      value?.endDate ?? !isWeekdays
        ? value?.endDate
          ? value?.endDate
          : new Date()
        : workHoursDaysOptions[0];
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  }, []);

  useEffect(() => {
    if (weekDays[dayIndex]?.start) {
      startTimeRef?.current?.scrollToIndex({
        index: weekDays[dayIndex]?.start,
        animated: true,
        viewOffset: 50,
        viewPosition: (weekDays[dayIndex]?.start - 2) * 50,
      });
    }
    if (weekDays[dayIndex]?.end) {
      endTimeRef?.current?.scrollToIndex({
        index: weekDays[dayIndex]?.end,
        animated: true,
        viewOffset: 50,
        viewPosition: (weekDays[dayIndex]?.end - 2) * 50,
      });
    }
  }, [startTimeRef]);

  const cleanDate = (d, time) => {
    d.setHours(time?.getHours());
    d.setMinutes(time?.getMinutes());
    return d;
  };

  const renderTabItem = useCallback(
    ({ tabEnum, value }) => {
      return (
        <Box
          onPress={() => setActiveTab(tabEnum)}
          as={TouchableOpacity}
          mr={1}
          px={2}
          py={2}
          style={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor:
              activeTab === tabEnum
                ? colors['primary/50']
                : colors['gray scale/10'],
          }}
          backgroundColor={
            activeTab === tabEnum ? colors['primary/50'] : '#fff'
          }>
          <Text
            style={{
              color: activeTab === tabEnum ? '#fff' : colors['gray scale/90'],
              fontSize: 14,
            }}>
            {value}
          </Text>
        </Box>
      );
    },
    [activeTab],
  );

  const renderCustomTable = useCallback(
    ({ onSelect, date }) => (
      <Calendar
        boundingMonth={boundingMonth}
        onSelect={onSelect}
        {...props}
        date={date}
      />
    ),
    [startDate],
  );

  const renderCustomTimePicker = useCallback(
    ({ label, onSelect, time, tabEnum }) => {
      return (
        <TimePickerModalField
          theme={theme}
          copy={{ modalLabel: label }}
          setValue={val => onSelect(val)}
          value={time}
          isDialogeOpen={activeTab == tabEnum}>
          {renderTabItem({
            tabEnum,
            value: format(time || new Date(), 'HH:mm: SS'),
          })}
        </TimePickerModalField>
      );
    },
    [activeTab],
  );

  const renderItem = useCallback(
    ({ label, dateTab, date, timeLabel, timeTab, setTime, time }) => {
      return (
        <Box
          borderTopWidth={1}
          borderColor={colors['gray scale/10']}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          py={3}
          px={3}>
          <Text style={{ color: colors['gray scale/90'], fontSize: 18 }}>
            {label}
          </Text>
          <Box flexDirection="row" alignItems="center">
            {renderTabItem({
              tabEnum: dateTab,
              value: isWeekdays ? date?.title : format(date, 'MM/dd/yyyy'),
            })}
            {(!!!isDateRange || showTimePicker) &&
              t(
                !!!allDay,
                renderCustomTimePicker({
                  label: timeLabel,
                  onSelect: setTime,
                  time,
                  tabEnum: timeTab,
                }),
              )}
          </Box>
        </Box>
      );
    },
    [activeTab, allDay, startDate, endDate],
  );

  const setTime = item => {
    const updatedWeek = [
      ...weekDays.slice(0, item?.key - 1),
      item,
      ...weekDays.slice(item?.key),
    ];
    setWeekDays(updatedWeek);
  };

  const openTimeModal = index => {
    setDayIndex(index);
    setIsOpenTime(true);
  };

  const closeTimeModal = index => {
    setIsOpenTime(false);
  };

  const renderDayItem = useCallback(
    ({ item, index }) => {
      if (!!item) {
        return (
          <Box>
            <Box
              onPress={() => openTimeModal(index)}
              as={TouchableOpacity}
              style={{marginVertical: 7}}
              borderTopWidth={item?.key == 1 ? 0 : 1}
              borderColor={colors['gray scale/10']}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              px={3}>
              <Text
                style={{
                  ...typography['body/medium – regular'],
                  color: colors['gray scale/90'],
                }}>
                {item?.title}
              </Text>
              {t(
                !item?.dayOff,
                <Box flexDirection="row" alignItems="center">
                  <Box
                    style={{
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: colors['gray scale/10'],
                      paddingVertical: 7,
                      paddingHorizontal: 10
                    }}
                    backgroundColor={'#fff'}>
                    <Text
                      style={{
                        ...typography['body/small – regular'],
                        color: colors['gray scale/90'],
                        fontSize: 14,
                      }}>
                      {`${item?.start} - ${item?.end}`}
                    </Text>
                  </Box>
                  <Icon
                    marginLeft={5}
                    width={15}
                    height={15}
                    pack={'pm'}
                    name={'chevron-left'}
                  />
                </Box>,
              )}
            </Box>
            {t(index < weekDays.length - 1, <Divider />)}
          </Box>
        );
      }
    },
    [weekDays],
  );

  const renderSelectWeekday = useCallback(({ onSelect, value, label }) => (
    <Box px={3} pb={2}>
      <SelectInput
        options={workHoursDaysOptions}
        label={label}
        mx={2}
        onSelect={onSelect}
        value={value?.title}
      />
    </Box>
  ));

  const renderTabContent = useCallback(
    ({ isOpen, onSelect, time, date }) => {
      if (!isOpen) return null;
      if (!isWeekdays)
        return renderCustomTable({
          onSelect: val => onSelect(cleanDate(val, time)),
          date: date,
        });
      else return renderSelectWeekday({ onSelect, value: date });
    },
    [renderCustomTimePicker, renderSelectWeekday, cleanDate],
  );

  const renderTime = useCallback(() => {
    return (
      <Box mx={3} mt={3}>
        <SwitchField
          label={'Day Off'}
          checked={weekDays[dayIndex]?.dayOff}
          onChange={val =>
            setTime({
              ...weekDays[dayIndex],
              dayOff: !weekDays[dayIndex]?.dayOff,
            })
          }
          containerStyle={{ height: 25, width: 40 }}
          circleSize={20}
          circleRadius={26}
          styles={{
            container: { paddingHorizontal: 1, marginBottom: 3, marginLeft: 1 },
          }}
        />
        <Text
          style={{
            ...typography['body/medium – regular'],
            color: colors['gray scale/90'],
          }}>
          {weekDays[dayIndex]?.title} Hours
        </Text>
        <Box
          my={3}
          px={2}
          alignItems="center"
          style={{
            borderWidth: 2,
            borderColor: colors['gray scale/10'],
            borderRadius: 8,
            paddingVertical: 8,
          }}
          flexDirection="row"
          justifyContent="space-between">
          <Box height={150} style={{ marginRight: 8, flex: 1 }}>
            <FlatList
              ref={startTimeRef}
              data={[...Array(12).keys()]}
              renderItem={({ item }) => {
                const isSelected =
                  item + 1 == weekDays[dayIndex]?.start.split(':')[0];
                return (
                  <Box
                    as={TouchableOpacity}
                    onPress={() => {
                      const startTime =
                        item < 9
                          ? `${convertAMPM(`0${item + 1}:00:00`)}`
                          : convertAMPM(`${item + 1}:00:00`);
                      setTime({
                        ...weekDays[dayIndex],
                        start: startTime,
                        isUpdate: true,
                      });
                    }}
                    style={[
                      {
                        backgroundColor: isSelected
                          ? colors['primary/5']
                          : 'transparent',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        borderRadius: 8,
                      },
                      weekDays[dayIndex]?.dayOff &&
                      isSelected && {
                        backgroundColor: colors['gray scale/10'],
                      },
                    ]}>
                    <Text
                      style={{
                        ...typography['body/medium – regular'],
                        color: colors['gray scale/40'],
                      }}>{`${item + 1}:00 ${item === 11 ? 'PM' : 'AM'}`}</Text>
                  </Box>
                );
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item}
              getItemLayout={(_, index) => ({
                length: 50,
                offset: 50 * index,
                index,
              })}
              initialNumToRender={3}
              initialScrollIndex={
                weekDays[dayIndex]?.start ? weekDays[dayIndex]?.start - 2 : 0
              }
            />
          </Box>
          <Box height={150} style={{ marginLeft: 8, flex: 1 }}>
            <FlatList
              ref={endTimeRef}
              data={[...Array(12).keys()]}
              renderItem={({ item }) => {
                const hours = weekDays[dayIndex]?.end.split(':')[0];
                const mins = weekDays[dayIndex]?.end
                  .split(':')[1]
                  .split(' ')[0];
                const isSelected =
                  hours > 10 && mins > 30
                    ? item + 1 == 12
                    : item + 1 == weekDays[dayIndex]?.end.split(':')[0];
                return (
                  <Box
                    as={TouchableOpacity}
                    onPress={() => {
                      const endTime =
                        item < 9
                          ? `${convertAMPM(`${item + 13}:00:00`)}`
                          : item > 10
                            ? convertAMPM(`${item + 12}:59:00`)
                            : convertAMPM(`${item + 13}:00:00`);
                      setTime({
                        ...weekDays[dayIndex],
                        end: endTime,
                        isUpdate: true,
                      });
                    }}
                    style={[
                      {
                        backgroundColor: isSelected
                          ? colors['primary/5']
                          : 'transparent',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        borderRadius: 8,
                      },
                      weekDays[dayIndex]?.dayOff &&
                      isSelected && {
                        backgroundColor: colors['gray scale/10'],
                      },
                    ]}>
                    <Text
                      style={{
                        ...typography['body/medium – regular'],
                        color: colors['gray scale/40'],
                      }}>{`${item + 1}:00 ${item === 11 ? 'AM' : 'PM'}`}</Text>
                  </Box>
                );
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item}
              getItemLayout={(_, index) => ({
                length: 50,
                offset: 50 * index,
                index,
              })}
              initialNumToRender={3}
              initialScrollIndex={
                weekDays[dayIndex]?.end ? weekDays[dayIndex]?.end - 2 : 0
              }
            />
          </Box>
        </Box>
      </Box>
    );
  }, [dayIndex, weekDays]);

  const headerRight = (
    <TouchableText
      style={{
        ...typography['body/small – medium'],
        color: colors['primary/50 – brand'],
      }}
      onPress={() => closeTimeModal()}>
      SAVE
    </TouchableText>
  );

  const hoursHeaderRight = (
    <TouchableText
      style={{
        ...typography['body/small – medium'],
        color: colors['primary/50 – brand'],
      }}
      onPress={chain([
        close,
        () =>
          onSelect(
            { startDate, endDate, startTime, endTime, allDay },
            weekDays,
          ),
      ])}>
      {btnText}
    </TouchableText>
  );

  return (
    <>
      <Component
        value={value}
        mt={1}
        styles={{ ...inputProps, changeBtn: styles.changeBtn }}
        labelStyle={labelStyle}
        renderValue={val => renderValue(val, weekDays, labelStyle, clearDate)}
        {...props}
        {...inputProps}
        {...actionsProps}
        {...copy}
      />
      <FullPageBottomModal
        visible={isOpen || isOpenTime}
        onHide={
          isOpenTime ? chain([() => setIsOpenTime(false)]) : chain([close])
        }
        styles={
          isOpenTime
            ? { close: styles.close, headerTxt: props.headerTxt }
            : { close: styles.close, headerTxt: props.headerTxt }
        }
        title={isOpenTime ? 'TIME' : title}
        displayDone={isOpenTime ? false : displayDone}
        leftIcon={leftIcon}
        displayDoneRight={!isOpenTime && displayDoneRight}
        headerRight={
          isOpenTime ? headerRight : !displayDoneRight && hoursHeaderRight
        }>
        {isOpenTime ? (
          <Box
            as={ScrollView}
            height={(height / 100) * 70}
            {...styles.timeContentx}>
            {renderTime()}
          </Box>
        ) : (
          <Box as={isDateRange && ScrollView} {...styles.dateTimeRangeContent}>
            {displayAllDay && (
              <Box mx={2} mt={3}>
                <SwitchField
                  label={'ALL DAY'}
                  checked={allDay}
                  onChange={val => setAllDay(val)}
                  containerStyle={{ height: 30, width: 50 }}
                  circleSize={26}
                  circleRadius={26}
                  labelStyle={{ textTransform: 'uppercase' }}
                  styles={{
                    container: {
                      paddingHorizontal: 1,
                      marginBottom: 3,
                      marginLeft: 1,
                    },
                  }}
                />
              </Box>
            )}
            {(displayAllDay || isDateRange) && (
              <>
                {renderItem({
                  label: 'STARTS',
                  dateTab: TAB_ENUM.START_DATE,
                  date: startDate,
                  timeLabel: 'Start Time',
                  timeTab: TAB_ENUM.START_TIME,
                  setTime: setStartTime,
                  time: startTime,
                })}
                {renderTabContent({
                  isOpen: activeTab != TAB_ENUM.END_DATE,
                  onSelect: setStartDate,
                  time: startTime,
                  date: startDate,
                })}
                {renderItem({
                  label: 'ENDS',
                  dateTab: TAB_ENUM.END_DATE,
                  date: endDate,
                  timeLabel: 'End Time',
                  timeTab: TAB_ENUM.END_TIME,
                  setTime: setEndTime,
                  time: endTime,
                })}
                {renderTabContent({
                  isOpen: activeTab === TAB_ENUM.END_DATE,
                  onSelect: setEndDate,
                  time: endTime,
                  date: endDate,
                })}
              </>
            )}
            {!isDateRange &&
              weekDays?.map((item, index) => renderDayItem({ item, index }))}
          </Box>
        )}
      </FullPageBottomModal>
    </>
  );
};

export default DateTimeRange;

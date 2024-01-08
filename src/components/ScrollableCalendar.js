import React, { useEffect, useRef } from 'react';
import { CalendarList } from 'react-native-calendars';
import { format } from 'date-fns';
import Text from './Text';
import Box from './Box';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const calendarTheme = {
  width: '100%',
  backgroundColor: 'transparent',
  calendarBackground: 'transparent',
  calendarWidth: '100%',
  textSectionTitleColor: colors['gray scale/40'],
  textSectionTitleDisabledColor: colors['gray scale/40'],
  selectedDayBackgroundColor: colors['primary/50 – brand'],
  selectedDayTextColor: '#ffffff',
  todayTextColor: colors['gray scale/90'],
  dayTextColor: colors['gray scale/90'],
  textDisabledColor: colors['gray scale/30'],
  monthTextColor: colors['gray scale/40'],
  textDayFontFamily: 'Roboto',
  textMonthFontFamily: 'Roboto',
  textDayFontWeight: '400',
  textMonthFontWeight: 'bold',
};

const weeks = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const ScrollableCalendar = ({
  onSelect,
  markDate,
  max,
  min,
  ...calendarParams
}) => {
  const calendarRef = useRef(null);

  const handleScrollToDate = () => {
    calendarRef?.current?.scrollToDay(markDate); // scroll selected date
  };

  useEffect(() => {
    if (markDate) {
      setTimeout(() => handleScrollToDate(), 0);
    }
  }, [markDate]);

  return (
    <>
      <Box
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 35,
          paddingLeft: 35,
        }}>
        {weeks.map(e => (
          <Text
            style={{
              ...typography['body/x-small – regular'],
              color: colors['gray scale/30'],
            }}>
            {e}
          </Text>
        ))}
      </Box>
      <CalendarList
        ref={calendarRef}
        staticHeader={true}
        pastScrollRange={50}
        futureScrollRange={50}
        scrollEnabled={true}
        calendarWidth={'100%'}
        showScrollIndicator={false}
        hideDayNames={true}
        maxDate={max ? format(max, 'MM/dd/yyyy') : ''}
        minDate={min}
        style={{
          dayText: {
            marginTop: 20,
          },
        }}
        onDayPress={day => {
          onSelect(day);
        }}
        markedDates={{
          [markDate]: {
            selected: true,
            selectedColor: colors['primary/50 – brand'],
            maxHeight: 100,
          },
        }}
        calendarStyle={{
          paddingBottom: 0,
          margin: 10,
          maxHeight: 320,
          alignSelf: 'center'
        }}
        monthMarginTop={10}
        customHeader={({ current }) => {
          return (
            <Text
              style={{
                ...typography['buttons/large'],
                color: colors['gray scale/40'],
                marginBottom: 12,
                textTransform: 'uppercase',
              }}>
              {format(new Date(current), 'MMMM YYY')}
            </Text>
          );
        }}
        theme={calendarTheme}
        {...calendarParams}
      />
    </>
  );
};

export default ScrollableCalendar;

import React from 'react';
import DateTimeRange from 'components/Forms/Fields/DateTimeRange';
import BorderedText from 'components/BorderedText';
import Box from 'components/Box';
import { DAYS, stringifyEnumValue } from 'constants/enums';
import {
  formatHours,
  lastDay,
  stringToHour,
  workTimes,
} from 'utils/formatWorkHours';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const thisTime = `${new Date().getHours()}:${new Date().getMinutes()}`;
const pmDate = new Date(new Date().getTime() - 12 * 60 * 60 * 1000);
const pmTime = `${pmDate.getHours()}:${pmDate.getMinutes()}`;
const isPm = new Date().getHours() > 12;

const commonTxtProps = {
  bw: 0,
  c: '#fff',
  mr: 1,
  styles: {
    text: {
      ...typography['body/small – regular'],
      textTransform: 'uppercase',
    },
  },
};

// To do, configure this to work from enum DAYS const.
export const workHoursDaysOptions = [
  {
    key: 1,
    title: 'Monday',
    dayOff: false,
    start: stringToHour(isPm ? pmTime : thisTime),
    end: stringToHour(isPm ? thisTime : pmTime),
  },
  {
    key: 2,
    title: 'Tuesday',
    dayOff: false,
    start: stringToHour(isPm ? pmTime : thisTime),
    end: stringToHour(isPm ? thisTime : pmTime),
  },
  {
    key: 3,
    title: 'Wednesday',
    dayOff: false,
    start: stringToHour(isPm ? pmTime : thisTime),
    end: stringToHour(isPm ? thisTime : pmTime),
  },
  {
    key: 4,
    title: 'Thursday',
    dayOff: false,
    start: stringToHour(isPm ? pmTime : thisTime),
    end: stringToHour(isPm ? thisTime : pmTime),
  },
  {
    key: 5,
    title: 'Friday',
    dayOff: false,
    start: stringToHour(isPm ? pmTime : thisTime),
    end: stringToHour(isPm ? thisTime : pmTime),
  },
  {
    key: 6,
    title: 'Saturday',
    dayOff: false,
    start: stringToHour(isPm ? pmTime : thisTime),
    end: stringToHour(isPm ? thisTime : pmTime),
  },
  {
    key: 7,
    title: 'Sunday',
    dayOff: false,
    start: stringToHour(isPm ? pmTime : thisTime),
    end: stringToHour(isPm ? thisTime : pmTime),
  },
];

const WorkHoursField = ({ value, onSelect, isChange, ...props }) => {
  return (
    <DateTimeRange
      value={value}
      onSelect={onSelect}
      isWeekdays
      copy={{ label: 'Hours' }}
      labelStyle={{
        textTransform: 'uppercase',
        ...typography['body/medium – medium'],
        color: colors['gray scale/40'],
      }}
      title={'Hours'}
      displayAllDay={false}
      isChange={isChange}
      renderValue={(val, weekDays) => {
        return (
          <Box>
            {workTimes(formatHours(val))?.map(e => {
              return (
                <Box flexDirection={'row'} mt={2}>
                  <BorderedText
                    bgc={colors['primary/50']}
                    text={
                      e?.day
                        ? e.day?.length > 1
                          ? `${stringifyEnumValue(
                              DAYS,
                              lastDay(e?.day).firstDay,
                            )} - ${stringifyEnumValue(
                              DAYS,
                              lastDay(e?.day).lastDay,
                            )}`
                          : `${stringifyEnumValue(DAYS, e?.day)}`
                        : ''
                    }
                    {...commonTxtProps} 
                  />
                  <BorderedText
                    bgc={colors['gray scale/40']}
                    text={`${e?.start} - ${e?.end}`}
                    {...commonTxtProps}
                  />
                </Box>
              );
            })}
          </Box>
        );
      }}
      {...props}
    />
  );
};

export default WorkHoursField;

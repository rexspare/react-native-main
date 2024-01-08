import React from 'react';
import Text from 'components/Text';
import Box from 'components/Box';
import { lastDay, workTimes } from 'utils/formatWorkHours';
import { DAYS, stringifyEnumValue } from 'constants/enums';
import { typography } from 'styles/typography';

const convertAMPM = time => {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];
  if (time.length > 1) {
    time = time.slice(1);
    time.pop();
    time[5] = +time[0] < 12 ? ' AM' : ' PM';
    time[0] = +time[0] % 12 || 12;
  }
  return time.join('');
};

const WorkHours = ({ data, ...props }) => {
  return (
    <Box>
      {workTimes(data).map((e, index) => {
        return (
          <Box key={index}>
            <Text
              textAlign={'right'}
              style={typography['body/medium – regular']}>
              {e?.day
                ? e.day?.length > 1
                  ? `${stringifyEnumValue(
                      DAYS,
                      lastDay(e?.day).firstDay,
                    )} - ${stringifyEnumValue(DAYS, lastDay(e?.day).lastDay)}`
                  : `${stringifyEnumValue(DAYS, e?.day)}`
                : ''}
            </Text>
            <Text
              textAlign={'right'}
              style={[typography['body/medium – regular'], props.textStyle]}>
              {e?.start
                ? `${convertAMPM(e?.start)} - ${convertAMPM(e?.end)}`
                : ''}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default WorkHours;

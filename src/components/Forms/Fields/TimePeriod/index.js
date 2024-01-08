import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useIsOpen } from 'hooks/useIsOpen';
import Box from 'components/Box';
import SelectButtonInput from 'components/SelectButtonInput';
import BottomHalfModal from 'components/BottomHalfModal';
import ScrollableCalendar from 'components/ScrollableCalendar';
import Button from 'components/Button';
import MultiTextSwitch from 'components/MultiTextSwitch';
import ScrollableMonthCalendar from 'components/ScrollableMonthCalendar';
import ScrollableQuarterCalendar from 'components/ScrollableQuarterCalendar';
import ScrollableYearCalendar from 'components/ScrollableYearCalendar';
import TouchableText from 'components/TouchableText';
import { format } from 'helpers/date';
import { chain } from 'helpers/func';
import { stringifyEnumValue } from 'constants/enums';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import { styles, defaultCopy } from './styles';

const { height } = Dimensions.get('screen');

const defaultMax = new Date(
  new Date().setFullYear(new Date().getFullYear() + 3),
);

const tabs = [
  {
    text: 'Period',
  },
  {
    text: 'Selected',
  },
];

export const CALENDAR_TYPES = {
  DAYS: 1,
  MONTHS: 2,
  QUATERS: 3,
  YEARS: 4,
};

const  CALENDAR_ENUM = {
  DAYS: 'days',
  MONTH :'month',
  QUATER: 'quarter',
  YEARS: 'year',

}
const separateDateStyles = {
  startingDay: true,
  endingDay: true,
  color: 'transparent',
  textColor: colors['gray scale/0'],
  customTextStyle: {
    backgroundColor: colors['primary/50 – brand'],
    width: '90%',
    height: '100%',
    textAlign: 'center',
    lineHeight: 32,
    borderRadius: 50,
    color: colors['gray scale/0'],
  },
};

const TimePeriod = ({
  value,
  onSelect,
  inputProps,
  copy = defaultCopy,
  labelStyle,
  Component = SelectButtonInput,
  triggerKey = 'onAdd',
  editable = true,
  max = defaultMax,
  ...props
}) => {
  const { isOpen, open, close } = useIsOpen();
  const [calendarType, setCalendarType] = useState(1);
  const [textWidth, setTextWidth] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const [filterObject, setFilterObject] = useState({});
  const [switchTab, setSwitchTab] = useState(0);

  useEffect(() => {
    if (!!selectedPeriod.length) {
      if (calendarType === 1) {
        const daysArray = selectedPeriod?.flatMap(month => {
          const date = new Date(month);
          const year = date?.getFullYear();
          const monthIndex = date.getMonth();
          const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
          const days = Array.from({ length: daysInMonth }, (_, i) =>
            new Date(year, monthIndex, i + 2).toISOString().slice(0, 10),
          );
          return days;
        });

        setSelectedPeriod(daysArray);
      } else if (calendarType === 2) {
        const monthsArray = selectedPeriod.map(date => date.slice(0, 7));
        const uniqueMonths = [...new Set(monthsArray.map(e => e + '-01'))];
        setSelectedPeriod(uniqueMonths);
      }
    }
  }, [calendarType]);

  useEffect(() => {
    const dateArray = switchTab === 0 ? selectedPeriod : selectedDate;
    if (dateArray) {
      const obj = {};
      dateArray.forEach((element, index) => {
        obj[`${element}`] =
          switchTab === 0
            ? {
                startingDay: index === 0 ? true : false,
                endingDay: index === dateArray.length - 1 ? true : false,
                color: colors['primary/5'],
                textColor:
                  index === dateArray.length - 1 || index === 0
                    ? colors['gray scale/0']
                    : colors['gray scale/90'],
                customTextStyle: {
                  backgroundColor:
                    index === dateArray.length - 1 || index === 0
                      ? colors['primary/50 – brand']
                      : 'transparent',
                  width: '100%',
                  height: '100%',
                  textAlign: 'center',
                  lineHeight: 32,
                  color:
                    index === dateArray.length - 1 || index === 0
                      ? colors['gray scale/0']
                      : colors['gray scale/90'],
                },
              }
            : separateDateStyles;
      });
      setFilterObject(obj);
    }
  }, [selectedDate, selectedPeriod]);

  useEffect(() => {
    const value = Object.keys(CALENDAR_TYPES).find(
      k => CALENDAR_TYPES[k] === calendarType,
    );
    if (value.length >= 7) {
      setTextWidth({
        width: '17%',
        marginLeft: '4%',
      });
    } else if (value.length >= 6) {
      setTextWidth({
        width: '16%',
        marginLeft: '4%',
      });
    } else if (value.length >= 5) {
      setTextWidth({
        width: '10%',
        marginLeft: '5%',
      });
    } else {
      setTextWidth({
        width: '1%',
        marginLeft: '6%',
      });
    }
  }, [calendarType]);

  const actionsProps = { [triggerKey]: () => editable && open() };

  const setDateD = useCallback(
    d => {
      switchTab === 1 ? changeDate(d?.dateString) : changePeriod(d?.dateString);
    },
    [selectedPeriod, selectedDate, switchTab],
  );

  useEffect(() => {
    switchTab === 1 ? setSelectedPeriod([]) : setSelectedDate([]);
  }, [switchTab]);

  const changePeriod = (date, type) => {
    let period = [...selectedPeriod];
    if (date) {
      if (!!period[0]) {
        if (period.length > 1) {
          period = [date];
        } else {
          const startDate =
            new Date(date).getTime() < new Date(period[0]).getTime()
              ? new Date(date)
              : new Date(period[0]);
          const endDate =
            new Date(date).getTime() > new Date(period[0]).getTime()
              ? new Date(date)
              : new Date(period[0]);

          const dates = [];
          switch (type) {
            case CALENDAR_ENUM.MONTH: {
              while (startDate <= endDate) {
                const year = startDate.getFullYear();
                const month = ('0' + (startDate.getMonth() + 1)).slice(-2);
                dates.push(`${year}-${month}-01`);
                startDate.setMonth(startDate.getMonth() + 1);
              }
              break;
            }
            case CALENDAR_ENUM.QUATER: {
              while (startDate <= endDate) {
                const year = startDate.getFullYear();
                const month = ('0' + (startDate.getMonth() + 1)).slice(-2);
                dates.push(`${year}-${month}`);
                startDate.setMonth(startDate.getMonth() + 1);
              }
              break;
            }
            case CALENDAR_ENUM.YEARS: {
              while (startDate <= endDate) {
                const year = startDate.getFullYear();
                dates.push(`${year}`);
                startDate.setFullYear(startDate.getFullYear() + 1);
              }
              break;
            }
            default: {
              while (startDate?.getTime() <= endDate?.getTime()) {
                dates?.push(format(startDate, 'yyyy-MM-dd'));
                startDate?.setDate(startDate?.getDate() + 1);
              }
              break;
            }
          }
          period = [...dates];
        }
      } else {
        period = [date];
      }
      setSelectedPeriod(period);
    }
  };

  const changeDate = (date, type) => {
    let newDate = [...selectedDate];
    if (date) {
      if (!!newDate) {
        const filterDate = new Date(date);
        const dates = [];

        switch (type) {
          case CALENDAR_ENUM.MONTH: {
            const year = filterDate.getFullYear();
            const month = ('0' + (filterDate.getMonth() + 1)).slice(-2);
            dates.push(`${year}-${month}-01`);
            filterDate.setMonth(filterDate.getMonth() + 1);
            break;
          }
          case CALENDAR_ENUM.QUATER: {
            const year = filterDate.getFullYear();
            const month = ('0' + (filterDate.getMonth() + 1)).slice(-2);
            dates.push(`${year}-${month}`);
            filterDate.setMonth(filterDate.getMonth() + 1);
            break;
          }
          case CALENDAR_ENUM.YEARS: {
            const year = filterDate.getFullYear();
            dates.push(`${year}`);
            filterDate.setFullYear(filterDate.getFullYear() + 1);
            break;
          }
          default: {
            dates.push(format(filterDate, 'yyyy-MM-dd'));
            filterDate.setDate(filterDate.getDate() + 1);
            break;
          }
        }

        newDate.push(dates);
      } else {
        newDate = [date];
      }
      setSelectedDate(newDate);
    }
  };

  const setMonth = date => {
    switchTab === 1 ? changeDate(date, 'month') : changePeriod(date, 'month');
  };

  const setQuarter = date => {
    switchTab === 1
      ? changeDate(date, 'quarter')
      : changePeriod(date, 'quarter');
  };

  const setYear = date => {
    switchTab === 1 ? changeDate(date, 'year') : changePeriod(date, 'year');
  };

  const onDateSave = () => {
    onSelect(
      switchTab === 0
        ? {
            startDate: selectedPeriod[0],
            endDate:
              calendarType === 1
                ? selectedPeriod[selectedPeriod.length - 1]
                : getLastDayOfMonth(selectedPeriod[selectedPeriod.length - 1]),
          }
        : selectedDate,
    );
    close();
  };

  const getLastDayOfMonth = date => {
    const splitDate = date?.split('-');
    return splitDate.length > 1
      ? `${splitDate[0]}-${splitDate[1]}-${new Date(
          splitDate[0],
          splitDate[1] + 1,
          0,
        ).getDate()}`
      : date;
  };

  const clearDate = () => {
    setSelectedPeriod([]);
  };

  const headerRight = (
    <TouchableText
      style={{
        ...typography['body/small – medium'],
        textTransform: 'uppercase',
      }}
      onPress={clearDate}>
      {'Clear'}
    </TouchableText>
  );
  return (
    <>
      <Component
        value={
          (!!value?.startDate &&
            !!value?.endDate &&
            value?.startDate &&
            value?.startDate + ' - ' + value?.endDate) ||
          value
        }
        mt={1}
        styles={{ ...inputProps, changeBtn: styles.changeBtn }}
        labelStyle={labelStyle}
        {...actionsProps}
        {...props}
        {...inputProps}
        {...copy}
      />
      <BottomHalfModal
        visible={isOpen}
        onHide={chain([close])}
        styles={{ close: styles.close }}
        title={'Time Period'}
        headerRight={headerRight}
        displayDone={false}>
        {/* <Box mt={3} mx={2} mb={2}>
          <MultiTextSwitch
            shape="circle"
            size="small"
            options={tabs}
            onSelect={() => {
              if (switchTab === 0) {
                setFilterObject({});
                setSwitchTab(1);
              } else {
                setFilterObject({});
                setSwitchTab(0);
              }
            }}
            value={switchTab}
          />
        </Box> */}
        <MultiTextSwitch
          shape="circle"
          size="small"
          options={Object.values(CALENDAR_TYPES).map(value => ({
            text: stringifyEnumValue(CALENDAR_TYPES, value),
            value,
          }))}
          onSelect={options => setCalendarType(options.value)}
          value={calendarType - 1}
          style={{
            width: '91%',
            marginHorizontal: '4.5%',
            marginTop: 10,
            backgroundColor: 'transparent',
            borderWidth: 0,
            switchBackground: {
              elevation: 0,
              shadowColor: 'transparent',
              backgroundColor: 'transparent',
              borderBottomWidth: 2,
              borderRadius: 0,
              borderBottomColor: colors['primary/50 – brand'],
              ...textWidth,
            },
            activeTextColor: colors['gray scale/90'],
          }}
          textColor={{ color: colors['primary/50 – brand'] }}
        />
        <Box
          backgroundColor={'transparent'}
          height={(height / 100) * 60}
          pb={50}
          {...styles.content}>
          {calendarType === 1 && (
            <ScrollableCalendar
              onSelect={setDateD}
              max={max}
              min={props?.min}
              markingType={'period'}
              markedDates={filterObject}
              futureScrollRange={0}
            />
          )}
          {calendarType === 2 && (
            <ScrollableMonthCalendar
              onSelect={setMonth}
              markedDates={filterObject}
              isSeparate={switchTab === 1}
            />
          )}
          {calendarType === 3 && (
            <ScrollableQuarterCalendar
              onSelect={setQuarter}
              markedDates={filterObject}
              isSeparate={switchTab === 1}
            />
          )}
          {calendarType === 4 && (
            <ScrollableYearCalendar
              onSelect={setYear}
              markedDates={filterObject}
            />
          )}
        </Box>
        {(!!selectedPeriod.length || !!selectedDate.length) && (
          <Button
            onPress={onDateSave}
            textStyle={{
              textTransform: 'uppercase',
              ...typography['buttons/large'],
            }}
            style={{
              borderRadius: 12,
              width: '100%',
            }}
            size="large">
            Select
          </Button>
        )}
      </BottomHalfModal>
    </>
  );
};

export default TimePeriod;

import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, FlatList, Dimensions } from 'react-native';
import moment from 'moment/moment';
import { useIsOpen } from 'hooks/useIsOpen';
import Box from 'components/Box';
import SelectButtonInput from 'components/SelectButtonInput';
import BottomHalfModal from 'components/BottomHalfModal';
import Text from '../../../Text';
import { chain } from 'helpers/func';
import { format } from 'helpers/date';
import { standardDateFormat } from 'constants/dateFormat';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';
import { styles, defaultCopy } from './styles';

const { height } = Dimensions.get('screen');

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const generateYears = () => {
  var max = 2008;
  var min = max - 103;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years.reverse(years);
};
const BirthCalendar = ({
  value,
  onSelect,
  inputProps,
  copy = defaultCopy,
  labelStyle,
  icon,
  Component = SelectButtonInput,
  triggerKey = 'onAdd',
  editable = true,
  ...props
}) => {
  const { isOpen, open, close } = useIsOpen();
  const [date, setDate] = useState(props?.date ?? value ?? null);
  const [days, setDays] = useState(
    new Date(
      moment(date).format('YYYY'),
      moment(date).format('M'),
      0,
    ).getDate(),
  );
  const [day, setDay] = useState(value ? moment(date).format('DD') : null);
  const [year, setYear] = useState(value ? moment(date).format('YYYY') : null);
  const [month, setMonth] = useState(value ? moment(date).format('M') : null);
  const years = generateYears();
  const DateRef = useRef();
  const MonthRef = useRef();
  const YearsRef = useRef();
  const modalHeight = (height / 100) * 20;

  useEffect(() => {
    if (month && day && year) {
      setDate(new Date(`${months[month - 1]} ${day} ${year}`));
    }
  }, [day, year, month]);

  const actionsProps = { [triggerKey]: () => editable && open() };

  const onDateSave = () => {
    if (month && day && year) {
      onSelect(date);
    }
    close();
  };

  const renderList = ({
    listRef,
    data,
    value,
    onPress,
    isAdd,
    isMonth,
    isReverse,
  }) => {
    return (
      <FlatList
        ref={listRef}
        data={data}
        inverted={isReverse}
        style={{marginHorizontal: 8}}
        renderItem={({ item, index }) => {
          const isSelected = isAdd ? index + 1 == value : item == value;
          return (
            <Box
              as={TouchableOpacity}
              onPress={() => onPress(item, index)}
              style={[
                {
                  backgroundColor: isSelected
                    ? colors['primary/5']
                    : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: (modalHeight - 8) / 3,
                  borderRadius: 8,
                },
              ]}>
              <Text
                style={{
                  ...typography['body/medium – regular'],
                  color: isSelected
                    ? colors['gray scale/90']
                    : colors['gray scale/40'],
                  textTransform: "uppercase"
                }}>
                {isAdd && !isMonth ? `${item + 1}` : item}
              </Text>
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
        initialScrollIndex={0}
      />
    );
  };

  return (
    <>
      <Component
        value={format(value, standardDateFormat)}
        mt={1}
        styles={{ ...inputProps, changeBtn: styles.changeBtn }}
        labelStyle={labelStyle}
        {...actionsProps}
        {...props}
        {...inputProps}
        {...copy}
        chooseBtnText={'SELECT'}
      />
      <BottomHalfModal
        visible={isOpen}
        onHide={chain([close, onDateSave])}
        styles={{ close: styles.close }}
        title={'Date of birth'}
        displayDone={false}
        displayDoneRight={true}>
        <Box
          backgroundColor={'transparent'}
          height={modalHeight}
          {...styles.content}>
          <Box
            my={1}
            alignItems="center"
            flexDirection="row">
            {renderList({
              listRef: DateRef,
              data: [...Array(days).keys()],
              value: day,
              onPress: item => setDay(item + 1),
              isAdd: true,
            })}
            {renderList({
              listRef: MonthRef,
              data: months,
              value: month,
              onPress: (item, index) => {
                setMonth(index + 1);
                setDays(
                  new Date(
                    moment(props?.date ?? value).format('YYYY'),
                    index + 1,
                    0,
                  ).getDate(),
                );
              },
              isAdd: true,
              isMonth: true,
            })}
            {renderList({
              listRef: YearsRef,
              data: years.reverse(),
              value: year,
              onPress: (item, index) => {
                setYear(item);
              },
              isReverse: true,
            })}
          </Box>
        </Box>
      </BottomHalfModal>
    </>
  );
};

export default BirthCalendar;

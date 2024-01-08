import Box from 'components/Box';
import SelectButtonInput from 'components/SelectButtonInput';
import { format } from 'helpers/date';
import { useIsOpen } from 'hooks/useIsOpen';
import Calendar from 'components/Calendar';

import React, { useCallback, useEffect, useState } from 'react';
import { chain } from 'helpers/func';
import { styles, defaultCopy } from './styles';
import BottomHalfModal from 'components/BottomHalfModal';
import { Dimensions } from 'react-native';
import { standardDateFormat } from 'constants/dateFormat';
import ScrollableCalendar from 'components/ScrollableCalendar';
import Button from 'components/Button';
import { typography } from 'styles/typography';

const { height } = Dimensions.get('screen');

const defaultMax = new Date(
  new Date().setFullYear(new Date().getFullYear() + 3),
);

const DateField = ({
  value,
  boundingMonth,
  onSelect,
  inputProps,
  copy = defaultCopy,
  labelStyle,
  icon,
  Component = SelectButtonInput,
  triggerKey = 'onAdd',
  editable = true,
  max = defaultMax,
  isScrollCalendar = false,
  ...props
}) => {
  const { isOpen, open, close } = useIsOpen();
  const [date, setDate] = useState(props?.date ?? value ?? null);
  const [markDate, setMarkDate] = useState(null);

  useEffect(() => props?.date && setDate(props?.date), [props?.date]);

  const actionsProps = { [triggerKey]: () => editable && open() };
  const setDateD = useCallback(
    d => {
      if (d?.dateString) {
        setDate(new Date(d?.dateString));
        setMarkDate(d?.dateString);
      } else {
        d.setHours(new Date().getHours());
        d.setMinutes(new Date().getMinutes());
        setDate(d);
      }
    },
    [date],
  );

  const onDateSave = () => {
    onSelect(date);
    close();
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
        onHide={chain([close])}
        styles={{ close: styles.close }}
        title={'Choose Date'}
        displayDone={false}>
        <Box
          backgroundColor={'transparent'}
          height={(height / 100) * 62}
          {...styles.content}>
          {!isScrollCalendar ? (
            <Box mb="3">
              <Calendar
                boundingMonth={boundingMonth}
                onSelect={setDateD}
                max={max}
                {...props}
                date={date}
              />
            </Box>
          ) : (
            <ScrollableCalendar
              markDate={markDate}
              onSelect={setDateD}
              max={max}
              min={props?.min}
            />
          )}
        </Box>
        {date && (
          <Button
            onPress={onDateSave}
            textStyle={{
              textTransform: 'uppercase',
              ...typography['buttons/large'],
            }}
            style={{ borderRadius: 12 }}
            size="large">
            Select
          </Button>
        )}
      </BottomHalfModal>
    </>
  );
};

export default DateField;

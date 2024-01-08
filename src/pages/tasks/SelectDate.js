import React from 'react';
import Box from 'components/Box';
import {Layout} from '@ui-kitten/components';
import Header from 'components/Header';
import SafeAreaView from 'components/SafeAreaView';
import Text from 'components/Text';
import {ScrollView} from 'react-native';
import GradientButton from 'components/GradientButton';
import TimePicker from 'components/TimePicker';
import useTheme from 'hooks/useTheme';
import LinearGradient from 'react-native-linear-gradient';
import Calendar from 'components/Calendar';
import format from 'date-fns/format';
import Button from 'components/Button';
import { usaDateFormat } from 'constants/dateFormat';

const stripSeconds = date => {
  const d = new Date(date);
  d.setMilliseconds(0);
  d.setSeconds(0);
  return d;
};

const SelectDate = ({navigation, route}) => {
  const [date, setDate] = React.useState(route?.params?.value ?? new Date());
  const theme = useTheme();

  const withDate = React.useMemo(() => route.params?.date ?? true, [
    route.params,
  ]);
  const withTime = React.useMemo(() => route.params?.time ?? true, [
    route.params,
  ]);

  const title = React.useMemo(
    () => route.params?.title ?? (withDate ? 'Select Date' : 'Select Time'),
    [route.params, withDate],
  );

  const onSelect = React.useCallback(() => {
    route.params?.onSelect?.(stripSeconds(date));
    navigation.goBack();
  }, [date, navigation, route.params]);

  const setDateD = React.useCallback(
    d => {
      d.setHours(date.getHours());
      d.setMinutes(date.getMinutes());
      setDate(d);
    },
    [date],
  );

  return (
    <Box as={Layout} flex={1}>
      <Box as={SafeAreaView} flex={1} forceInset={{top: 'always'}}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              onPress: () => navigation.goBack(),
              left: true,
            },
          ]}
          title={title}
          divider
        />
        <Box
          as={ScrollView}
          flex={1}
          px="3"
          py="4"
          contentContainerStyle={{paddingBottom: 100}}>
          {withDate ? (
            <>
              <Text category="label" status="primary" transform="uppercase">
                Date
              </Text>
              <Text appearance="hint" fontSize={24} lineHeight={30} my="3">
                {format(date, usaDateFormat)}
              </Text>
              <Box mb="3">
                <Calendar onSelect={setDateD} date={date} />
              </Box>
            </>
          ) : null}

          {withTime ? (
            <>
              <Text category="label" status="primary" transform="uppercase">
                Select Time
              </Text>
              <Text appearance="hint" fontSize={24} lineHeight={30} my="3">
                {format(date, 'KK:mm a')}

              </Text>
              <Box p="3" style={{transform: [{scale: 1.1}]}}>
                <TimePicker value={date} onChange={setDate} />
              </Box>
            </>
          ) : null}
        </Box>
        <Box
          as={LinearGradient}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          locations={[0.4, 1]}
          colors={[
            theme['color-primary-500' && 'background-basic-color-1'],
            '#ffffff00',
          ]}
          position="absolute"
          left={0}
          right={0}
          bottom={0}>
          <Box
            px="4"
            pb={40}
            pt={60}
          >
            <Button size="giant" onPress={onSelect}>
              OK
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectDate;

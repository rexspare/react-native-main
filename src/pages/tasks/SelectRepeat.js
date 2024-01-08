import React from 'react';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Collapsible from 'react-native-collapsible';
import { Layout, Radio } from '@ui-kitten/components';
import format from 'date-fns/format';
import useTheme from 'hooks/useTheme';
import Box from 'components/Box';
import Header from 'components/Header';
import SafeAreaView from 'components/SafeAreaView';
import Text from 'components/Text';
import Button from 'components/Button';
import { usaDateFormat } from 'constants/dateFormat';
import { stringifyEnumKey, EVENT_REPEATS } from 'constants/enums';
import { typography } from 'styles/typography';

const stripSeconds = date => {
  const d = new Date(date);
  d.setMilliseconds(0);
  d.setSeconds(0);
  return d;
};

const SelectRepeat = ({ navigation, route }) => {
  const [endRepeat, setEndRepeat] = React.useState(route?.params?.endRepeat);
  const [repeat, setRepeat] = React.useState(
    route.params?.repeat ?? EVENT_REPEATS.NEVER,
  );
  const theme = useTheme();

  React.useEffect(() => {
    if (repeat === EVENT_REPEATS.NEVER && endRepeat) {
      setEndRepeat(null);
    }
  }, [endRepeat, repeat]);

  const onSelect = React.useCallback(() => {
    route.params?.onSelect?.({
      repeat,
      endRepeat: endRepeat && stripSeconds(endRepeat),
    });
    navigation.goBack();
  }, [endRepeat, navigation, repeat, route.params]);

  return (
    <Box as={Layout} flex={1}>
      <Box as={SafeAreaView} flex={1} forceInset={{ top: 'always' }}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              onPress: () => navigation.goBack(),
              left: true,
            },
          ]}
          title="Repeat"
          divider
        />
        <Box
          as={ScrollView}
          flex={1}
          px="4"
          py="4"
          contentContainerStyle={{ paddingBottom: 100 }}>
          {Object.keys(EVENT_REPEATS).map(k => (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              key={k}
              mx="2"
              mb="1"
              py="3"
              borderBottomWidth={2}
              borderBottomColor={theme['grey-0']}>
              <Text
                category="p2"
                color={theme['grey-400']}
                style={{ textTransform: 'capitalize' }}>
                {stringifyEnumKey(k)}
              </Text>
              <Radio
                checked={repeat === EVENT_REPEATS[k]}
                onChange={() => setRepeat(EVENT_REPEATS[k])}
              />
            </Box>
          ))}
          <Collapsible collapsed={repeat === EVENT_REPEATS.NEVER}>
            <Box mt="5">
              <Text
                category="s3"
                transform="uppercase"
                color={theme['grey-400']}
                mb="3">
                End Repeat
              </Text>
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mx="2"
                mb="1"
                py="3"
                borderBottomWidth={2}
                borderBottomColor={theme['grey-0']}>
                <Text category="p2" color={theme['grey-400']}>
                  Never
                </Text>
                <Radio
                  checked={!endRepeat}
                  onChange={() => setEndRepeat(null)}
                />
              </Box>
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mx="2"
                mb="1"
                py="3"
                borderBottomWidth={2}
                borderBottomColor={theme['grey-0']}>
                <Text category="p2" color={theme['grey-400']}>
                  {endRepeat
                    ? format(endRepeat, `EEEE, ${usaDateFormat}`)
                    : 'On Date'}
                </Text>
                <Radio
                  checked={!!endRepeat}
                  onChange={() =>
                    navigation.navigate('SelectDate', {
                      value: endRepeat,
                      time: false,
                      onSelect: setEndRepeat,
                    })
                  }
                />
              </Box>
            </Box>
          </Collapsible>
        </Box>
        <Box
          as={LinearGradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          locations={[0.4, 1]}
          colors={[
            theme['color-primary-500' && 'background-basic-color-1'],
            '#ffffff00',
          ]}
          left={0}
          right={0}
          bottom={0}>
          <Box px="4" pb={20} pt={20}>
            <Button
              shape="circle"
              size="large"
              onPress={onSelect}
              textStyle={typography['buttons/large']}>
              OK
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectRepeat;

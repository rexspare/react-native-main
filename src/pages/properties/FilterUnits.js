import React from 'react';
import {Layout} from '@ui-kitten/components';
import Button from 'components/Button';
import Box from 'components/Box';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import Text from 'components/Text';
import {UNIT_STATUS, stringifyEnumKey} from 'constants/enums';
import LazyScreen from 'utils/LazyScreen';
import SelectInputForward from 'components/SelectInput';
import Divider from 'components/Divider';
import useFilter from 'hooks/useFilter';
import {useIsFocused} from '@react-navigation/core';

export default function FilterUnits({navigation}) {
  const [{units: unitsFilter}, setFilter] = useFilter('units');
  const [appliedFilter, setAppliedFilter] = React.useState(unitsFilter);

  const focused = useIsFocused();

  React.useEffect(() => {
    setAppliedFilter(unitsFilter);
    return () => setFilter('units', appliedFilter);
  }, [focused]);

  return (
    <Box as={Layout} flex={1}>
      <Box as={SafeAreaView} flex={1} forceInset={{top: 'always'}}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
            {
              text: 'APPLY',
              size: 'small',
              onPress: () =>
                setAppliedFilter(unitsFilter) || navigation.goBack(),
              disabled: appliedFilter === unitsFilter,
            },
          ]}
          title="Filter Units"
          alignment="center"
          divider
        />
        <LazyScreen>
          <Box flex={1} px={3} py={4}>
            <Box mb={30}>
              <SelectInputForward
                label="Status"
                options={React.useMemo(
                  () =>
                    Object.keys(UNIT_STATUS).map(key => ({
                      key: UNIT_STATUS[key],
                      title: stringifyEnumKey(key),
                    })),
                  [],
                )}
                value={stringifyEnumKey(
                  Object.keys(UNIT_STATUS).find(
                    key => UNIT_STATUS[key] === unitsFilter?.status,
                  ),
                )}
                onSelect={opt =>
                  setFilter('units', {
                    ...(unitsFilter || {}),
                    status: opt.key,
                  })
                }
              />
            </Box>
            <Divider />
          </Box>
          <Box p="3">
            <Button
              appearance="ghost"
              size="giant"
              shape="circle"
              onPress={() => setFilter('units', {})}>
              Clear
            </Button>
          </Box>
        </LazyScreen>
      </Box>
    </Box>
  );
}

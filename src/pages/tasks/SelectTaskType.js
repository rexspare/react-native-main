import React from 'react';
import Box from 'components/Box';
import Header from 'components/Header';
import Text from 'components/Text';
import SafeAreaView from 'components/SafeAreaView';
import {Layout} from '@ui-kitten/components';
import Button from 'components/Button';
import Input from 'components/Input';
import Icon from 'components/Icon';
import {ScrollView} from 'react-native';
import GradientButton from 'components/GradientButton';
import styled from 'styled-components/native';
import {AMENITY_TYPES, TASK_TYPES, stringifyEnumValue} from 'constants/enums';
import InfiniteFlatList from 'components/InfiniteFlatList';
import getAmenitiesQuery from 'queries/properties/getAmenities.gql';
import {FlatList} from 'react-native';

const AmenityButton = styled(Button)`
  margin-vertical: 6;
  justify-content: flex-start;
  padding-vertical: 18;
`;

const SelectTaskType = ({route, navigation}) => {
  const [taskType, setTaskType] = React.useState(route?.params?.taskType);
  const [search, setSearch] = React.useState('');

  const onDone = React.useCallback(() => {
    route?.params?.onSelect?.(taskType);
    navigation.goBack();
  }, [navigation, route, taskType]);

  const renderItem = React.useCallback(
    ({item}) => {
      return (
        <AmenityButton
          shadow={false}
          status={item === taskType ? 'primary' : 'basic'}
          size="large"
          shape="rounded"
          onPress={() => setTaskType(item)}>
          {stringifyEnumValue(TASK_TYPES, item)}
        </AmenityButton>
      );
    },
    [taskType],
  );

  const filteredOptions = React.useMemo(() => {
    return Object.values(TASK_TYPES).filter(
      val =>
        stringifyEnumValue(TASK_TYPES, val)
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1,
    );
  }, [search]);

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
          ]}
          alignment="center"
          divider>
          <Text category="label" transform="uppercase">
            Select a Category
          </Text>
        </Header>
        <Box
          m={15}
          position="relative"
          flex={1}
          style={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
          overflow="hidden">
          <Input
            icon={Icon('search')}
            placeholder="Search for an Category"
            size="small"
            mb={10}
            value={search}
            onChangeText={setSearch}
          />
          <FlatList
            data={filteredOptions}
            keyExtractor={val => val}
            renderItem={renderItem}
          />
          <Box position="absolute" bottom={0} left={0} right={0}>
            <Button size="giant" shape="circle" onPress={onDone}>
              Done
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectTaskType;

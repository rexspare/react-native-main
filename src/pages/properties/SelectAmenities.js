import React from 'react';
import Box from 'components/Box';
import Header from 'components/Header';
import Text from 'components/Text';
import SafeAreaView from 'components/SafeAreaView';
import Button from 'components/Button';
import {Layout} from '@ui-kitten/components';
import Input from 'components/Input';
import Icon from 'components/Icon';
import {ScrollView} from 'react-native';
import GradientButton from 'components/GradientButton';
import styled from 'styled-components/native';
import {AMENITY_TYPES} from 'constants/enums';
import InfiniteFlatList from 'components/InfiniteFlatList';
import getAmenitiesQuery from 'queries/properties/getAmenities.gql';

const AmenityButton = styled(Button)`
  margin-vertical: 6;
  justify-content: flex-start;
  padding-vertical: 18;
`;

const SelectAmenities = ({route, navigation}) => {
  const [amenities, setAmenities] = React.useState(
    route?.params?.amenities ?? [],
  );
  const [search, setSearch] = React.useState('');

  const {dataExtractor, keyExtractor, variables} = React.useMemo(
    () => ({
      dataExtractor: data => data.amenities,
      keyExtractor: amenity => amenity.id,
      variables: {
        filter: search,
        type: AMENITY_TYPES.BUILDING,
      },
    }),
    [search],
  );

  const isSelected = React.useCallback(
    item => {
      return amenities.findIndex(am => am.id === item.id) !== -1;
    },
    [amenities],
  );

  const setSelected = React.useCallback(
    (item, selected) => () => {
      if (selected) {
        setAmenities(ams => ams.filter(({id}) => id !== item.id));
      } else {
        setAmenities(ams => [...ams, item]);
      }
    },
    [],
  );

  const onDone = React.useCallback(() => {
    route?.params?.onSelect?.(amenities);
    navigation.goBack();
  }, [amenities, navigation, route]);

  const renderItem = React.useCallback(
    ({item}) => {
      const selected = isSelected(item);
      return (
        <AmenityButton
          status={selected ? 'primary' : 'basic'}
          size="large"
          shape="rounded"
          shadow={false}
          onPress={setSelected(item, selected)}>
          {item.name}
        </AmenityButton>
      );
    },
    [isSelected, setSelected],
  );

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
            Select Amenities
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
            placeholder="Search for an Amenity"
            size="small"
            mb={10}
            value={search}
            onChangeText={setSearch}
          />
          <InfiniteFlatList
            query={getAmenitiesQuery}
            variables={variables}
            dataExtractor={dataExtractor}
            keyExtractor={keyExtractor}
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

export default SelectAmenities;

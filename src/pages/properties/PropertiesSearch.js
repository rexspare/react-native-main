import React from 'react';
import {Layout} from '@ui-kitten/components';
import Header from 'components/Header';
import Box from 'components/Box';
import listPropertiesQuery from 'queries/properties/listProperties.gql';
import listUnitsQuery from 'queries/properties/listUnits.gql';
import {TouchableOpacity} from 'react-native';
import BuildingCard from 'components/BuildingCard';
import InfiniteFlatList from 'components/InfiniteFlatList';
import Text from 'components/Text';
import UnitCard from 'components/UnitCard';

const PropertiesSearch = ({navigation, route, search}) => {
  const {dataExtractor, keyExtractor} = React.useMemo(() => {
    return {
      dataExtractor: data => data.buildings,
      keyExtractor: data => data.id,
    };
  }, []);

  const renderUnit = React.useCallback(
    ({item}) => {
      return (
        <Box px={10} py="8px" flexBasis="50%">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ViewUnit', {id: item.id})}>
            <UnitCard
              status={item.status}
              unitNumber={item.unitNumber}
              rentType={item.rentType}
              price={item.price}
              image={item.photos?.[0]}
            />
          </TouchableOpacity>
        </Box>
      );
    },
    [navigation],
  );

  const renderBuilding = React.useCallback(
    ({item}) => {
      return (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ViewProperty', {id: item.id})}>
            <BuildingCard
              name={item.displayName}
              location={`${item.address}, ${item.city}`}
              image={item.photos?.[0]}
              vacantCount={item.vacantUnits?.edgeCount}
            />
          </TouchableOpacity>
          <InfiniteFlatList
            query={listUnitsQuery}
            variables={{
              buildingId: item.id,
            }}
            dataExtractor={data => data.units}
            keyExtractor={data => data.id}
            renderItem={renderUnit}
            contentContainerStyle={{paddingVertical: 8}}
            numColumns={2}
          />
        </>
      );
    },
    [navigation, renderUnit],
  );

  return (
    <Box as={Layout} flex={1}>
      <Header title="Search Properties" />
      <InfiniteFlatList
        query={listPropertiesQuery}
        variables={{search}}
        dataExtractor={dataExtractor}
        keyExtractor={keyExtractor}
        renderItem={renderBuilding}
        contentContainerStyle={{paddingVertical: 8}}
        ListEmptyComponent={
          <Text category="h6" py={3} textAlign="center" appearance="hint">
            No Properties
          </Text>
        }
      />
    </Box>
  );
};

export default PropertiesSearch;

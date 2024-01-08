import React from 'react';
import {Layout} from '@ui-kitten/components';
import Header from 'components/Header';
import Box from 'components/Box';
import listTenantsQuery from 'queries/tenants/listTenants.gql';
import Text from 'components/Text';
import InfiniteFlatList from 'components/InfiniteFlatList';
import {TouchableOpacity} from 'react-native';
import Persona from 'components/Persona';

const SearchTenants = ({search, navigation}) => {
  const {dataExtractor, keyExtractor, variables} = React.useMemo(() => {
    return {
      dataExtractor: data => data?.leases,
      keyExtractor: data => data?.tenant?.id,
      variables: {search},
    };
  }, [search]);

  const renderTenant = React.useCallback(
    ({item: {id, tenant, unit}}) => {
      return (
        <Box px={10} py="8px" flexBasis="50%">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ViewTenant', {id})}>
            <Persona
              profile={tenant.picture}
              name={tenant.fullName}
              title={`${unit.building.displayName}, Apartment ${unit.unitNumber}`}
              avatarProps={{shape: 'rounded', size: 'medium'}}
            />
          </TouchableOpacity>
        </Box>
      );
    },
    [navigation],
  );

  return (
    <Box flex={1} as={Layout}>
      <Header title="Search Tenants" />
      <InfiniteFlatList
        query={listTenantsQuery}
        variables={variables}
        dataExtractor={dataExtractor}
        keyExtractor={keyExtractor}
        renderItem={renderTenant}
        contentContainerStyle={{paddingBottom: 50, paddingTop: 4}}
        ListEmptyComponent={
          <Text category="h6" py={3} textAlign="center" appearance="hint">
            No Tenants
          </Text>
        }
      />
    </Box>
  );
};

export default SearchTenants;

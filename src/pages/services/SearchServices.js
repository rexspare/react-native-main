import React from 'react';
import {Layout} from '@ui-kitten/components';
import Box from 'components/Box';
import Header from 'components/Header';
import SafeAreaView from 'components/SafeAreaView';
import InfiniteFlatList from 'components/InfiniteFlatList';
import listServiceProvidersQuery from 'queries/services/listServiceProviders.gql';
import ServiceProviderCard from 'components/ServiceProviderCard';
import {TouchableOpacity} from 'react-native';
import {useDebounce} from 'use-debounce';
import Text from 'components/Text';
import useNotifications from 'hooks/useNotifications';

const SearchServices = ({route, navigation}) => {
  const {unreadCount} = useNotifications();
  const [search, setSearch] = React.useState(route.params?.search);
  const [searchValue] = useDebounce(search, 500, {leading: true});
  React.useEffect(() => {
    if (!searchValue?.length) {
      navigation.navigate('ServicesHome');
    }
  }, [navigation, searchValue]);

  const listProps = React.useMemo(
    () => ({
      dataExtractor: data => data.serviceProviders,
      keyExtractor: item => item.id,
      variables: {
        search: searchValue,
      },
      public: true,
      ListEmptyComponent: (
        <Text
          category="h6"
          py="4"
          textAlign="center"
          appearance="hint"
          fontSize={16}>
          No Service Providers
        </Text>
      ),
    }),
    [searchValue],
  );

  return (
    <Box as={Layout} flex={1}>
      <SafeAreaView forceInset={{top: 'always'}}>
        <Header
          onSearch={setSearch}
          alignment="center"
          search="Search for a service provider"
          searchValue={search}
          searchAutoFocus
          actions={[
            {
              left: true,
              icon: 'menu',
              onPress: () => navigation.openDrawer(),
            },
            {
              icon: 'bell',
              pack: 'pm',
              onPress: () => navigation.navigate('Notifications'),
              badge: Math.min(unreadCount ?? 0, 99),
            },
          ]}
        />
      </SafeAreaView>
      <Header title="Search Service Providers" />
      <InfiniteFlatList
        query={listServiceProvidersQuery}
        pageSize={6}
        {...listProps}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('ViewServiceProvider', {
                  id: item.id,
                })
              }>
              <ServiceProviderCard
                fullName={item.fullName}
                image={item.picture}
                title={item.specialty}
                rank={item.rank}
                email={item.email}
                phone={item.phone}
              />
            </TouchableOpacity>
          );
        }}
      />
    </Box>
  );
};

export default SearchServices;

import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDebounce } from 'use-debounce/lib';
import { Layout } from '@ui-kitten/components';
import { useTabs } from 'hooks/useTabs';
import listServiceProvidersQuery from 'queries/services/listServiceProviders.gql';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import Box from 'components/Box';
import InfiniteFlatList from 'components/InfiniteFlatList';
import ServiceProviderCard from 'components/ServiceProviderCard';
import FocusedStatusBar from 'components/FocusedStatusBar';
import Text from 'components/Text';
import MultiTextSwitch from 'components/MultiTextSwitch';
import DetailServiceProvider from 'components/Services/DetailServiceProviders';
import Divider from 'components/Divider';
import ServicesFab from 'components/Fabs/ServicesFab';
import { colors } from 'styles/theme';

const tabs = [
  { InnerServiceProvider: DetailServiceProvider },
  { InnerServiceProvider: DetailServiceProvider },
];

const ServiceProviders = ({ navigation, route }) => {
  const [search, setSearch] = React.useState(null);
  const [searchValue] = useDebounce(search, 500, { leading: true });
  const parentCategory = route?.params?.parentCategory;
  const [refreshOnFocus, setRefreshOnFocus] = useState(null);
  const { InnerServiceProvider, setActiveTabIndex } = useTabs(tabs);
  const [getIndex, setGetIndex] = useState(0);
  const selectValue = i => {
    setGetIndex(i);
    setActiveTabIndex(i);
  };
  const listProps = React.useMemo(
    () => ({
      dataExtractor: data => data.serviceProviders,
      keyExtractor: item => item.id,
      variables: {
        parentCategory: parentCategory?.id,
        search: searchValue,
      },
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
    [parentCategory, searchValue],
  );

  const publicListProps = React.useMemo(
    () => ({
      ...listProps,
      variables: {
        ...listProps.variables,
        public: true,
      },
    }),
    [listProps],
  );
  const privateListProps = React.useMemo(
    () => ({
      ...listProps,
      variables: {
        ...listProps.variables,
        public: false,
      },
    }),
    [listProps],
  );

  if (!parentCategory) {
    navigation.navigate('ServicesHome');
    return null;
  }

  return (
    <Box as={Layout} flex={1}>
      <Box as={SafeAreaView} flex={1} pb={0} forceInset={{ top: 'always' }}>
        <FocusedStatusBar barStyle="dark-content" hidden={false} />
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
            {
              icon: 'filter',
              pack: 'pm',
            },
          ]}
          title={parentCategory.name}
          alignment="center"
          style={{
            title: {
              fontSize: 18,
              fontWeight: '700',
            },
          }}
        />
        <Box style={{ marginHorizontal: 10 }}>
          <Header
            width={1}
            my="3"
            mx="3"
            alignSelf="center"
            search="Search"
            alignment="center"
            onSearch={setSearch}
            searchValue={search}
          />
        </Box>
        <Box flex={1} width={1} alignSelf={'center'}>
          {search?.length ? (
            <>
              <Divider
                height={'1px'}
                backgroundColor={colors['gray scale/10']}
                mt={12}
                mb={15}
              />
              <InfiniteFlatList
                query={listServiceProvidersQuery}
                contentContainerStyle={{ paddingHorizontal: '5%' }}
                pageSize={6}
                {...publicListProps}
                renderItem={({ item }) => {
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
            </>
          ) : (
            <>
              <MultiTextSwitch
                shape="circle"
                size="small"
                options={[
                  { text: 'My Providers', value: 'my-providers', flex: 1 },
                  { text: 'All Providers', value: 'all-providers', flex: 1 },
                ]}
                onSelect={(_, i) => selectValue(i)}
                style={{ marginHorizontal: 20, marginTop: 10 }}
              />
              <Divider
                height={'1px'}
                backgroundColor={colors['gray scale/10']}
                mt={12}
                mb={15}
              />
              <Box flexDirection="row" px={16}>
                <InnerServiceProvider
                  navigation={navigation}
                  refreshOnFocus={refreshOnFocus}
                  setRefreshOnFocus={setRefreshOnFocus}
                  route={`ViewServiceProvider`}
                  query={listServiceProvidersQuery}
                  listProps={
                    getIndex === 1 ? publicListProps : privateListProps
                  }
                />
              </Box>
            </>
          )}
        </Box>
      </Box>
      <ServicesFab navigation={navigation} />
    </Box>
  );
};
export default ServiceProviders;

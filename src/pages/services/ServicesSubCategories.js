import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDebounce } from 'use-debounce/lib';
import { Layout } from '@ui-kitten/components';
import listServiceCategoriesQuery from 'queries/services/listServiceCategories.gql';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import Box from 'components/Box';
import InfiniteFlatList from 'components/InfiniteFlatList';
import ServiceCard from 'components/ServiceCard';
import FocusedStatusBar from 'components/FocusedStatusBar';
import Divider from 'components/Divider';
import ServicesFab from 'components/Fabs/ServicesFab';
import { colors } from 'styles/theme';

const ServicesSubCategories = ({ navigation, route }) => {
  const parentCategory = route?.params?.parentCategory;
  const [search, setSearch] = React.useState(null);
  const [searchValue] = useDebounce(search, 500, { leading: true });

  const catListProp = React.useMemo(
    () => ({
      dataExtractor: data => data.serviceCategories,
      keyExtractor: item => item.id,
      variables: {
        parentCategory: parentCategory?.id,
        filter: searchValue,
      },
    }),
    [parentCategory, searchValue],
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
        <Box width={0.9} alignSelf="center">
          <Header
            mx={-2}
            search="Search"
            searchValue={search}
            onSearch={setSearch}
            alignment="center"
          />
        </Box>
        <Divider
          height={'1px'}
          backgroundColor={colors['gray scale/10']}
          mt={12}
          mb={20}
        />
        <Box flex={1} width={0.9} alignSelf="center">
          <InfiniteFlatList
            contentContainerStyle={{ paddingBottom: 60 }}
            query={listServiceCategoriesQuery}
            {...catListProp}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate(
                      item.isParent
                        ? 'ListSubCategories'
                        : 'ListServiceProviders',
                      {
                        parentCategory: item,
                      },
                    )
                  }>
                  <ServiceCard
                    height={160}
                    my={3}
                    name={item.name}
                    image={item.picture}
                    numProviders={
                      item.isParent ? null : item.serviceProviders?.edgeCount
                    }
                  />
                </TouchableOpacity>
              );
            }}
          />
        </Box>
      </Box>
      <ServicesFab navigation={navigation} />
    </Box>
  );
};

export default ServicesSubCategories;

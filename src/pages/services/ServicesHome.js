import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useNotifications from 'hooks/useNotifications';
import listServiceCategoriesQuery from 'queries/services/listServiceCategories.gql';
import listMostUsedServiceCategoriesQuery from 'queries/services/listMostUsedServiceCategories.gql';
import Box from 'components/Box';
import Header from 'components/Header';
import Text from 'components/Text';
import ServiceCard from 'components/ServiceCard';
import Button from 'components/Button';
import InfiniteFlatList from 'components/InfiniteFlatList';
import ServicesFab from 'components/Fabs/ServicesFab';
import ScrollHeader from 'components/ScrollHeader';
import { t } from 'helpers/react';
import { styles } from './styles';

const ServicesHome = ({ navigation, route }) => {
  const { unreadCount } = useNotifications();
  const [loadedMostCommon, setLoadedMostCommon] = React.useState(false);
  const [search, setSearch] = React.useState(null);
  const popularServicesDataRef = React.useRef();

  const onSearch = React.useCallback(
    val => {
      setSearch(val);
      route.params?.onSearch?.(val);
    },
    [route.params],
  );

  useFocusEffect(
    React.useCallback(() => {
      setSearch(null);
    }, []),
  );

  const catListProp = React.useMemo(
    () => ({
      dataExtractor: data => data.serviceCategories,
      keyExtractor: item => item.id,
      variables: {
        isRoot: true,
      },
    }),
    [],
  );

  const mostUsedListProp = React.useMemo(
    () => ({
      dataExtractor: data => data.mostUsedServiceCategories,
      keyExtractor: item => item.id,
    }),
    [],
  );

  const onLoadMostUsed = React.useCallback(() => {
    if (!loadedMostCommon) {
      setLoadedMostCommon(true);
    }
  }, [loadedMostCommon]);

  const navBarProps = React.useMemo(
    () => ({
      alignment: 'center',
      actions: [
        {
          icon: 'menu',
          left: true,
          onPress: () => navigation.openDrawer(),
        },
        {
          icon: 'filter',
          pack: 'pm',
        },
        {
          icon: 'bell',
          pack: 'pm',
          onPress: () => navigation.navigate('Notifications'),
          badge: Math.min(unreadCount ?? 0, 99),
        },
      ],
      headerIcon: true,
      divider: true,
    }),
    [unreadCount],
  );

  const renderContent = React.useCallback(() => {
    return (
      <>
        <Box position="relative" pointerEvents="box-none">
          <Box pointerEvents="box-none">
            <Box ml={16} minHeight={80}>
              {t(
                loadedMostCommon &&
                  popularServicesDataRef?.current?.mostUsedServiceCategories
                    ?.edges?.length,
                <Text style={styles.headerTxt}>Most Used Services</Text>,
              )}
              <InfiniteFlatList
                dataRef={popularServicesDataRef}
                horizontal
                query={listMostUsedServiceCategoriesQuery}
                {...mostUsedListProp}
                limit={6}
                onLoad={onLoadMostUsed}
                refresh={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <Button
                      as={TouchableOpacity}
                      style={styles.categoryButton}
                      onPress={() =>
                        navigation.navigate('ListServiceProviders', {
                          parentCategory: item,
                        })
                      }>
                      {item.name?.toUpperCase()}
                    </Button>
                  );
                }}
                ListEmptyComponentStyle={{ width: '100%' }}
              />
            </Box>
          </Box>
        </Box>
        <Box mx={16}>
          <Text
            style={styles.headlineTxt}
            category="s3"
            transform="uppercase"
            status={loadedMostCommon ? 'basic' : 'control'}>
            All Categories
          </Text>

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
      </>
    );
  }, [catListProp, loadedMostCommon, navigation]);

  return (
    <ScrollHeader
      navBarProps={navBarProps}
      renderContent={renderContent}
      backgroundImage={require('img/buildings-overlay.png')}
      contentContainerStyle={{ paddingTop: 40 }}
      innerContainerStyle={{ marginTop: 175 }}
      imageContent={
        <Header
          search="Search"
          onSearch={onSearch}
          searchValue={search}
          transparent
          alignment="center"
          style={{ container: { paddingHorizontal: 16 } }}
        />
      }>
      <ServicesFab navigation={navigation} />
    </ScrollHeader>
  );
};

export default ServicesHome;

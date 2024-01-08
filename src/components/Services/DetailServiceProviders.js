import React from 'react';
import { TouchableOpacity } from 'react-native';
import Box from 'components/Box';
import InfiniteFlatList from 'components/InfiniteFlatList';
import ServiceProviderCard from 'components/ServiceProviderCard';
import InfoBox from 'components/InfoBox';

const renderEmpty = () => {
  return (
    <InfoBox
      heading={'No Providers Added'}
      text={'Please use the + button below to add your providers'}
    />
  );
};

const DetailServiceProviders = ({ navigation, route, query, listProps }) => {
  return (
    <Box flex={1}>
      <InfiniteFlatList
        contentContainerStyle={{ paddingBottom: 150 }}
        query={query}
        pageSize={6}
        {...listProps}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate(route, {
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
        ListEmptyComponent={renderEmpty}
      />
    </Box>
  );
};

export default DetailServiceProviders;

import React from 'react';
import { Layout } from '@ui-kitten/components';
import Box from 'components/Box';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import TenantList from 'components/TenantList';

const ArchivedTenants = ({ navigation, route }) => {
  const { refreshOnFocus = false } = route?.params || {};

  const queryParams = {
    isArchived: true,
  };

  return (
    <Box flex={1} as={Layout} pb={20}>
      <Box flex={1} as={SafeAreaView} forceInset={{ top: 'always' }}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
          ]}
          alignment="center"
          title="Archived tenants"
          divider
        />
        <TenantList
          navigation={navigation}
          building={route?.params?.building}
          refreshOnFocus={refreshOnFocus}
          queryParams={queryParams}
          isTitle={false}
        />
      </Box>
    </Box>
  );
};

export default ArchivedTenants;

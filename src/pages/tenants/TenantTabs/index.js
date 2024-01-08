import React from 'react';
import Box from 'components/Box';
import TenantList from 'components/TenantList';
import BuildingFilter from './BuildingFilter';

const TenantTabs = ({
  navigation,
  route,
  isOpen,
  close,
  feedFilter,
  building,
  setFilter,
}) => {
  const { refreshOnFocus = false } = route?.params || {};

  return (
    <>
      <Box>
        <BuildingFilter
          setFilter={building => setFilter('building', building)}
          value={building}
          isOpen={isOpen}
          close={close}
        />
      </Box>
      <TenantList
        navigation={navigation}
        building={building}
        refreshOnFocus={refreshOnFocus}
        queryParams={feedFilter}
      />
    </>
  );
};

export default TenantTabs;

import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import getViolations from 'queries/compliance/getViolations.gql';
import getComplaints from 'queries/compliance/getComplaints.gql';
import getPermits from 'queries/compliance/getPermits.gql';
import { useTabs } from 'hooks/useTabs';
import { useIsOpen } from 'hooks/useIsOpen';
import Box from 'components/Box';
import HeadedScreen from 'components/HeadedScreen';
import MultiTextSwitch from 'components/MultiTextSwitch';
import ComplianceFeedPage from './ComplianceFeedPage';
import ComplianceFiltersModal from './ComplianceFilters';

const Tab = createMaterialTopTabNavigator();

const tabs = [
  { Component: ComplianceFeedPage },
  { Component: ComplianceFeedPage },
  { Component: ComplianceFeedPage },
];

const ComplianceRoot = ({ navigation }) => {
  const { isOpen, open, close } = useIsOpen();
  const [activeTab, setActiveTab] = useState(0);
  const { Component, setActiveTabIndex } = useTabs(tabs);

  return (
    <HeadedScreen
      title={'Compliance'}
      actions={[
        {
          icon: 'menu',
          left: true,
          onPress: () => navigation.openDrawer(),
        },
        {
          icon: 'filter',
          pack: 'pm',
          onPress: open,
        },
        {
          icon: 'bell',
          pack: 'pm',
          onPress: () => navigation.navigate('Notifications'),
        },
      ]}>
      <Box flex={1} justifyContent={'space-between'}>
        <Box mx={20} mb={10}>
          <MultiTextSwitch
            shape="circle"
            size="small"
            options={[
              { text: 'Violations', value: 'violations', flex: 1 },
              { text: 'Complaints', value: 'complaints', flex: 1 },
              { text: 'Permits', value: 'permits', flex: 1 },
            ]}
            onSelect={(_, i) => {
              setActiveTabIndex(i), setActiveTab(i);
            }}
          />
        </Box>
        <Component
          navigation={navigation}
          query={
            activeTab === 0
              ? getViolations
              : activeTab === 1
              ? getComplaints
              : getPermits
          }
        />
      </Box>
      <ComplianceFiltersModal visible={isOpen} onHide={close} />
    </HeadedScreen>
  );
};

export default ComplianceRoot;

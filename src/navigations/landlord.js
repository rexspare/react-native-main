import React, { useContext, useMemo } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent, { DrawerProgressContext } from './Drawer';
import LandlordTabNavigator from './landlordTabs';
import AuthContext from 'providers/auth';
import { compact } from 'lodash-es';
import { useLoader } from 'hooks/useLoader';
import { isUndefined } from 'lodash';

const Drawer = createDrawerNavigator();

const LandlordNavigator = () => {
  const [progress, setProgress] = React.useState();
  const { permissions } = useContext(AuthContext);
  const permissionsIsLoading = isUndefined(permissions);
  const { loader } = useLoader({ isLoading: permissionsIsLoading });

  const routes = useMemo(
    () =>
      compact([
        { route: 'LandlordProfile', label: 'Profile' },
        { route: 'LandlordCompliance', label: 'Compliance' },
        !permissions?.financials?.isHidden && {
          route: 'LandlordFinancials',
          label: 'Financials',
        },
        // !permissions?.documents?.isHidden && { route: 'LandlordDocuments', label: 'Files' },
      ]),
    [permissions],
  );

  if (permissionsIsLoading) return loader;

  return (
    <DrawerProgressContext.Provider value={{ progress, setProgress }}>
      <Drawer.Navigator
        drawerType="back"
        headerMode="none"
        initialRouteName="LandlordTabs"
        overlayColor="transparent"
        drawerContent={props => <DrawerContent {...props} routes={routes} />}>
        <Drawer.Screen name="LandlordTabs" component={LandlordTabNavigator} />
      </Drawer.Navigator>
    </DrawerProgressContext.Provider>
  );
};

export default LandlordNavigator;

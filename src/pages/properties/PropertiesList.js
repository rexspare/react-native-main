import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet } from 'react-native';
import { noop } from 'lodash';
import PropertiesSearch from './PropertiesSearch';
import useSearch from 'hooks/useSearch';
import { useIsOpen } from 'hooks/useIsOpen';
import useNotifications from 'hooks/useNotifications';
import BuildingsFiltersModal from 'pages/properties/BuildingsFiltersModal';
import UnitsFiltersModal from 'pages/properties/UnitsFiltersModal';
import HeadedScreen from 'components/HeadedScreen';
import LinearGradient from 'react-native-linear-gradient';
import Header from 'components/Header';
import Box from 'components/Box'
import { getActions } from 'constants/actions';
import { colors } from 'styles/theme';
import PropertiesTabs from './PropertiesTabs';

const Stack = createStackNavigator();

const PropertiesList = ({ navigation, route }) => {
  const { isOpen, close, open } = useIsOpen();

  const [activeTab, setActiveTab] = useState(0);

  const { headerProps: searchHeaderProps, SearchScreen } = useSearch(
    PropertiesSearch,
    'PropertiesSearch',
    'PropertiesTabs',
  );
  const { unreadCount } = useNotifications();

  const styles = StyleSheet.create({

    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      width: null,
      resizeMode: 'cover',
      zIndex: -3
    }
  });

  const renderHeaderContent = React.useCallback(() => {
    return (
      <>
        <Box
          pointerEvents="box-none"
          as={LinearGradient}
          colors={['#000000', '#00000000', '#00000000', '#000000']}
          locations={[0, 0.5134, 0.7128, 0.9577]}
          flex={1}
          overflow="visible" style={[styles.backgroundImage]}
        >
          <Image source={require('img/bg-image-properties.png')} style={[styles.backgroundImage]} />
        </Box>
        <Box
          as={LinearGradient}
          flex={1}
          style={{ zIndex: -4 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0.2183, 0.5084, 0.7872]}
          left={0}
          top={0}
          width="100%"
          height="280"
          opacity={0.65}
          colors={[
            "#26A799",
            "rgba(25, 221, 67, 0.4)",
            "rgba(255, 141, 64, 0.49)",
          ]}
          backgroundColor={colors["primary/80"]}
          position="absolute"
        />
      </>
    );
  }, []);

  return (
    <>
      <HeadedScreen
        actions={getActions(
          ['menu', { status: 'control', onPress: () => navigation.openDrawer() }],
          ['filter', { onPress: open, fill: '#fff', status: 'control' }]
        )}
        forceInset={{ top: 'never' }}
        headerStyle={{ container: { position: 'absolute', top: 40, zIndex: 1, width: '100%', backgroundColor: 'transparent' } }}
        headerProps={{
          alignment: 'center',
          headerIcon: true,
          headerIconColor: "white",
        }}
      >
        {renderHeaderContent()}
        <Header
          alignSelf="center"
          alignment="center"
          style={{ container: { position: 'absolute', top: 130, zIndex: 2, width: '100%' } }}
          transparent
          {...searchHeaderProps}
        />
        <Box flex={1} mt={280}>
          <Stack.Navigator
            headerMode="none"
            keyboardHandlingEnabled={false}
            mode="modal">
            <Stack.Screen name="PropertiesTabs">
              {props => (
                <PropertiesTabs
                  {...props}
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                />
              )}
            </Stack.Screen>
            <Stack.Screen component={SearchScreen} name="PropertiesSearch" />
          </Stack.Navigator>
        </Box>
      </HeadedScreen>
      {activeTab === 1 ? (
        <UnitsFiltersModal visible={isOpen} onHide={close} setFilter={noop} />
      ) : (
        <BuildingsFiltersModal
          visible={isOpen}
          onHide={close}
          setFilter={noop}
        />
      )}
    </>
  );
};

export default PropertiesList;

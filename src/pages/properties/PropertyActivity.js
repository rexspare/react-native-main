import React from 'react';
import {Layout} from '@ui-kitten/components';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import Box from 'components/Box';
import InfiniteFlatList from 'components/InfiniteFlatList';
import NotificationCard from 'components/NotificationCard';
import {useIsFocused} from '@react-navigation/native';
import listBuildingNotificationsQuery from 'queries/notifications/listBuildingNotifications.gql';
import Text from 'components/Text';

const PropertyActivity = ({navigation, route}) => {
  const listRef = React.useRef();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      const refreshAndRead = async () => {
        await listRef.current.refresh();
      };
      refreshAndRead();
    }
  }, [isFocused]);

  const listProps = React.useMemo(
    () => ({
      keyExtractor: item => item.id,
      dataExtractor: data => data.buildingNotifications,
      variables: {
        id: route.params?.building.id,
      },
      pause: !route.params?.building.id,
      renderItem: ({item}) => <NotificationCard {...item} />,
    }),
    [route.params],
  );

  return (
    <Box as={Layout} flex={1}>
      <Box as={SafeAreaView} flex={1} forceInset={{top: 'always'}}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
          ]}
          title="Property Activity"
          subtitle={route.params?.building.displayName}
          alignment="center"
          divider
        />
        <Box flex={1} px="2" py="3">
          <InfiniteFlatList
            query={listBuildingNotificationsQuery}
            ref={listRef}
            {...listProps}
            ListEmptyComponent={
              <Text category="h6" textAlign="center" appearance="hint">
                No Activity
              </Text>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyActivity;

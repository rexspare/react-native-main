import React, { useMemo } from 'react';
import { Image, SafeAreaView, FlatList, TouchableOpacity, View } from 'react-native';
import HeadedScreen from 'components/HeadedScreen';
import { HEADER_ACTIONS } from 'constants/actions';
import { colors } from 'styles/theme';
import Text from 'components/Text';
import Box from 'components/Box';
import format from 'date-fns/format';
import { standardShortDateFormat } from 'constants/dateFormat';
import { styles } from './styles';

const getInitials = string => {
  let names = string?.split(' '),
    initials = names?.[0]?.substring(0, 1)?.toUpperCase();

  if (names?.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

const TenantList = ({ item, navigation }) => {
  return (
    <Box
      as={TouchableOpacity}
      flexDirection="row"
      mt={10}
      mb={10}
      justifyContent="flex-start"
      alignItems="center"
      onPress={() =>
        navigation.navigate('LandlordTenants', {
          screen: 'ViewTenant',
          params: { id: item?.id },
        })
      }>
      {item?.picture ? (
        <Image
          source={{ uri: item?.picture }}
          style={styles.imageStyle}
        />
      ) : (
        <View style={styles.initialsContainer}>
          <Text style={styles.textStyle}>{getInitials(item?.fullName)}</Text>
        </View>
      )}
      <Box flexDirection="column" style={{ marginLeft: 10 }}>
        <Text style={styles.textTitle}>{item?.fullName}</Text>
        <Text style={styles.textSubStyle}>
          {item?.leases?.edges[0] &&
            `${format(
              new Date(item?.leases?.edges[0]?.node?.start),
              standardShortDateFormat,
            )} - ${format(
              new Date(item?.leases?.edges[0]?.node?.end),
              standardShortDateFormat,
            )}`}
        </Text>
      </Box>
    </Box>
  );
};

const PreviousTenant = ({ navigation, route }) => {
  const actions = useMemo(
    () => [{ ...HEADER_ACTIONS.back, onPress: () => navigation.goBack() }],
    [navigation],
  );

  return (
    <>
      <HeadedScreen
        actions={actions}
        title="Previous Tenant"
        contentContainerProps={{ bg: colors['white'] }}
        scrollable
        headerStyle={{ title: styles.title }}>
        <Box flex={1} mt={10}>
          <Box width="90%" alignSelf="center">
            <SafeAreaView>
              <FlatList
                data={route?.params?.unit}
                renderItem={({ item }) => (
                  <TenantList
                    item={item?.node}
                    navigation={navigation}
                  />
                )}
                keyExtractor={item => item?.node?.id}
                ListEmptyComponent={
                  <Text style={styles.noTextStyle}>
                    No Previous Tenant are found!
                  </Text>
                }
              />
            </SafeAreaView>
          </Box>
        </Box>
      </HeadedScreen>
    </>
  );
};

export default PreviousTenant;

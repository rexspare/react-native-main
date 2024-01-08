import React from 'react';
import { TouchableOpacity, Text, SafeAreaView, FlatList } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { usePermissions, PERMISSION_SECTIONS } from 'hooks/usePermissions';
import useNotifications from 'hooks/useNotifications';
import Box from 'components/Box';
import ScrollHeader from 'components/ScrollHeader';
import { FinancialData } from './data';
import { FINANCIALS_CATEGORIES } from '../const';
import { colors } from 'styles/theme';
import { styles } from './styles';

const data = FinancialData;
const categories = FINANCIALS_CATEGORIES;

const FinancialsHome = ({ navigation, route }) => {
  const { unreadCount } = useNotifications();
  const permissions = usePermissions(PERMISSION_SECTIONS.FINANCIALS);

  const getOnPress = type => () =>
    navigation.navigate('FinancialsFeed', { type });

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
          icon: 'bell',
          pack: 'pm',
          onPress: () => navigation.navigate('Notifications'),
          badge: Math.min(unreadCount ?? 0, 99),
        },
      ],
      headerIcon: true,
    }),
    [unreadCount],
  );

  const renderContent = React.useCallback(() => {
    return (
      <Box style={styles.listContainer}>
        {permissions?.create && (
          <Box style={styles.secHeadRow} mt={4} mx={2}>
            {data?.map((item, index) => {
              return (
                <TouchableOpacity
                  index={index}
                  onPress={() => navigation.navigate(item?.navigationLink)}>
                  <Box
                    style={styles.secHeadButton}
                    index={index}
                    py={3}
                    width={'100%'}>
                    <Icon
                      height={45}
                      width={67}
                      pack={'pm'}
                      name={item?.icon}
                    />
                    <Text style={styles.secHeadButtonText}>{item?.title}</Text>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </Box>
        )}
        <Box mt={25} mx={4}>
          <Text
            style={{
              color: '#727978',
              textTransform: 'uppercase',
              fontSize: 18,
              fontWeight: '700',
            }}>
            Finances
          </Text>
        </Box>
        <SafeAreaView style={{ flex: 1 }}>
          <Box mt={10} mx={2}>
            <FlatList
              data={categories}
              dataExtractor={item => item}
              renderItem={({ item: { name, type } }) => (
                <TouchableOpacity
                  onPress={getOnPress(type)}
                  style={styles.categoryItem}>
                  <Text style={styles.categoryItemText}>{name}</Text>
                  <Icon
                    style={styles.categoryItemIcon}
                    pack={'pm'}
                    name={'topRight'}
                    fill={colors['primary/brand']}
                  />
                </TouchableOpacity>
              )}
            />
          </Box>
        </SafeAreaView>
      </Box>
    );
  }, [permissions, navigation, data, categories]);

  return (
    <ScrollHeader
      navBarProps={navBarProps}
      renderContent={renderContent}
      backgroundImage={require('img/financials-bg.png')}
      contentContainerStyle={{ paddingTop: 30 }}
      innerContainerStyle={{ marginTop: 140 }}
    />
  );
};

export default FinancialsHome;

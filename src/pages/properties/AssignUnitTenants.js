import React from 'react';
import Box from 'components/Box';
import Header from 'components/Header';
import Text from 'components/Text';
import SafeAreaView from 'components/SafeAreaView';
import {Layout, Radio} from '@ui-kitten/components';
import Input from 'components/Input';
import Icon from 'components/Icon';
import {TouchableOpacity} from 'react-native';
import GradientButton from 'components/GradientButton';
import Persona from 'components/Persona';
import getAvailableTenants from 'queries/properties/getAvailableTenants.gql';
import InfiniteFlatList from 'components/InfiniteFlatList';
import Button from 'components/Button';

const AssignUnitTenants = ({route, navigation}) => {
  const assigned = route?.params?.assigned ?? [];
  const [selected, setSelected] = React.useState(route?.params?.selected ?? []);
  const [search, setSearch] = React.useState('');

  const {dataExtractor, keyExtractor, variables} = React.useMemo(
    () => ({
      dataExtractor: data => data?.tenants,
      keyExtractor: tn => tn.id,
      variables: {
        filter: search,
      },
    }),
    [search],
  );

  const isChecked = React.useCallback(
    tenant => {
      return selected.findIndex(t2 => t2.id === tenant.id) !== -1;
    },
    [selected],
  );

  const onSelect = React.useCallback(
    tenant => {
      if (isChecked(tenant)) {
        setSelected(s => s.filter(t2 => t2.id !== tenant.id));
      } else {
        setSelected(s => s.concat([tenant]));
      }
    },
    [isChecked],
  );

  const onDone = React.useCallback(() => {
    route?.params?.onSelect?.(selected);
    navigation.goBack();
  }, [navigation, route, selected]);

  const renderItem = React.useCallback(
    ({item}) => {
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onSelect(item)}>
          <Persona
            name={item.fullName}
            title={item.title}
            profile={item.photo}
            avatarProps={{
              shape: 'rounded',
            }}>
            <Box mx="3">
              <Radio
                checked={isChecked(item)}
                onChange={() => onSelect(item)}
              />
            </Box>
          </Persona>
        </TouchableOpacity>
      );
    },
    [isChecked, onSelect],
  );

  return (
    <Box as={Layout} flex={1}>
      <Box as={SafeAreaView} flex={1}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
          ]}
          alignment="center"
          divider>
          <Text category="label" transform="uppercase">
            Assigned Tenants
          </Text>
        </Header>
        <Box
          m={15}
          position="relative"
          flex={1}
          style={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
          overflow="hidden">
          <Input
            icon={Icon('search')}
            placeholder="Search for available tenants"
            size="small"
            mb={10}
            value={search}
            onChangeText={setSearch}
          />

          <InfiniteFlatList
            style={{
              paddingBottom: 64,
            }}
            query={getAvailableTenants}
            variables={variables}
            dataExtractor={dataExtractor}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
          <Box position="absolute" bottom={0} left={0} right={0}>
            <Button size="giant"  onPress={onDone}>
              Done
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AssignUnitTenants;

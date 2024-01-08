import React from 'react';
import Box from 'components/Box';
import Header from 'components/Header';
import Text from 'components/Text';
import SafeAreaView from 'components/SafeAreaView';
import {Layout, RadioGroup, Radio} from '@ui-kitten/components';
import Input from 'components/Input';
import Icon from 'components/Icon';
import {ScrollView, TouchableHighlight, TouchableOpacity} from 'react-native';
import GradientButton from 'components/GradientButton';
import styled from 'styled-components/native';
import Persona from 'components/Persona';
import getManagementCompanyEmployees from 'queries/properties/getManagementCompanyEmployees.gql';
import InfiniteFlatList from 'components/InfiniteFlatList';
import Button from 'components/Button';

const AssignPropertyManager = ({route, navigation}) => {
  const [manager, setManager] = React.useState(route?.params?.manager);
  const [search, setSearch] = React.useState('');

  const {dataExtractor, keyExtractor, variables} = React.useMemo(
    () => ({
      dataExtractor: data => data.managementCompany?.employees,
      keyExtractor: mng => mng.id,
      variables: {
        filter: search,
        company: route?.params?.company,
      },
    }),
    [route, search],
  );

  const onDone = React.useCallback(() => {
    route?.params?.onSelect?.(manager);
    navigation.goBack();
  }, [manager, navigation, route]);

  const renderItem = React.useCallback(
    ({item}) => {
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setManager(item)}>
          <Persona
            name={item.fullName}
            title={item.title}
            profile={item.photo}
            avatarProps={{
              shape: 'rounded',
            }}>
            <Box mx="3">
              <Radio
                checked={item.id === manager?.id}
                onChange={() => setManager(item)}
              />
            </Box>
          </Persona>
        </TouchableOpacity>
      );
    },
    [manager],
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
          alignment="center"
          divider>
          <Text category="label" transform="uppercase">
            Assigned Manager
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
            placeholder="Search for a Member"
            size="small"
            mb={10}
            value={search}
            onChangeText={setSearch}
          />

          <InfiniteFlatList
            style={{
              paddingBottom: 64,
            }}
            query={getManagementCompanyEmployees}
            variables={variables}
            dataExtractor={dataExtractor}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
          <Box position="absolute" bottom={0} left={0} right={0}>
            <Button size="giant" onPress={onDone}>
              Done
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AssignPropertyManager;

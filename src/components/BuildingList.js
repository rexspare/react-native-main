import React, { useEffect, useMemo, useState, useRef } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Box from './Box';
import { Layout } from '@ui-kitten/components';
import BuildingCard from './BuildingCard';
import listPropertiesQuery from 'queries/properties/listProperties.gql';
import InfiniteFlatList from './InfiniteFlatList';
import Text from './Text';
import Dialog, { Buttons } from 'components/Dialog';
import useFilter from 'hooks/useFilter';
import { button_styles } from 'styles/button';
import { typography } from 'styles/typography';
import { removeObjectFromArray } from 'helpers/array';

const BuildingList = ({
  navigation,
  refreshOnFocus,
  setRefreshOnFocus,
  permissions,
  onRefresh
}) => {
  const [draftData, setDraftData] = useState(null);
  const [draftItem, setDraftItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filter] = useFilter(['buildingFeed']);
  const infiniteFlatListRef = useRef();

  const variables = useMemo(() => ({ ...filter?.buildingFeed }), [
    filter?.buildingFeed,
  ]);
  const { dataExtractor, keyExtractor } = React.useMemo(() => {
    return {
      dataExtractor: data => data?.buildings,
      keyExtractor: data => data?.id,
    };
  }, []);

  useEffect(() => {
    parseData();
  }, [refreshOnFocus]);

  const parseData = async () => {
    const buildingDrafts = await AsyncStorage.getItem('buildingDrafts');
    const buildings = JSON.parse(buildingDrafts);
    setDraftData(buildings.reverse());
  };

  const renderModal = () => {
    return (
      <Dialog
        visible={isOpen}
        onHide={() => setIsOpen(false)}
        styles={styles.container}
      >
        <Text
          style={styles.title}
        >
          Do you want to delete?
        </Text>
        <Buttons
          containerStyle={styles.buttonsContainer}
          buttons={[
            {
              children: 'CANCEL',
              onPress: () => setIsOpen(false),
              ...button_styles['primary_50_brand_clear_large'],
            },
            {
              children: 'DELETE',
              onPress: () => {
                setIsOpen(false);
                handleDraftItem(null, true);
              },
              ...button_styles['grey_large'],
            },
          ]}
        />
      </Dialog>
    );
  };

  const handleDraftItem = async () => {
    let updatedData = removeObjectFromArray(draftData, draftItem?.draftId, 'draftId');
    await AsyncStorage.setItem(
      'buildingDrafts',
      JSON.stringify(updatedData),
    );
    setDraftData(updatedData);
    setDraftItem(null);
  }

  const renderBuilding = React.useCallback(
    ({ item }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onLongPress={() => {
            if (item?.draftItem) {
              setIsOpen(true);
              setDraftItem(item);
            }
          }}
          onPress={
            permissions.view
              ? () => {
                navigation.navigate('ViewProperty', item?.draftItem ? { ...item, onUpdate: setRefreshOnFocus } : { id: item.id });
              }
              : () => { }
          }>
          <BuildingCard
            style={{
              width: '90%',
              marginLeft: '5%',
            }}
            name={item?.name || item.displayName}
            location={item?.address || item?.city ? `${item?.address ? item?.address : ""} , ${item?.city ? `${item?.city}` : ""}` : "N/A"}
            image={item.photos?.[0]}
            vacantCount={item.vacantUnits?.edgeCount}
            draftItem={item?.draftItem}
          />
        </TouchableOpacity>
      );
    },
    [navigation],
  );
  return (
    <>
      <Box as={Layout} flex={1}>
        <InfiniteFlatList
          query={listPropertiesQuery}
          ref={infiniteFlatListRef}
          fetchPolicy="network-only"
          dataExtractor={dataExtractor}
          keyExtractor={keyExtractor}
          refreshOnFocus={refreshOnFocus}
          setRefreshOnFocus={setRefreshOnFocus}
          refreshOnLoad={true}
          renderItem={renderBuilding}
          variables={variables}
          draftData={draftData}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 80 }}
          ListEmptyComponent={
            <Text category="h6" py={3} textAlign="center" appearance="hint">
              No Properties
            </Text>
          }
        />
      </Box>
      {renderModal()}
    </>
  );
};

export default BuildingList;

export const styles = {
  container: {
    view: {
      paddingBottom: 0,
      paddingTop: 0,
      paddingRight: 20,
      paddingLeft: 20,
    },
  },
  title: {
    ...typography['body/large – medium'],
    alignSelf: 'center',
    textTransform: 'uppercase',
    textAlign: 'center',
    maxWidth: 240,
  },
  content: {
    ...typography['body/medium – regular'],
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
};
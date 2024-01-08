import React, { useMemo, useCallback, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Box from './Box';
import { TouchableOpacity } from 'react-native';
import UnitCards from './unitcards';
import { Layout } from '@ui-kitten/components';
import Dialog, { Buttons } from 'components/Dialog';
import BuildingsUnitsList from 'queries/properties/buildingsUnitsList.gql';
import InfiniteFlatList from './InfiniteFlatList';
import Text from './Text';
import useFilter from 'hooks/useFilter';
import { removeObjectFromArray } from 'helpers/array';
import { button_styles } from 'styles/button';
import { styles } from './BuildingList';

const getCalVariables = values => {
  const data = {};
  for (let val in values) {
    if (values[val]) data[val] = values[val];
  }
  return data;
};

const UnitList = ({
  navigation,
  refreshOnFocus,
  setRefreshOnFocus,
  permissions,
  route,
}) => {
  const [filter] = useFilter(['unitsFeed']);
  const [draftData, setDraftData] = useState(null);
  const [draftItem, setDraftItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const variables = useMemo(() => getCalVariables({ ...filter?.unitsFeed }), [
    filter?.unitsFeed,
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
    const unitDrafts = await AsyncStorage.getItem('unitDrafts');
    const units = JSON.parse(unitDrafts);
    setDraftData(units.reverse());
  };

  const handleDraftItem = async () => {
    let updatedData = removeObjectFromArray(draftData, draftItem?.draftId, 'draftId');
    await AsyncStorage.setItem(
      'unitDrafts',
      JSON.stringify(updatedData),
    );
    setDraftData(updatedData);
    setDraftItem(null);
  }

  const renderUnit = useCallback(
    ({ item }) => {
      if (item?.units?.edges?.length > 0) {
        return (
          <>
            {
              item?.units?.edges?.length > 0 && (
                <Box py="8px" flexBasis="100%">
                  <Text
                    style={{
                      color: '#727978',
                      textTransform: 'uppercase',
                      fontSize: 18,
                      fontWeight: '500',
                      marginLeft: 15,
                      marginRight: 15,
                      marginTop: item?.units?.edges?.length > 0 ? 10 : 0,
                      marginBottom: item?.units?.edges?.length > 0 ? 8 : 0,
                    }}>
                    {item?.displayName}
                  </Text>
                  {item?.units?.edges?.map(({ node }) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={
                          permissions?.view
                            ? () => navigation.navigate('ViewUnit', { id: node.id })
                            : () => { }
                        }>
                        <UnitCards
                          style={{
                            padding: 5,
                            marginTop: 8,
                            marginBottom: 4,
                            width: '94%',
                            marginRight: '4%',
                            marginLeft: '3%',
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: '#E7E9E9',
                            color: '#131F1E',
                            fontSize: 15,
                            fontWeight: '500',
                          }}
                          status={node?.status}
                          unitNumber={node?.displayUnitNumber}
                          rentType={node?.rentType}
                          price={node?.price}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </Box>
              )
            }
          </>
        );
      } else if (item?.draftItem) {
        return (
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              onLongPress={() => {
                if (item?.draftItem) {
                  setIsOpen(true);
                  setDraftItem(item);
                }
              }}
              onPress={
                permissions?.view
                  ? () => navigation.navigate('ViewUnit', { ...item, onUpdate: setRefreshOnFocus })
                  : () => { }
              }>
              <UnitCards
                style={{
                  padding: 5,
                  marginTop: 8,
                  marginBottom: 4,
                  width: '94%',
                  marginRight: '4%',
                  marginLeft: '3%',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#E7E9E9',
                  color: '#131F1E',
                  fontSize: 15,
                  fontWeight: '500',
                }}
                status={item?.status}
                unitNumber={item?.unitNumber}
                rentType={item?.rentType}
                price={item?.price}
                draftItem={item?.draftItem}
              />
            </TouchableOpacity>
          </>
        )
      }

    },
    [navigation],
  );

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
              containerStyle: styles.buttonContainer,
              onPress: () => setIsOpen(false),
              ...button_styles['primary_50_brand_clear_large'],
            },
            {
              children: 'DELETE',
              containerStyle: styles.buttonContainer,
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

  return (
    <>
      <Box as={Layout} flex={1}>
        <InfiniteFlatList
          query={BuildingsUnitsList}
          variables={variables}
          dataExtractor={dataExtractor}
          keyExtractor={keyExtractor}
          renderItem={renderUnit}
          refreshOnFocus={refreshOnFocus}
          refreshOnLoad={!!route?.params?.refresh}
          setRefreshOnFocus={setRefreshOnFocus}
          draftData={draftData}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 80 }}
          ListEmptyComponent={
            <Text category="h6" py={3} textAlign="center" appearance="hint">
              No Units
            </Text>
          }
        />
      </Box>
      {renderModal()}
    </>
  );
};

export default UnitList;

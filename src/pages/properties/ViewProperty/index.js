import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'urql';
import getPropertyQuery from 'queries/properties/getBuild.gql';
import HeadedScreen from 'components/HeadedScreen';
import { HEADER_ACTIONS } from 'constants/actions';
import { useLoader } from 'hooks/useLoader';
import ViewPropertyPageHead from './ViewPropertyPageHead';
import ViewPropertyPageBody from './ViewPropertyPageBody';
import { colors } from 'styles/theme';
import { usePermissions, PERMISSION_SECTIONS } from 'hooks/usePermissions';

const ViewProperty = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [building, setBuilding] = useState(null);
  const [editDraft, setEditDraft] = useState(false);
  const [res, executeQuery] = useQuery({
    query: getPropertyQuery,
    variables: { id: route?.params?.id },
  });
  const permissions = usePermissions(PERMISSION_SECTIONS.PROPERTIES);
  
  const { loader } = useLoader({ isLoading: res.fetching });

  useEffect(() => {
    !editDraft && setBuilding(route?.params?.draftItem ? route?.params : res.data?.building)
  }, [route?.params, res])

  const updateDraft = (data) => {
    setEditDraft(true);
    setBuilding(data);
    route?.params?.onUpdate(true)
  }

  React.useEffect(() => {
    if (refreshing && !res.fetching) {
      setRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res.fetching]);

  React.useEffect(() => {
    if (route.params.refresh) {
      onRefresh();
    }
  }, [route.params.refresh]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    executeQuery({ requestPolicy: 'network-only' });
  }, [executeQuery]);

  const actions = React.useMemo(
    () =>
      permissions?.edit
        ? [
          { ...HEADER_ACTIONS.back, onPress: () => navigation.goBack() },
          {
            ...HEADER_ACTIONS.edit,
            onPress: () =>{
              setEditDraft(false);
              navigation.navigate('AddBuilding', {
                editData: building,
                onUpdate: onRefresh,
                updateDraft: updateDraft
              })
            }
          },
        ]
        : [{ ...HEADER_ACTIONS.back, onPress: () => navigation.goBack() }],
    [building, navigation, onRefresh],
  );

  const renderContent = useCallback(() => {
    return (
      <>
        <ViewPropertyPageHead building={building} navigation={navigation} />
        <ViewPropertyPageBody building={building} navigation={navigation} />
      </>
    )
  }, [building, navigation]);

  return (
    <HeadedScreen
      title="Property Details"
      actions={actions}
      contentContainerProps={{ bg: colors['gray scale/5'] }}
      scrollable
      style={{
        title: {
          color: '#131F1E',
          fontWeight: '700',
          lineHeight: 22,
          fontSize: 18,
        },
      }}>
      {loader}
      {renderContent()}
    </HeadedScreen>
  );
};

export default ViewProperty;

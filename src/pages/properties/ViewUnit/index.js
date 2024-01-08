import React, { useEffect, useState } from 'react';
import Share from 'react-native-share';
import HeadedScreen from 'components/HeadedScreen';
import { useQuery } from 'urql';
import getUnitQuery from 'queries/properties/getUnit.gql';
import { useLoader } from 'hooks/useLoader';
import ViewUnitPageHead from './ViewUnitPageHead';
import ViewUnitPageBody from './ViewUnitPageBody';
import { HEADER_ACTIONS } from 'constants/actions';
import { usePermissions, PERMISSION_SECTIONS } from 'hooks/usePermissions';
import { colors } from 'styles/theme';
import { styles } from './styles'

const ViewUnit = ({ navigation, route }) => {
  const [unit, setUnit] = useState(null);
  const [editDraft, setEditDraft] = useState(false);
  const [res, executeQuery] = useQuery({
    query: getUnitQuery,
    variables: { id: route?.params?.id },
  });

  const permissions = usePermissions(PERMISSION_SECTIONS.PROPERTIES);

  const { loader } = useLoader({ isLoading: res.fetching });


  useEffect(() => {
    !editDraft && setUnit(route?.params?.id ? res.data?.unit : route?.params)
  }, [route?.params, res]);

  const updateDraft = (data) => {
    setEditDraft(true);
    setUnit(data);
    route?.params?.onUpdate(true)
  }

  const onRefresh = React.useCallback(() => {
    executeQuery({ requestPolicy: 'network-only' });
  }, [executeQuery]);

  const openShareModal = () => {
    const options = {
      title: 'Unit' + ' ' + unit?.unitNumber,
      message: unit?.unitApplicationUrl,
    };
    Share.open(options);
  };

  const actions = React.useMemo(
    () =>
      permissions?.edit
        ? [
          { ...HEADER_ACTIONS.back, onPress: () => navigation.goBack() },
          { ...HEADER_ACTIONS.share, onPress: () => openShareModal() },
          {
            ...HEADER_ACTIONS.edit,
            onPress: () =>
              navigation.navigate('EditUnit', {
                id: unit?.id,
                editData: unit,
                onUpdate: onRefresh,
                updateDraft: route?.params?.draftItem ? updateDraft : null
              }),
          },
        ]
        : [
            { ...HEADER_ACTIONS.back, onPress: () => navigation.goBack() },
            { ...HEADER_ACTIONS.share, onPress: () => openShareModal() },
          ],

    [(navigation, onRefresh, unit)],
  );

  return (
    <HeadedScreen
      actions={actions}
      title="UNIT DETAILS" 
      contentContainerProps={{ bg: colors['gray scale/5'] }}
      scrollable
      headerStyle={{ title: styles?.title }}
    >
      {loader}
      <ViewUnitPageHead unit={unit} />
      <ViewUnitPageBody unit={unit} navigation={navigation} />
    </HeadedScreen>
  );
};

export default ViewUnit;

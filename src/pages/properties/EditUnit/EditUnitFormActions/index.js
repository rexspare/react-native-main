import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useMutation } from 'urql';
import deleteUnitMutation from 'queries/properties/deleteUnit.gql';
import Button from 'components/Button';
import Dialog from 'components/Dialog';
import Box from 'components/Box';
import Text from 'components/Text';
import { colors } from 'styles/theme';
import { styles } from '../styles';
import { typography } from 'styles/typography';

const EditUnitFormActions = ({
  isNew,
  onSubmit,
  unitId,
  isFormValid,
  isLoading,
}) => {
  const [deleteRes, deleteMutation] = useMutation(deleteUnitMutation);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigation = useNavigation();

  const onDelete = useCallback(() => {
    const del = async () => {
      setShowDeleteModal(false);
      const res = await deleteMutation({ id: unitId });
      if (res.data?.deleteUnit?.success) {
        navigation.navigate('PropertiesTabs', { refresh: true });
      } else {
        setError('Failed to delete unit');
      }
    };
    del();
  }, [deleteMutation, navigation, unitId]);

  return (
    <Box flex={1} style={{ width: '100%' }} alignItems="center" mb={3}>
      <Box
        style={{ width: '100%' }}
        flexDirection={!isNew ? `row` : 'column'}
        justifyContent={!isNew ? 'space-between' : `center`}
        mt={'20'}>
        {isNew && (
          <Button
            appearance="outline"
            py={1}
            status={'basic'}
            borderColor={colors['gray scale/30']}
            style={[
              styles.formActionButton,
              {
                backgroundColor: 'white',
                borderColor: colors['gray scale/30'],
                marginBottom: 30,
              },
            ]}
            textStyle={styles.formActionTxt}>
            POST TO MARKET
          </Button>
        )}
        {!isNew && (
          <Button
            appearance="outline"
            py={1}
            status={'basic'}
            borderColor={colors['gray scale/30']}
            style={[
              styles.formActionButton,
              {
                backgroundColor: 'white',
                borderColor: colors['gray scale/30'],
                paddingHorizontal: 23,
                minWidth: '47%',
              },
            ]}
            textStyle={styles.formActionTxt}
            onPress={() => setShowDeleteModal(true)}
            loading={deleteRes.fetching}>
            Remove Unit
          </Button>
        )}
        <Button
          loading={isLoading || deleteRes.fetching}
          disabled={!isFormValid}
          appearance="outline"
          py={1}
          style={[
            styles.formActionButton,
            isFormValid && { backgroundColor: colors['primary/50 – brand'] },
            !isNew && { paddingHorizontal: 23, minWidth: '47%' },
          ]}
          textStyle={[styles.formActionTxt, isFormValid && { color: '#fff' }]}
          onPress={onSubmit}>
          SAVE UNIT
        </Button>
      </Box>

      <Dialog
        visible={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Are you sure you want to remove unit?"
        styles={{
          title: {
            ...typography['body/large – Bold'],
            textTransform: 'uppercase',
            color: colors['gray scale/90'],
            paddingHorizontal: 20,
          },
          content: { paddingTop: 10 },
        }}
        buttons={[
          {
            gradient: true,
            children: 'REMOVE',
            onPress: onDelete,
            shape: 'circle',
            hide: true,
            style: styles.dialogRemove,
          },
          {
            gradient: true,
            children: 'CANCEL',
            shape: 'circle',
            hide: true,
            onPress: () => setShowDeleteModal(false),
            style: styles.dialogCancel,
          },
        ]}>
        <>
          <Text
            style={{
              ...typography['body/small – regular'],
              paddingHorizontal: 20,
              textAlign: 'center',
              color: colors['gray scale/90'],
            }}>
            This unit will be archived. You can restore it by contacting:
          </Text>
          <Text
            style={{
              ...typography['body/small – regular'],
              paddingHorizontal: 20,
              textAlign: 'center',
              color: colors['primary/50 – brand'],
            }}>
            Support@tigra.app
          </Text>
        </>
      </Dialog>
    </Box>

    // {/* {!isNew && (
    //     <>
    //         <Box my={15}>
    //             <Button gradient shape="circle" size="giant">
    //                 Pull Data From Third Party
    //             </Button>
    //         </Box>
    //         <SubmitButton
    //             onPress={() => setShowDeleteModal(true)}
    //             appearance="ghost"
    //             status="danger"
    //             size="large"
    //             shape="circle"
    //             loading={deleteRes.fetching}>
    //             Remove Unit
    //         </SubmitButton>
    //     </>
    // )}

    // <Dialog
    //     visible={showDeleteModal}
    //     onHide={() => setShowDeleteModal(false)}
    //     title="Remove Unit"
    //     content="Once you delete this record you won’t be able to undo this action."
    //     buttons={[
    //         {
    //             gradient: true,
    //             children: 'Cancel',
    //             shape: 'circle',
    //             hide: true,
    //         },
    //         {
    //             gradient: true,
    //             children: 'OK',
    //             onPress: onDelete,
    //             shape: 'circle',
    //             hide: true,
    //         },
    //     ]}
    // /> */}
  );
};

export default EditUnitFormActions;

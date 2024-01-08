import { TASK_STATUSES, TASK_TYPES } from 'constants/enums';
import useTaskStatusSetter from 'hooks/useTaskStatusSetter';
import addManualPaymentMutation from 'queries/financials/addManualPayment.gql';
import useTheme from 'hooks/useTheme';
import React, { useCallback, useState } from 'react';
import { useMutation } from 'urql';
import Box from 'components/Box';
import Dialog from 'components/Dialog';
import RestoreTaskModal from 'components/TaskItem/RestoreTaskModal/index.';
import Button from 'components/Button';
import { t } from 'helpers/react';
import { colors } from 'styles/theme';

const ctaText = {
  [TASK_STATUSES.ARCHIVED]: 'RESTORE',
  [TASK_STATUSES.DONE]: 'TASK INCOMPLETE',
  [TASK_STATUSES.IN_PROGRESS]: 'MARK AS «COMPLETE»',
  [TASK_STATUSES.TO_DO]: 'Mark as «In Progress»',
};

const ctaStatus = {
  [TASK_STATUSES.ARCHIVED]: TASK_STATUSES.IN_PROGRESS,
  [TASK_STATUSES.DONE]: TASK_STATUSES.IN_PROGRESS,
  [TASK_STATUSES.IN_PROGRESS]: TASK_STATUSES.DONE,
  [TASK_STATUSES.TO_DO]: TASK_STATUSES.IN_PROGRESS,
};

const ViewTaskActions = ({
  taskType,
  status,
  systemTask,
  taskId,
  lease,
  navigation,
  onRefresh,
}) => {
  const theme = useTheme();
  const [showRentModal, setShowRentModal] = useState(false);
  const [restoreModalProps, setRestoreModalProps] = useState({
    visible: false,
  });
  const [addManualPaymentRes, addManualPayment] = useMutation(
    addManualPaymentMutation,
  );

  const {
    onSetStatus,
    modalProps,
    setStatusResult,
    successModal,
    loader,
  } = useTaskStatusSetter(status, onRefresh, { backTxt: 'No, Back to task' });

  const onCtaPress = useCallback(() => {
    onSetStatus(taskId, ctaStatus[status]);
  }, [onRefresh, onSetStatus, taskId]);

  const onApproveCash = React.useCallback(() => {
    const approve = async () => {
      const res = await addManualPayment({
        input: {
          task: taskId,
        },
      });
      if (res.error) {
        console.log(res.error);
      } else if (res.data?.addManualPayment?.transaction?.id) {
        navigation.navigate('EditTransaction', {
          id: res.data.addManualPayment.transaction.id,
        });
      }
    };
    approve();
  }, [addManualPayment, navigation, taskId]);

  return (
    <>
      <Box flex={1} pb={18} px="1" justifyContent={'flex-end'}>
        {systemTask && taskType === TASK_TYPES.LEASE_RENEWAL && lease?.id ? (
          <Button
            size="large"
            containerStyle={{ marginHorizontal: 16, minHeight: 48 }}
            textStyle={{ fontSize: 16, textTransform: 'uppercase' }}
            onPress={() =>
              navigation.navigate('LandlordTenants', {
                navigate: ['ProspectiveTenants'],
              })
            }
            disabled={!taskId}>
            RENEW LEASE
          </Button>
        ) : null}

        {systemTask &&
          (taskType === TASK_TYPES.LATE_RENT ||
            taskType === TASK_TYPES.COLLECT_RENT) &&
          lease?.id ? (
          <Button
            loading={addManualPaymentRes.fetching}
            containerStyle={{ marginHorizontal: 16, marginTop: 16 }}
            textStyle={{ fontSize: 16, textTransform: 'uppercase' }}
            size="large"
            onPress={() => setShowRentModal(true)}
            disabled={!taskId}>
            APPROVE CASH PAYMENT
          </Button>
        ) : null}
        {!systemTask ? (
          <Button
            size="large"
            containerStyle={{ marginHorizontal: 16, marginTop: 16 }}
            textStyle={{ fontSize: 16, textTransform: 'uppercase', fontWeight: '500' }}
            onPress={
              status !== TASK_STATUSES.ARCHIVED
                ? onCtaPress
                : () => setRestoreModalProps({ taskId, visible: true })
            }
            disabled={!taskId}>
            {ctaText[status]}
          </Button>
        ) : null}
        {t(
          !systemTask && status !== TASK_STATUSES.ARCHIVED,
          <Button
            size="large"
            onPress={() => onSetStatus(taskId, TASK_STATUSES.ARCHIVED)}
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: colors['gray scale/60'],
              maxHeight: 36,
              borderRadius: 12,
            }}
            textStyle={{ color: colors['gray scale/60'], fontSize: 16, fontWeight: '500' }}
            containerStyle={{
              marginTop: 16,
              marginBottom: 10,
              marginHorizontal: 16,
              minHeight: 48,
            }}
            disabled={!taskId}>
            MOVE TO ARCHIVE
          </Button>,
        )}
      </Box>
      <Dialog {...modalProps} />
      <Dialog
        visible={showRentModal}
        onHide={() => setShowRentModal(false)}
        title="Approve Cash Payment"
        buttons={[
          {
            gradient: true,
            shape: 'circle',
            children: 'Approve',
            hide: true,
            onPress: onApproveCash,
          },
          {
            shape: 'circle',
            hide: true,
            children: 'Cancel',
            status: 'control',
          },
        ]}>
        This will mark this rent payment as manually paid, and complete the
        payment process. Please make sure you received the cash payment from the
        tenant.
      </Dialog>
      {successModal}
      {t(
        status === TASK_STATUSES.ARCHIVED,
        <RestoreTaskModal
          {...restoreModalProps}
          onHide={() => setRestoreModalProps({ visible: false })}
        />,
      )}
      {loader}
    </>
  );
};

export default ViewTaskActions;

import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useMutation } from 'urql';
import sendLeaseMutation from 'queries/properties/Lease/SendLease.gql';
import { useSetShouldRefresh } from 'hooks/useShouldRefresh';
import { useLoader } from 'hooks/useLoader';
import { ModalOption } from 'components/AttachmentModal';
import BottomHalfModal from 'components/BottomHalfModal';
import ActivityFeedModal from 'components/ActivityFeed/ActivityFeedModal';
import { CallContact } from 'helpers/number';
import { TENANT_INFO_TAB } from 'constants/refreshConsts';

const ApprovedTenantActionsModal = ({ lease, toLeaseTab, ...props }) => {
  const { loader, loadingFunc } = useLoader();
  const [isOpen, seIsOpen] = useState(false);
  const [res, sendLease] = useMutation(sendLeaseMutation);
  const setRefreshInfoTab = useSetShouldRefresh(TENANT_INFO_TAB);

  const handleSuccess = () => {
    Toast.show({ type: 'success', text1: 'Lease Package Sent Successfully' });
    setRefreshInfoTab();
  };

  const handleSendLease = loadingFunc(async () => {
    props?.onHide();

    if (lease?.detailsFilled) {
      const res = await sendLease({ id: lease?.pk });
      if (res?.data?.sendLease?.success) return handleSuccess();
    } else {
      Toast.show({
        type: 'error1',
        text1: 'Error',
        text2: 'Must input lease details to send a lease package',
        autoHide: false,
        position: 'top',
        props: {
          buttons: [
            {
              children: 'Go to lease details',
              onPress: () => {
                Toast.hide();
                toLeaseTab?.();
              },
            },
          ],
        },
      });
    }
  });

  return (
    <>
      {loader}
      <BottomHalfModal title={'Actions'} displayDone={false} {...props}>
        <ModalOption
          onPress={() => seIsOpen(true)}
          text={'View Activity'}
          iconProps={{ name: 'activity', pack: 'pm' }}
        />
        <ModalOption
          onPress={() =>
            Toast.show({
              type: 'success',
              text1: 'In Development process',
            })
          }
          text={'Schedule A Meeting'}
          iconProps={{ name: 'meeting', pack: 'pm' }}
        />
        <ModalOption
          onPress={() => CallContact(lease?.tenant?.phone)}
          text={'Call'}
          iconProps={{ name: 'dark_phone', pack: 'pm' }}
        />
        <ModalOption
          onPress={handleSendLease}
          text={'Send Lease Package'}
          iconProps={{ name: 'list', pack: 'pm' }}
          inactive={lease?.leaseSigned}
        />
        {/* <ModalOption
          onPress={handleSendLease}
          text={'Deny'}
          iconProps={{ name: 'close', pack: 'pm' }}
        /> */}
      </BottomHalfModal>
      <ActivityFeedModal
        modalProps={{ visible: isOpen, onHide: () => seIsOpen(false) }}
        keyboardPadding={false}
        feedId={lease?.tenant?.activityFeed?.pk}
        comments={true}
      />
    </>
  );
};

export default ApprovedTenantActionsModal;

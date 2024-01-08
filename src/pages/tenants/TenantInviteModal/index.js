import React from 'react';
import { Buttons } from 'components/Dialog';
import Text from 'components/Text';
import { button_styles } from 'styles/button';
import { styles } from './styles';
import { useMutation } from 'urql';
import sendTenantInvite from 'queries/tenants/sendTenantInvite.gql';
import Toast from 'react-native-toast-message';
import Dialog from 'components/Dialog';

const TenantInviteModal = ({
  isVisible,
  onHide,
  id,
  tenantName,
  onSuccess,
}) => {
  const [_, sendInvite] = useMutation(sendTenantInvite);

  const handleOnPress = async () => {
    const res = await sendInvite({ id });
    if (res.data?.sendUserInvite?.success) {
      Toast.show({
        type: 'success',
        text1: 'Invite was sent to tenant successfully.',
      });
      onHide();
      onSuccess();
    } else {
      Toast.show({ type: 'error1', text1: 'Something went wrong' });
    }
  };

  return (
    <Dialog visible={isVisible} onHide={onHide} styles={styles.container}>
      <Text style={styles.title}>Send Tigra Invitation</Text>
      <Text style={styles.content}>
        Send {tenantName} invitation to join Tigra?
      </Text>
      <Buttons
        containerStyle={styles.buttonsContainer}
        buttons={[
          {
            children: 'Cancel',
            containerStyle: styles.buttonContainer,
            onPress: onHide,
            ...button_styles['primary_50_brand_clear_large'],
          },
          {
            children: 'Send',
            containerStyle: styles.buttonContainer,
            onPress: () => handleOnPress(),
            ...button_styles['primary_large'],
          },
        ]}
      />
    </Dialog>
  );
};

export default TenantInviteModal;

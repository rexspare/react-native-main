import React from 'react';
import { Linking } from 'react-native';
import Dialog, { Buttons } from '../Dialog';
import Text from '../Text';
import { styles } from './styles';

const SupportModal = ({ isOpen, onHide }) => {
  return (
    <Dialog visible={isOpen} onHide={onHide} styles={styles.container}>
      <Text style={styles.title}>Support</Text>
      <Text style={styles.content}>
        If you have any questions, please, {`\n`} contact technical support:
        support@tigra.app
      </Text>
      <Buttons
        containerStyle={styles.buttonsContainer}
        buttons={[
          {
            children: 'CONTACT SUPPORT',
            containerStyle: styles.buttonContainer,
            onPress: () => Linking.openURL(`mailto:support@tigra.app`),
            ...styles.primary_large,
          },
          {
            children: 'CANCEL',
            containerStyle: styles.buttonContainer,
            onPress: onHide,
            ...styles.primary_50_brand_clear_large,
          },
        ]}
      />
    </Dialog>
  );
};

export default SupportModal;

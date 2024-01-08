import React from 'react';
import { Buttons } from 'components/Dialog';
import Text from 'components/Text';
import AltModal from 'components/Modal/AltModal';
import BottomHalfContextMenu from 'components/ContextMenu/BottomHalfContextMenu';
import { APPROVE } from 'constants';
import { DENY } from 'constants';
import { dialogProps } from './props';
import { button_styles } from 'styles/button';
import { colors } from 'styles/theme';
import { styles } from './styles';

export const SetApplicationStatusModal = ({ setStatus, onHide, visible }) => {
  const contextMenuItems = [
    {
      key: 'accept',
      label: 'Accept',
      color: colors['primary/50'],
      icon: 'green-tick',
      onPress: () => setStatus(APPROVE),
    },
    {
      key: 'deny',
      label: 'Deny',
      color: colors['gray scale/60'],
      icon: 'close',
      onPress: () => setStatus(DENY),
    },
  ];

  return (
    <BottomHalfContextMenu
      menuItems={contextMenuItems}
      visible={visible}
      onHide={onHide}
      title="Prospective Tenant"
      displayDoneRight={false}
    />
  );
};

const ApplicationApprovalModal = ({ visible, onHide, status, onAction }) => {
  return (
    <AltModal visible={visible} onHide={onHide}>
      <Text style={styles.title}>{dialogProps?.[status]?.title}</Text>
      <Text style={styles.content}>{dialogProps?.[status]?.content}</Text>
      <Buttons
        containerStyle={styles.buttonsContainer}
        buttons={[
          {
            children: dialogProps?.[status]?.cancelButtonText,
            containerStyle: styles.buttonContainer,
            onPress: onHide,
            ...button_styles['primary_50_brand_clear_large'],
          },
          {
            children: dialogProps?.[status]?.confirmButtonText,
            containerStyle: styles.buttonContainer,
            onPress: onAction,
            ...button_styles['primary_large'],
          },
        ]}
      />
    </AltModal>
  );
};

export default ApplicationApprovalModal;

import React from 'react';
import { noop } from 'lodash';
import { useIsOpen } from 'hooks/useIsOpen';
import { getTenantTabIndexByValue } from 'pages/tenants/helpers';
import Button from 'components/Button';
import Box from 'components/Box';
import ApprovedTenantActionsModal from './ApprovedTenantActionsModal';
import { t } from 'helpers/react';
import { LEASE_STATUS } from 'constants/enums';
import { button_styles } from 'styles/button';

const TenantProfileActions = ({
  lease,
  onSwitchToTab = noop,
  approveApplication,
  denyApplication,
  ...props
}) => {
  const { isOpen, open, close } = useIsOpen(null);
  const buttonProps = getButtonProps({ open, lease, ...props });

  if (lease?.status === LEASE_STATUS.PROSPECTIVE) {
    return t(
      lease?.application?.pk,
      <>
        <Box mt={0}>
          <Box
            as={Button}
            children={'Accept'}
            onPress={approveApplication}
            {...button_styles['primary']}
          />
          <Box
            as={Button}
            my={2}
            onPress={denyApplication}
            children={'Deny'}
            {...button_styles['clear_red_border']}
          />
        </Box>
      </>,
    );
  }

  return (
    <Box mt={10}>
      {t(
        !!buttonProps,
        <Button {...buttonProps} {...button_styles['primary']} size="large" />,
      )}
      <ApprovedTenantActionsModal
        lease={lease}
        onHide={close}
        visible={isOpen}
        toLeaseTab={() => onSwitchToTab(getTenantTabIndexByValue('TenantUnit'))}
      />
    </Box>
  );
};

const getButtonProps = ({
  isApproved,
  open,
  isCurrent,
  isPast,
  isProspective,
  lease,
  navigation,
  tenant,
  onRefresh,
}) => {
  if (isApproved || lease?.status === LEASE_STATUS.APPROVED)
    return {
      children: 'Actions',
      onPress: open,
    };
  if (isCurrent || lease?.status === LEASE_STATUS.CURRENT)
    return {
      children: 'Rate The Tenant',
      onPress: () =>
        navigation.navigate('RateTenant', {
          id: tenant?.id,
          onUpdate: () => {
            onRefresh();
            navigation.goBack();
          },
        }),
    };
};

export default TenantProfileActions;

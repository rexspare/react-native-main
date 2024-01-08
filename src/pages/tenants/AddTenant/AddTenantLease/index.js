import React, { useState } from 'react';
import Box from 'components/Box';
import LeaseForm from 'components/Forms/LeaseForm';
import leaseMutation from 'queries/properties/Lease/ManualLeaseMutation.gql';
import { useMutation } from 'urql';
import { formatLeaseFormDataToMutation } from './helper';
import TenantInviteModal from 'pages/tenants/TenantInviteModal';

const TenantLeaseForm = ({ navigation, route }) => {
  const [res, mutation] = useMutation(leaseMutation);
  const [ID, setID] = useState();

  const handleSubmit = async form => {
    const data = formatLeaseFormDataToMutation({
      ...form,
      rentAmount: parseFloat(form?.rentAmount.replace(/,/g, '')),
      securityDeposit: parseFloat(form?.securityDeposit.replace(/,/g, '')),
      tenantId: route?.params?.tenantId,
    });
    const res = await mutation(data);
    const id = res?.data?.manualUploadLease?.lease?.tenant?.id;
    if (id) {
      setID(res?.operation?.variables?.tenantId);
    }
  };

  const onRate = () => {
    navigation.navigate('RateTenant', {
      ID,
      onUpdate: () =>
        navigation?.navigate('ListTenants', { refreshOnFocus: true }),
      onSkip: () =>
        navigation?.navigate('ListTenants', { refreshOnFocus: true }),
    });
  };

  const onHideModal = () => {
    setID(null);
    onRate();
  };

  return (
    <Box px={3}>
      <LeaseForm
        tenants={false}
        paymentMethod={true}
        submitBtn={true}
        leaseStatus={true}
        submitBtnTxt={'Save Tenant'}
        onSubmit={handleSubmit}
      />
      <TenantInviteModal
        onHide={onHideModal}
        isVisible={!!ID}
        id={ID}
        onSuccess={onRate}
      />
    </Box>
  );
};

export default TenantLeaseForm;

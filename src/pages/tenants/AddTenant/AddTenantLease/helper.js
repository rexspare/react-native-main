import { formatImageToFileInput } from 'components/Forms/Tasks/helpers';
import { format } from 'helpers/date';
import { LEASE_FORM_STATUS } from 'constants/enums';

export const formatLeaseFormDataToMutation = form => {
  let data = {};
  if (form?.leaseStatus === LEASE_FORM_STATUS.SIGNED) {
    data.leaseSigned = true;
  } else if (form?.leaseStatus) {
    data.application = {
      isApproved: form?.leaseStatus === LEASE_FORM_STATUS.APPROVED,
    };
  }

  return {
    unitId: form?.unit?.pk,
    tenantId: form?.tenant?.pk,
    ...form,
    rentDay: form?.rentDay?.key,
    start: format(form?.start, 'yyyy-MM-dd'),
    end: format(form?.end, 'yyyy-MM-dd'),
    documents: form?.attachments?.map(formatImageToFileInput),
    unit: null,
    tenant: null,
    leaseStatus: null,
    ...data,
  };
};

import { formatImageToFileInput } from 'components/Forms/Tasks/helpers';
import { format } from 'helpers/date';
import TenantInfoTab from './TenantInfoTab';
import TenantUnitTab from './TenantUnitTab';
import TenantDocumentsTab from './TenantDocumentsTab';
import TenantActivityTab from './TenantActivityTab';

export const formatLeaseData = lease => ({
  rentDay: lease?.rentDay?.key,
  start: format(lease?.start, 'yyyy-MM-dd'),
  end: format(lease?.end, 'yyyy-MM-dd'),
  documents: lease?.attachments?.map(formatImageToFileInput),
  unitId: lease?.unit?.pk,
  paymentMethods: lease?.paymentMethods,
  rentAmount: Number(lease?.rentAmount),
  securityDeposit: Number(lease?.securityDeposit),
});

export const tabs = [
  {
    text: 'Info',
    value: 'TenantInfo',
  },
  {
    text: 'Unit',
    value: 'TenantUnit',
  },
  {
    text: 'Documents',
    value: 'TenantDocuments',
  },
  {
    text: 'Activity',
    value: 'TenantActivity',
  },
];

export const steps = [
  TenantInfoTab,
  TenantUnitTab,
  TenantDocumentsTab,
  TenantActivityTab,
];

export const userTypes = {
  1: 'tenant',
};

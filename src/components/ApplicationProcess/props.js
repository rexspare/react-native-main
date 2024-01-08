import { DENY } from 'constants';
import { APPROVE } from 'constants';

export const dialogProps = {
  [APPROVE]: {
    title: 'Tenant Approval',
    content: 'Are you sure you would like to approve this application?',
    cancelButtonText: 'CANCEL',
    confirmButtonText: 'APPROVE',
  },
  [DENY]: {
    title: 'Tenant Deny',
    content: 'Are you sure you would like to deny this application?',
    cancelButtonText: 'BACK',
    confirmButtonText: 'DENY',
  },
};

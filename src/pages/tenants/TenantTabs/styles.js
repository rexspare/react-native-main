import { underlinedMultiTextSwitch } from 'styles/reusable-classes';

export const TENANT_LIST_TABS = [
  {
    text: 'Current',
    value: 'isCurrent',
  },
  {
    text: 'Prospec.',
    value: 'isProspective',
  },
  {
    text: 'Approved',
    value: 'isApproved',
  },
  {
    text: 'Past',
    value: 'isPast',
  },
];

export const TENANT_LIST_PAST_TABS = [
  {
    text: 'Past',
    value: 'isPast',
    flex: 1,
  },
  {
    text: 'Archived',
    value: 'isArchived',
    flex: 1,
  },
];

export const styles = {
  switch: {
    width: '91%',
    marginHorizontal: '4.5%',
  },
  pastTabsSwitch: {
    width: '72%',
    marginLeft: '14%',
    marginTop: 7,
    ...underlinedMultiTextSwitch,
  },
};

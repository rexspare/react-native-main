import { __EnumValue } from 'graphql';
import { capitalize } from 'lodash';

export const stringifyEnumKey = key => {
  return key
    ? key
        .split('_')
        .map(w => `${w[0].toUpperCase()}${w.substr(1).toLowerCase()}`)
        .join(' ')
        .split('/')
        .map(str => `${str[0].toUpperCase()}${str.substr(1).toLowerCase()}`)
        .join('/') //To-Do: Improve this?
    : '';
};

export const stringifyEnumValue = (enu, value) => {
  const key = Object.keys(enu).find(k => enu[k] === value);
  if (key) {
    return stringifyEnumKey(key);
  }
  return '';
};

export const formatEnumToSelectOptions = enumerator =>
  Object.keys(enumerator).map(key => ({
    key: enumerator[key],
    title: key
      .split('_')
      .map(str => `${str[0].toUpperCase()}${str.substr(1).toLowerCase()}`)
      .join(' '),
  }));

export const formatEnumToTabListSelect = enumeration => {
  return Object.entries(enumeration).map(([text, value]) => ({
    text: capitalize(text),
    value,
  }));
};

export const AMENITY_TYPES = {
  BUILDING: 1,
  UNIT: 2,
};

export const USER_TYPES = {
  TENANT: 1,
  LANDLORD: 2,
  MANAGEMENT: 3,
  STAFF: 0,
};

export const UNIT_STATUS = {
  VACANT: 2,
  OCCUPIED: 3,
  LISTED: 1,
};

export const RENT_TYPES = {
  FREE_MARKET: 1,
  RENT_STABILIZED: 2,
  RENT_CONTROLLED: 3,
};

export const UNIT_UTILITIES = {
  WATER: 1,
  GAS: 2,
  ELECTRICITY: 3,
};

export const DAYS = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
};

export const TASK_STATUSES = {
  TO_DO: 1,
  IN_PROGRESS: 2,
  DONE: 3,
  ARCHIVED: 4,
};

export const TASK_TYPES = {
  CUSTOM: 1,
  COLLECT_RENT: 2,
  LATE_RENT: 3,
  LEASE_RENEWAL: 4,
  DHCR_REGISTATION: 5,
  HPD_REGISTRATION: 6,
  BIRTHDAY: 7,
  HOLIDY: 8,
  MAINTENANCE_REQUEST: 9,
};

export const TASK_PRIORITY = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
  ['N/A']: 4,
};

export const LEASE_STATUS = {
  CURRENT: 1,
  PAST: 2,
  PROSPECTIVE: 3,
  APPROVED: 4,
  ARCHIVED: 5,
};

export const LEASE_FORM_STATUS = {
  PROSPECTIVE: 'prospective',
  APPROVED: 'approved',
  SIGNED: 'signed',
};

export const PROSPECTIVE_LEASE_STATUS = {
  INITIAL: 1,
  WITH_LEASE: 2,
  WITH_PACKAGE: 3,
};

export const TRANSACTION_SOURCES = {
  IN_APP: 1,
  MANUAL: 2,
};

export const DOCUMENT_TYPE = {
  FOLDER: 1,
  FILE: 2,
};

export const TRANSACTION_TYPE = {
  INCOME: 1,
  EXPENSE: 2,
};

const PAYMENT_CASH = 'CASH';
const PAYMENT_CHECK = 'CHECK';
const PAYMENT_CREDIT = 'CARD';
const PAYMENT_IN_APP = 'IN APP';
const PAYMENT_OTHER = 'OTHER';
const PAYMENT_MANUAL = 'MANUAL';
const PAYMENT_BANK_ACCOUNT = 'BANK';
const PAYMENT_PAYPAL = 'PAYPAL';

export const PAYMENT_METHODS = {
  CARD: PAYMENT_CREDIT,
  BANK_ACCOUNT: PAYMENT_BANK_ACCOUNT,
  CHECK: PAYMENT_CHECK,
  CASH: PAYMENT_CASH,
  PAYPAL: PAYMENT_PAYPAL,
  OTHER: PAYMENT_OTHER,
  // IN_APP: PAYMENT_IN_APP,
  // MANUAL: PAYMENT_MANUAL,
};

export const EVENT_REPEATS = {
  NEVER: null,
  EVERY_DAY: 1,
  EVERY_WEEK: 2,
  EVERY_2_WEEKS: 3,
  EVERY_MONTH: 4,
  EVERY_YEAR: 5,
};

export const EVENT_ALERTS = {
  NONE: null,
  '1_DAY_BEFORE': 1,
  '2_DAYS_BEFORE': 2,
  '1_WEEK_BEFORE': 7,
  '2_WEEKS_BEFORE': 14,
  '1_MONTH_BEFORE': 30,
};

export const NOTIFICATION_TYPES = {
  BUILDING_ASSIGNMENT: 1,
  LEASE_APPROVAL: 2,
  LEASE_APPROVED: 3,
  LEASE_REJECTED: 4,
  TASK_ASSIGNMENT: 5,
  EVENT_ASSIGNMENT: 6,
  TASK_UPDATE: 7,
  PROVIDER_PUBLISHED: 8,
  EVENT: 9,
  EVENT_REMINDER: 10,
  TASK_REMINDER: 11,
  MAINTENANCE_REQUEST: 12,
  LEASE_SIGNED: 13,
  LEASE_RENEWAL: 14,
  COLLECT_RENT: 15,
  APPROVE_PAYMENT: 16,
};

export const MAINTENANCE_REQUEST_STATUSES = {
  OPEN: 1,
  CLOSED: 2,
};

export const MAINTENANCE_TIME_PREFERENCES = {
  TIME_1: 0,
  TIME_2: 1,
  TIME_3: 2,
  TIME_4: 3,
  TIME_5: 4,
  TIME_6: 5,
  TIME_7: 6,
};

export const MAINTENANCE_SERVICES = {
  ELECTRICIAN: 2,
  HANDYMAN: 3,
  PLUMBER: 4,
};

export const MAINTENANCE_SERVICES_OPTIONS = [
  {
    id: 0,
    text: 'Super',
  },
  {
    id: 1,
    text: 'Electrician',
  },
  {
    id: 2,
    text: 'Handyman',
  },
  {
    id: 3,
    text: 'Plumber',
  },
  {
    id: 4,
    text: 'Other',
  },
];

export const PAYMENT_STATUSES = {
  UNPAID: 1,
  PENDING: 2,
  APPROVED: 3,
};

export const PROPERTY_TYPES = {
  RESIDENTIAL: 1,
  COMMERCIAL: 2,
  INDUSTRIAL: 3,
  LAND: 4,
};

export const TENANCY_DURATION_OPTIONS = {
  'Less than 1 year': 1,
  '1-2 years': 2,
  '2-5 years': 3,
  '5-10 years': 4,
  '10+ years': 5,
};

export const TENANT_OPTION = {
  Always: 1,
  'Most of the time': 2,
  Sometimes: 3,
  Rarely: 4,
  Never: 5,
  'N/A': 6,
};

export const FLAWED_BOOLEAN_OPTIONS = {
  YES: 1,
  NO: 2,
  NA: 3,
};
export const COMPLIANCE_OPTIONS = {
  VIOLATION: 1,
  COMPLAINTS: 2,
  PERMITS: 3,
};

export const VIOLATION_TYPES = {
  HPD: 1,
  DOB: 2,
  ECB: 3,
  NYPD: 4,
  DOH: 5,
};

export const AREA_LOCATION = {
  LIVING_ROOM: 'Living Room',
  DINING_ROOM: 'Dining Room',
  ENTRYWAY: 'Entryway',
  BEDROOM: 'Bedroom',
  BATHROOM: 'Bathroom',
  HALLWAY: 'Hallway',
  BALCONY: 'Balcony',
  OTHER: 'Other',
};

export const AREA_OPTIONS = [
  {
    id: 0,
    text: 'Living Room',
  },
  {
    id: 1,
    text: 'Dining Room',
  },
  {
    id: 2,
    text: 'Entryway',
  },
  {
    id: 3,
    text: 'Bedroom',
  },
  {
    id: 4,
    text: 'Bathroom',
  },
  {
    id: 5,
    text: 'Hallway',
  },
  {
    id: 6,
    text: 'Balcony',
  },
  {
    id: 7,
    text: 'Other',
  },
];

export const ADD_MEMBERS_TAB = {
  InfoTab: 1,
  WorkTab: 2,
  DocumentsTab: 3,
};

export const MAINTENANCE_TIME_PREFERENCES_OPTIONS = [
  {
    id: 0,
    text: '8:00 AM - 10:00 AM',
  },
  {
    id: 1,
    text: '10:00 AM - 12:00 AM',
  },
  {
    id: 2,
    text: '12:00 AM - 2:00 PM',
  },
  {
    id: 3,
    text: '2:00 PM - 4:00 PM',
  },
  {
    id: 4,
    text: '4:00 PM - 6:00 PM',
  },
  {
    id: 5,
    text: '6:00 PM - 8:00 PM',
  },
  {
    id: 6,
    text: '8:00 PM - 10:00 PM',
  },
];

import * as yup from 'yup';
import { formatImageToFileInput } from 'components/Forms/Tasks/helpers';
import { format } from 'helpers/date';

const standardPermissionsShape = yup.object().shape({
  create: yup.boolean(),
  edit: yup.boolean(),
  view: yup.boolean(),
});

const messagingPermissionsShape = yup.object().shape({
  tenants: yup.boolean(),
  teamMembers: yup.boolean(),
});

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .max(30)
    .required()
    .label('First Name'),
  lastName: yup
    .string()
    .max(30)
    .required()
    .label('Last Name'),
  emailPersonal: yup
    .string()
    .email()
    .max(100)
    .required()
    .label('Email'),
  email: yup
    .string()
    .email()
    .max(100)
    .label('Email'),
  docType: yup.object().shape({
    value: yup.string(),
    text: yup.string(),
  }),
  docNumber: yup
    .string()
    .max(12)
    .required(),
  phoneNumberCell: yup
    .string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Not a valid phone number',
    )
    .required()
    .label('Phone number (cell)'),
  phoneNumberOffice: yup
    .string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Not a valid phone number',
    )
    .label('Phone number (work)'),
  dateOfBirth: yup.date().label('Date of birth'),
  homeAddress: yup
    .string()
    .max(30)
    .label('Current address'),
  officeAddress: yup
    .string()
    .max(30)
    .label('Office address'),
  attachments: yup.mixed().nullable(),
  picture: yup.object(),
  propertiesPermissions: standardPermissionsShape,
  tenantsPermissions: standardPermissionsShape,
  tasksPermissions: standardPermissionsShape,
  profilePermissions: standardPermissionsShape,
  filesPermissions: standardPermissionsShape,
  financialsPermissions: standardPermissionsShape,
  messagesPermissions: messagingPermissionsShape,
});

export const formatUserFormDataToMutation = form => {
  ({
    data: {
      firstName: form?.firstName,
      lastName: form?.lastName,
      address: form?.homeAddress,
      phone: form?.phoneNumberCell.replace(/[- )(]/g, ''),
      [form.docType?.value || 'ssn']: form.docNumber,
      birthday: format(form?.dateOfBirth, 'yyyy-MM-dd'),
      email: form?.emailPersonal,
      workingDetails: {
        email: form?.email,
        phone: form?.phoneNumberOffice ? form?.phoneNumberOffice.replace(/[- )(]/g, '') : null,
        address: form?.officeAddress,
      },
      picture: formatImageToFileInput(form?.picture)?.file,
    },
    permissions: formatUserPermissionsToMutation(form),
  })
};

export const formatUserPermissionsToMutation = form => ({
  tasks: form?.tasksPermissions,
  tenants: form?.tenantsPermissions,
  financials: form?.financialsPermissions,
  documents: form?.filesPermissions,
  profile: form?.profilePermissions,
  properties: form?.propertiesPermissions,
  messaging: form?.messagesPermissions,
});

export const defaultPermissions = {
  propertiesPermissions: {
    create: false,
    edit: false,
    view: true,
  },
  financialsPermissions: {
    create: false,
    edit: false,
    view: false,
  },
  tenantsPermissions: {
    create: false,
    edit: false,
    view: true,
  },
  tasksPermissions: {
    create: false,
    edit: false,
    view: true,
  },
  profilePermissions: {
    create: false,
    edit: false,
    view: true,
  },
  filesPermissions: {
    create: true,
    edit: true,
    view: true,
  },
  messagesPermissions: {
    tenants: false,
    teamMembers: true,
  },
};

export const infoDisabled = watching => {
  const {
    firstName,
    lastName,
    emailPersonal,
    phoneNumberCell,
    homeAddress,
    docNumber,
    dateOfBirth,
  } = watching;
  if (
    firstName &&
    lastName &&
    emailPersonal &&
    phoneNumberCell &&
    homeAddress &&
    docNumber &&
    dateOfBirth
  ) {
    return true;
  } else {
    return false;
  }
};

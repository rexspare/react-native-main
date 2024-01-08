import * as yup from 'yup';
import { getHours, getMinutes, getSeconds } from 'date-fns';
import { formatImageToFileInput } from 'components/Forms/Tasks/helpers';
import { format } from 'helpers/date';
import { formatHours } from 'utils/formatWorkHours';

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
  userTitle: yup.string().label('Title'),
  email: yup
    .string()
    .email()
    .max(100)
    .required()
    .label('Email'),
  phone: yup
    .string()
    .required()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Not a valid phone number',
    )
    .label('Cell Phone'),
  birthday: yup.date().label('DOB'),
  picture: yup
    .object()
    .shape({
      uri: yup.string().label('picture'),
    })
    .nullable(),
  address: yup.string().label('Home Address'),
  officeEmail: yup
    .string()
    .email()
    .nullable()
    .label('Office Email'),
  docType: yup
    .object()
    .shape({
      value: yup.string(),
      text: yup.string(),
    })
    .required()
    .label('Document'),
  docNumber: yup
    .number()
    .required()
    .label('DocNumber'),
  officePhone: yup
    .string()
    .nullable()
    .label('Office Phone'),
  officeAddress: yup
    .string()
    .nullable()
    .label('Office Address'),
  workHours: yup
    .array()
    .ensure()
    .of(
      yup.object().shape({
        key: yup.string(),
        title: yup.string(),
        dayOff: yup.string(),
        start: yup.string(),
        end: yup.string(),
      }),
    )
    .label('Work Hours'),
});

export const getDocumentType = ({ ssn, passport, drivingLicense }) => {
  return ssn
    ? { docNumber: ssn, docType: { text: 'SSN', value: 'ssn' } }
    : passport
    ? {
        docNumber: passport,
        docType: { text: 'Passport number', value: 'passport' },
      }
    : drivingLicense
    ? {
        docNumber: drivingLicense,
        docType: { text: 'Driver licence', value: 'drivingLicense' },
      }
    : null;
};

export const formatedInitialValues = user => {
  if (user) {
    const docType = getDocumentType({
      ssn: user?.ssn,
      passport: user?.ssn,
      drivingLicense: user?.drivingLicense,
    });
    return {
      address: user?.address,
      firstName: user?.firstName,
      lastName: user?.lastName,
      userTitle: user?.userTitle,
      email: user?.email,
      docNumber: docType?.docNumber,
      picture: user?.picture ? { uri: user.picture } : null,
      phone: user?.phone,
      birthday: user?.birthday && new Date(user.birthday),
      workHours: user?.workHours,
      companyName: user?.managementCompany?.name,
      officeEmail: user?.workingDetails?.email,
      officePhone: user?.workingDetails?.phone,
      officeAddress: user?.workingDetails?.address,
    };
  }
};

const getTimes = date => {
  if (!date) {
    return null;
  }
  return `${getHours(date)}:${getMinutes(date)}:${getSeconds(date)}`;
};

export const formatUserFormDataToMutation = form => {
  return {
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    address: form?.address,
    userTitle: form?.userTitle,
    phone: form.phone,
    birthday: format(form?.birthday, 'yyyy-MM-dd'),
    workingDetails: {
      email: form?.officeEmail,
      phone: form?.officePhone,
      address: form?.officeAddress,
    },
    workHours: formatHours(form?.workHours, true),
    picture: formatImageToFileInput(form?.picture)?.file,
    ssn: form.docNumber,
  };
};

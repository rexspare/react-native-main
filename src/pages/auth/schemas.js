import * as yup from 'yup';


export const CHANGE_PASSWORD_SCHEMA = yup.object().shape({
    currentPassword: yup
      .string()
      .min(6)
      .max(20)
      .required()
      .label('Current Password'),
    newPassword: yup
      .string()
      .min(6)
      .max(20)
      .required()
      .label('New Password'),
    confirm: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], "Passwords don't match")
      .required('Confirm Password is required')
      .label('Confirm Password'),
  });

  export const LOGIN_SCHEMA = yup.object().shape({
    Email: yup
      .string()
      .email()
      .max(100)
      .required(),
    Password: yup
      .string()
      .min(6)
      .max(20)
      .required(),
  });

  export const REGISTRATION_SCHEMA = yup.object().shape({
    firstName: yup
      .string()
      .required()
      .max(50),
    lastName: yup
      .string()
      .required()
      .max(50),
    userType: yup
      .number()
      .required(),
    email: yup
      .string()
      .email()
      .max(100)
      .required(),
    phone: yup
    .string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Not a valid phone number',
    )
    .required(),
    companyName: yup
    .string(),
  });
  
  export const RESET_PASSWORD_CHANGE_SCHEMA =  yup.object().shape({
    Password: yup
      .string()
      .min(6)
      .max(20)
      .required(),
    Confirm: yup
      .string()
      .oneOf([yup.ref('Password'), null], "Passwords don't match")
      .required('Confirm Password is required'),
  });

  export const RESET_EMAIL_CHANGE_SCHEMA =  yup.object().shape({
    Email: yup
      .string()
      .email()
      .max(100)
      .required(),
  });
  
  export const TWO_FACTOR_CODE_SCHEMA = yup.object().shape({
    Code: yup
      .string()
      .matches(/^[0-9]{6}$/, 'Code must contain 6 digits')
      .required(),
  });

  export const TWO_FACTOR_PHONE_SCHEMA = yup.object().shape({
    'Phone Number': yup
      .string()
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        'Not a valid phone number',
      )
      .required(),
  });
  
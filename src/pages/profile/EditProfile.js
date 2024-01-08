import React from 'react';
import { ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import { Layout } from '@ui-kitten/components';
import { useQuery, useMutation } from 'urql';
import useTheme from 'hooks/useTheme';
import { useRegisterFields } from 'hooks/useRegisterFields';
import getProfileQuery from 'queries/profile/getProfile.gql';
import updateProfileMutation from 'queries/profile/updateProfile.gql';
import AuthProvider from 'providers/auth';
import Box from 'components/Box';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import { formatFileToBase64Input } from 'components/Forms/Tasks/helpers';
import Input from 'components/Input';
import Form from 'components/Form';
import SubmitButton from 'components/SubmitButton';
import Text from 'components/Text';
import PhoneNumberInput from 'components/Forms/Fields/PhoneNumberInput';
import ProfileImageInput from 'components/ProfileImageInput';
import { typography } from 'styles/typography';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required()
    .max(50)
    .label('First Name'),
  lastName: yup
    .string()
    .required()
    .max(50)
    .label('Last Name'),
  email: yup
    .string()
    .email()
    .max(100)
    .required()
    .label('Email'),
  phone: yup
    .string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Not a valid phone number',
    )
    .required()
    .label('Phone Number'),
  picture: yup.lazy(value => {
    let type;
    if (typeof value === 'string') {
      type = yup.string().url();
    } else {
      type = yup.object().shape({
        uri: yup.string().required(),
      });
    }
    return type.label('Profile Picture').nullable();
  }),
});

const EditProfile = ({ navigation, route }) => {
  const { logout } = React.useContext(AuthProvider);
  const theme = useTheme();

  const [profileRes] = useQuery({
    query: getProfileQuery,
    requestPolicy: 'cache-and-network',
  });
  const [error, setError] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(null);
  const [updateResult, onUpdate] = useMutation(updateProfileMutation);
  const initalValuesSet = React.useRef(false);
  const profile = profileRes?.data?.me;

  const initialValues = React.useMemo(() => {
    if (profile) {
      return {
        firstName: profile.firstName,
        lastName: profile.lastName,
        picture: profile.picture ? { uri: profile.picture } : null,
        email: profile.email,
        phone: profile.phone,
      };
    }
    return null;
  }, [profile]);

  const {
    watch,
    register,
    formState: { touched },
    setValue,
    handleSubmit,
    errors,
    unregister,
    getValues,
  } = useForm({
    validationSchema: schema,
    defaultValues: initialValues || {},
  });

  const watching = watch([
    'firstName',
    'lastName',
    'picture',
    'phone',
    'email',
  ]);

  React.useEffect(() => {
    const values = getValues();
    if (initialValues && !initalValuesSet.current) {
      Object.keys(initialValues).forEach(
        k => !values[k] && !touched[k] && setValue(k, initialValues[k]),
      );
      initalValuesSet.current = true;
    }
  }, [getValues, initialValues, setValue, touched]);

  useRegisterFields(Object.keys(schema.fields), register, unregister);

  const onSubmit = React.useCallback(
    form => {
      const data = {
        ...form,
      };
      const update = async () => {
        setError(null);
        setSubmitting(true);
        // upload pic
        if (form.picture && profile?.picture !== form.picture.uri) {
          data.picture = await formatFileToBase64Input(form.picture);
        } else {
          data.picture = form.picture?.uri;
        }
        const res = await onUpdate({ userData: data });
        if (res.data?.updateProfile?.success) {
          if (data.email !== profile?.email) {
            logout();
          } else {
            navigation.goBack();
            route?.params?.onUpdate();
          }
        } else {
          setError(
            (res.error.message || '').replace(
              /\[(Network Error|GraphQL)\]\s*/g,
              '',
            ),
          );
        }
        setSubmitting(false);
      };
      update();
    },
    [logout, navigation, onUpdate, profile],
  );

  return (
    <Box flex={1} as={Layout} pb={20}>
      <Box flex={1} as={SafeAreaView} forceInset={{ top: 'always' }}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
          ]}
          style={{
            title: { ...typography['body/large – Bold'] },
          }}
          alignment="center"
          title="Edit Profile"
          divider
        />
        <Box flex={1} alignItems="center">
          <Box flex={2} alignItems="center" justifyContent="center">
            <ProfileImageInput
              value={watching?.picture}
              onChange={val => {
                setValue('picture', val);
              }}
              disabled={submitting}
              name={`${watching?.firstName} ${watching?.lastName}`}
            />
          </Box>
          <Box flex={5} width={0.85}>
            {profile ? (
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Text category="c2" textAlign="center" mb={3}>
                  If you'll change your email you will be required to re-login.
                </Text>
                {error ? (
                  <Text category="c1" status="danger">
                    {error}
                  </Text>
                ) : null}
                <KeyboardAwareScrollView>
                  <Input
                    defaultValue={watching?.firstName}
                    label="First Name"
                    onChangeText={val => setValue('firstName', val)}
                    textContentType="name"
                    autoCompleteType="name"
                    status={errors.firstName && 'danger'}
                    caption={errors.firstName?.message}
                    disabled={submitting}
                    mb={2}
                    size="large"
                  />
                  <Input
                    defaultValue={watching?.lastName}
                    label="Last Name"
                    onChangeText={val => setValue('lastName', val)}
                    textContentType="nameSuffix"
                    autoCompleteType="name"
                    status={errors.lastName && 'danger'}
                    caption={errors.lastName?.message}
                    disabled={submitting}
                    mb={2}
                    size="large"
                  />
                  <Input
                    defaultValue={watching?.email}
                    label="Email"
                    onChangeText={val => setValue('email', val)}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    status={errors.email && 'danger'}
                    caption={errors.email?.message}
                    disabled={submitting}
                    mb={2}
                    size="large"
                  />
                  <PhoneNumberInput
                    defaultValue={watching?.phone}
                    label="Phone Number"
                    onChangeText={val => setValue('phone', val)}
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    autoCompleteType="tel"
                    status={errors.phone && 'danger'}
                    caption={errors.phone?.message}
                    disabled={submitting}
                    mb={2}
                    size="large"
                  />
                </KeyboardAwareScrollView>
              </Form>
            ) : (
              <ActivityIndicator
                color={theme['color-primary-500']}
                size="large"
              />
            )}
          </Box>
          <Box width={0.85} mt={5}>
            <Box my={2}>
              <SubmitButton
                size="large"
                shape="circle"
                loading={updateResult.fetching || submitting}
                onPress={handleSubmit(onSubmit)}
                textStyle={{
                  textTransform: 'uppercase',
                }}
                disabled={!profile}>
                Save
              </SubmitButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;

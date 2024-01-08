import React from 'react';
import {Layout} from '@ui-kitten/components';
import Box from 'components/Box';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import useTheme from 'hooks/useTheme';

import getEmergencyContactQuery from 'queries/profile/getEmergencyContact.gql';
import updateEmergencyContactMutation from 'queries/profile/updateEmergencyContact.gql';
import {useQuery, useMutation} from 'urql';
import {ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import Input from 'components/Input';
import * as yup from 'yup';
import useForm from 'react-hook-form';
import Form from 'components/Form';
import SubmitButton from 'components/SubmitButton';
import Text from 'components/Text';

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .max(50)
    .label('Name'),
  phone: yup
    .string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Not a valid phone number',
    )
    .required()
    .label('Phone Number'),
});

const EditEmergency = ({navigation}) => {
  const theme = useTheme();

  const [profileRes, getProfile] = useQuery({
    query: getEmergencyContactQuery,
    requestPolicy: 'cache-and-network',
  });
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(null);
  const [updateResult, onUpdate] = useMutation(updateEmergencyContactMutation);
  const initalValuesSet = React.useRef(false);
  const profile = profileRes?.data?.me;

  const initialValues = React.useMemo(() => {
    if (profile) {
      return {
        name: profile.emergencyContact,
        phone: profile.emergencyContactPhone,
      };
    }
    return null;
  }, [profile]);

  const {
    register,
    formState: {touched},
    setValue,
    handleSubmit,
    errors,
    unregister,
    getValues,
  } = useForm({
    validationSchema: schema,
    defaultValues: initialValues || {},
  });

  React.useEffect(() => {
    const values = getValues();
    if (initialValues && !initalValuesSet.current) {
      Object.keys(initialValues).forEach(
        k => !values[k] && !touched[k] && setValue(k, initialValues[k]),
      );
      initalValuesSet.current = true;
    }
  }, [getValues, initialValues, setValue, touched]);

  React.useEffect(() => {
    register({name: 'name'});
    register({name: 'phone'});
    return () => {
      unregister({name: 'name'});
      unregister({name: 'phone'});
    };
  }, [register, unregister]);

  const onSubmit = React.useCallback(
    form => {
      const data = {
        ...form,
      };
      const update = async () => {
        setError(null);
        setSuccess(false);
        setSubmitting(true);
        const res = await onUpdate({emergencyData: data});
        if (res.data?.updateEmergencyContact?.success) {
          setSuccess(true);
          getProfile({
            requestPolicy: 'network-only',
          });
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
    [onUpdate],
  );

  return (
    <Box flex={1} as={Layout} pb={20}>
      <Box flex={1} as={SafeAreaView} forceInset={{top: 'always'}}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
          ]}
          alignment="center"
          title="Emergency Contact"
          divider
        />
        <Box
          flex={1}
          as={KeyboardAvoidingView}
          px="4"
          pt="4"
          behavior="padding">
          <Box flex={1}>
            {profile ? (
              <Form onSubmit={handleSubmit(onSubmit)}>
                {error ? (
                  <Text category="c1" status="danger" mb="3">
                    {error}
                  </Text>
                ) : null}
                {success && !error ? (
                  <Text category="c1" status="primary" mb="3">
                    Updated!
                  </Text>
                ) : null}
                <Input
                  defaultValue={profile?.emergencyContact}
                  label="Name"
                  onChangeText={val => setValue('name', val)}
                  placeholder="Enter name"
                  status={errors.name && 'danger'}
                  caption={errors.name?.message}
                  disabled={submitting}
                  mb={2}
                />
                <Input
                  defaultValue={profile?.emergencyContactPhone}
                  placeholder="Enter phone number"
                  label="Phone Number"
                  onChangeText={val => setValue('phone', val)}
                  keyboardType="phone-pad"
                  status={errors.phone && 'danger'}
                  caption={errors.phone?.message}
                  disabled={submitting}
                  mb={2}
                />
              </Form>
            ) : (
              <ActivityIndicator
                color={theme['color-primary-500']}
                size="large"
              />
            )}
          </Box>
          <Box mt={5} mb="4">
            <SubmitButton
              gradient
              size="large"
              shape="circle"
              loading={updateResult.fetching || submitting}
              onPress={handleSubmit(onSubmit)}
              disabled={!profile}>
              Save Emergency Contact
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditEmergency;

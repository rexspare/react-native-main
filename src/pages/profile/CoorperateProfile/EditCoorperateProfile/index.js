import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useForm from 'react-hook-form';
import { Layout, CalendarViewModes } from '@ui-kitten/components';
import { useQuery, useMutation } from 'urql';
import { format } from 'date-fns';
import updateProfileMutation from 'queries/profile/updateUser.gql';
import { useLoader } from 'hooks/useLoader';
import useTheme from 'hooks/useTheme';
import { useRegisterFields } from 'hooks/useRegisterFields';
import AuthProvider from 'providers/auth';
import Box from 'components/Box';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import ValidatedInput from 'components/ValidatedInput';
import PhoneNumberInput from 'components/Forms/Fields/PhoneNumberInput';
import Input from 'components/Input';
import Form from 'components/Form';
import SubmitButton from 'components/SubmitButton';
import ProfileImageInput from 'components/ProfileImageInput';
import ManagementTeamField from 'components/Forms/Fields/ManagementTeamField';
import Button from 'components/Button';
import ButtonField from 'components/Forms/Fields/ButtonField';
import Icon from 'components/Icon';
import FormError from 'components/Forms/FormError';
import WorkHoursField from 'components/Forms/Fields/DateTimeRange/WorkHoursField';
import InputLabel from 'components/InputLabel';
import Divider from 'components/Divider';
import Text from 'components/Text';
import BirthCalendar from 'components/Forms/Fields/BirthCalendar';
import {
  schema,
  formatedInitialValues,
  formatUserFormDataToMutation,
} from './schema';
import { getUserProfileQuery, getManagerProfileQuery } from '../schema';
import { styles } from '../Personal/styles';
import { removeFilterObjectFromArray } from 'helpers/array';
import { validateRequiredFields, numericValidator } from 'helpers/validators';
import { formatHours } from 'utils/formatWorkHours';
import { usaDateFormat } from 'constants/dateFormat';
import { input_label_14 } from 'styles/reusable-classes';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const dobMin = new Date(new Date().setFullYear(new Date().getFullYear() - 100));
const dobMax = new Date(new Date().setFullYear(new Date().getFullYear() - 15));

const EditProfile = ({ navigation, userId, userType, route }) => {
  const { logout } = React.useContext(AuthProvider);
  const theme = useTheme();

  const [profileRes] = useQuery({
    query:
      userType == 2
        ? getUserProfileQuery(userType)
        : getManagerProfileQuery(userType),
    pause: !userId,
    variables: { id: userId },
    requestPolicy: 'network-only',
  });
  const [error, setError] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(null);
  const [updateResult, onUpdate] = useMutation(updateProfileMutation);
  const initalValuesSet = React.useRef(false);
  const profile = profileRes?.data?.user;
  const [selectedManagementUser, setSelectedManagementUser] = useState([]);
  const initialValues = React.useMemo(() => formatedInitialValues(profile), [
    profile,
  ]);

  const tabListData = [
    { text: 'Driver licence', value: 'drivingLicense' },
    { text: 'Passport number', value: 'passport' },
    { text: 'SSN', value: 'ssn' },
  ];

  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'birthday',
    'workHours',
    'address',
    'docNumber',
  ];

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
    'birthday',
    'phone',
    'email',
    'workHours',
    'companyName',
    'officeEmail',
    'officeAddress',
    'officePhone',
    'address',
    'userTitle',
    'docNumber',
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
  const { loader } = useLoader({ isLoading: submitting || !profile });

  const onSubmit = React.useCallback(
    async _ => {
      let form = getValues();
      const isFilled = validateRequiredFields(form, requiredFields);
      if (!isFilled) return setError('Please fill all required fields.');
      setError(null);
      setSubmitting(true);
      const userData = formatUserFormDataToMutation(form);
      const res = await onUpdate({ userData: userData, id: profile.pk });
      const success = res.data?.updateUserProfile?.success;
      setSubmitting(false);
      if (success) {
        navigation.goBack();
        route?.params?.onUpdate?.();
        return;
      }
      if (res?.error?.message) {
        setError(res.error.message);
      }
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
          alignment="center"
          title="Edit Profile"
          divider
          style={{ title: { ...typography['body/large – Bold'] } }}
        />
        {loader}
        <Box flex={1} alignItems="center">
          <KeyboardAwareScrollView enableResetScrollToCoords={false}>
            <Box mx={20} mb={68}>
              <Box
                mt={3}
                flex={1.5}
                alignItems="center"
                justifyContent="center">
                <ProfileImageInput
                  value={watching?.picture}
                  onChange={val => setValue('picture', val)}
                  disabled={submitting}
                  name={`${watching?.firstName} ${watching?.lastName}`}
                />
              </Box>
              <Box flex={5} maxWidth={'100%'}>
                <Form loading={submitting} onSubmit={handleSubmit(onSubmit)}>
                  <FormError mt={3} mx={0} my={0} error={error} />
                  <Input
                    defaultValue={`${watching?.firstName} ${watching?.lastName}`}
                    label="Name"
                    onChangeText={val => {
                      let userName = val.split(' ');
                      setValue('firstName', userName[0]);
                      setValue('lastName', userName[1]);
                    }}
                    styles={{ labelIcon: { justifyContent: 'space-between' } }}
                    labelIcon={'information'}
                    autoCompleteType="name"
                    status={errors.firstName && 'danger'}
                    caption={errors.firstName?.message}
                    mb={2}
                    size="large"
                  />
                  <Input
                    defaultValue={watching?.userTitle}
                    label="Title"
                    autoCompleteType="name"
                    status={errors.userTitle && 'danger'}
                    caption={errors.userTitle?.message}
                    styles={{ labelIcon: { justifyContent: 'space-between' } }}
                    labelIcon={'information'}
                    onChangeText={val => setValue('userTitle', val)}
                    mb={2}
                    size="large"
                  />
                  <ValidatedInput
                    label="ID"
                    keyboardType="numeric"
                    defaultValue={watching.docNumber}
                    status={errors.docNumber && 'danger'}
                    caption={errors.docNumber && errors.docNumber.message}
                    onChangeText={val => setValue('docNumber', val)}
                    styles={{ labelIcon: { justifyContent: 'space-between' } }}
                    labelIcon={'information'}
                    validators={[numericValidator]}
                    isUppercase={true}
                    size="large"
                  />
                  <Box mb={15} mt={2}>
                    <Box flexDirection="row" justifyContent="space-between" mb={1}>
                      <InputLabel
                        labelStyle={{
                          ...input_label_14,
                          textTransform: 'none',
                        }}
                        label={'DOB'}
                      />
                      <Text
                        style={{
                          ...typography['body/x-small – regular'],
                          color: colors['gray scale/40'],
                        }}>
                        Prefilled
                      </Text>
                    </Box>
                    <BirthCalendar
                      onSelect={d => { setValue('birthday', d) }}
                      Component={Button}
                      value={watching?.birthday}
                      triggerKey={'onPress'}
                      date={dobMax}
                      inputProps={{
                        icon: Icon('calendar_black', 'pm'),
                        appearance: 'ghost',
                        children: watching?.birthday
                          ? format(watching?.birthday, usaDateFormat)
                          : 'Select Date',
                        textStyle: styles.dateFieldText,
                        style: styles.dateField(theme),
                      }}
                      isRequired
                      size="large"
                    />
                  </Box>
                  <Input
                    defaultValue={watching?.email}
                    label="Personal Email"
                    onChangeText={val => setValue('email', val)}
                    labelIcon={'green-circle-tick'}
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
                    label="Cell Phone"
                    mb={15}
                    defaultValue={watching?.phone}
                    labelIcon={'green-circle-tick'}
                    status={errors.phone && 'danger'}
                    caption={errors.phone && errors.phone.message}
                    value={watching?.phone}
                    onChangeText={val => setValue('phone', val)}
                    size="large"
                  />
                  <Input
                    defaultValue={watching?.address}
                    label="Home Address"
                    onChangeText={val => setValue('address', val)}
                    autoCompleteType="name"
                    labelIcon={'green-circle-tick'}
                    status={errors.address && 'danger'}
                    caption={errors.address?.message}
                    disabled={submitting}
                    mb={2}
                    size="large"
                  />
                  <Divider />
                  <Input
                    defaultValue={watching?.companyName}
                    label="Company Name"
                    labelIcon={'green-circle-tick'}
                    onChangeText={val => setValue('companyName', val)}
                    status={errors.companyName && 'danger'}
                    caption={errors.companyName && errors.companyName?.message}
                    disabled={submitting}
                    mb={2}
                    size="large"
                  />
                  <Input
                    defaultValue={watching?.officeEmail}
                    label="Office Email"
                    labelIcon={'green-circle-tick'}
                    onChangeText={val => setValue('officeEmail', val)}
                    textContentType="emailAddress"
                    autoCompleteType="name"
                    status={errors?.officeEmail && 'danger'}
                    caption={errors?.officeEmail?.message}
                    disabled={submitting}
                    mb={2}
                    size="large"
                  />
                  <PhoneNumberInput
                    label="Office Phone"
                    labelIcon={'green-circle-tick'}
                    mb={15}
                    defaultValue={watching?.officePhone}
                    status={errors?.officePhone && 'danger'}
                    caption={error?.officePhone && errors?.officePhone?.message}
                    value={watching?.officePhone}
                    onChangeText={val => setValue('officePhone', val)}
                    size="large"
                  />
                  <Input
                    defaultValue={watching?.officeAddress}
                    label="Office Address"
                    labelIcon={'green-circle-tick'}
                    onChangeText={val => setValue('officeAddress', val)}
                    autoCompleteType="name"
                    status={errors?.officeAddress && 'danger'}
                    caption={errors?.officeAddress?.message}
                    disabled={submitting}
                    mb={2}
                    size="large"
                  />
                  <WorkHoursField
                    onSelect={(val, week) =>
                      setValue('workHours', formatHours(week, true))
                    }
                    value={formatHours(watching?.workHours)}
                    error={errors?.workHours?.message}
                    isChange={!!watching?.workHours?.length}
                  />
                  <Box my={3} />
                  <ManagementTeamField
                    limit={1}
                    isPlusIcon={true}
                    Component={ButtonField}
                    setValue={val => setSelectedManagementUser(val)}
                    value={selectedManagementUser?.map(user => user)}
                    removeItem={managementUser => {
                      const filteredList =
                        removeFilterObjectFromArray(
                          selectedManagementUser,
                          managementUser?.id,
                          'id',
                        ) || [];
                      setSelectedManagementUser(filteredList);
                    }}
                    navigation={navigation}
                  />
                </Form>
              </Box>
            </Box>
          </KeyboardAwareScrollView>
          <Box
            style={{
              position: 'absolute',
              bottom: 10,
              width: '90%',
            }}>
            <SubmitButton
              loading={updateResult.fetching || submitting}
              onPress={handleSubmit(onSubmit)}
              disabled={!profile}
              size="large"
              textStyle={typography['buttons/large']}>
              SAVE
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;

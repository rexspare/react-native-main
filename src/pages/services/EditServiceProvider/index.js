import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useForm from 'react-hook-form';
import { Layout, Spinner } from '@ui-kitten/components';
import * as yup from 'yup';
import { useMutation, useQuery } from 'urql';
import upsertServiceProviderMutation from 'queries/services/upsertServiceProvider.gql';
import deleteServiceProviderMutation from 'queries/services/deleteServiceProvider.gql';
import getServiceProviderEdit from 'queries/services/getServiceProviderEdit.gql';
import { useForceUpdate } from 'hooks/useForceUpdate';
import Text from 'components/Text';
import Box from 'components/Box';
import Header from 'components/Header';
import SafeAreaView from 'components/SafeAreaView';
import Form from 'components/Form';
import SubmitButton from 'components/SubmitButton';
import Dialog from 'components/Dialog';
import RNFetchBlob from 'rn-fetch-blob';
import LazyScreen from 'utils/LazyScreen';
import EditServiceProviderFields from './EditServiceProviderFields';
import { formatHours } from 'utils/formatWorkHours';
import { transformNumber } from 'helpers/number';
import states from 'constants/states';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const statesFormatted = states.map(s => ({
  key: s.abbreviation,
  title: `${s.abbreviation} - ${s.name}`,
}));

const schema = yup.object().shape({
  picture: yup.lazy(value => {
    let type;
    if (typeof value === 'string') {
      type = yup.string().url();
    } else {
      type = yup
        .object()
        .shape({
          uri: yup.string(),
        })
        .nullable();
    }
    return type.label('Profile Picture').nullable();
  }),
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
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?){1,}$/,
      'Not a valid phone number',
    )
    .required()
    .label('Phone Number'),
  specialty: yup
    .string()
    .max(80)
    .label('Specialty'),
  address: yup
    .string()
    .max(200)
    .required()
    .label('Address'),
  city: yup
    .string()
    .max(50)
    .required()
    .label('City'),
  companyName: yup
    .string()
    .max(50)
    .required()
    .label('Company Name'),
  website: yup
    .string()
    .max(50)
    .required()
    .label('Website'),
  phoneNumberOffice: yup
    .string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?){1,}$/,
      'Not a valid phone number',
    )
    .required()
    .label('Phone Number (Office)'),
  state: yup
    .object()
    .shape({
      key: yup
        .string()
        .oneOf(states.map(s => s.abbreviation))
        .required(),
    })
    .required()
    .label('State'),
  category: yup
    .object()
    .shape({
      id: yup.string().required(),
      name: yup.string().required(),
    })
    .required()
    .label('Category'),
  occupation: yup
    .string()
    .label('Occupation')
    .nullable(),
  hours: yup
    .object()
    .shape()
    .test({
      // TODO add validation for startDay and EndDay to be formatted fine.
      name: 'is-valid-range',
      message: 'Opening time must be before closing time.',
      test: val => {
        if (val !== null) {
          const start = val?.startTime;
          const end = val?.endTime;
          if (start && end) {
            return start < end;
          }
        }
        return true;
      },
    })
    .label('Work Hours')
    .nullable(),
});

const EditServiceProvider = ({ navigation, route }) => {
  const [error, setError] = React.useState(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const providerId = route?.params?.id;
  const [res] = useQuery({
    query: getServiceProviderEdit,
    variables: { id: providerId },
    pause: !providerId,
  });

  const initialValues = React.useMemo(() => {
    const data = res.data?.serviceProvider;
    // To do - handle work hours in here.
    return data
      ? {
          ...data,
          state: statesFormatted.find(s => s.key === data.state),
          picture: data.picture ? { uri: data.picture } : null,
          category:
            data.serviceCategory?.parentCategory || data.serviceCategory,
        }
      : null;
  }, [res.data]);

  const [editRes, executeMutation] = useMutation(upsertServiceProviderMutation);
  const [deleteRes, deleteMutation] = useMutation(
    deleteServiceProviderMutation,
  );

  const isNew = !providerId;

  const {
    register,
    setValue,
    handleSubmit,
    errors,
    unregister,
    watch,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValues || {},
    validationSchema: schema,
  });

  React.useEffect(() => {
    const values = getValues();
    if (initialValues) {
      Object.keys(initialValues).forEach(
        k => !values[k] && setValue(k, initialValues[k]),
      );
    }
  }, [getValues, initialValues, setValue]);

  React.useEffect(() => {
    Object.keys(schema.fields).forEach(name => register({ name }));
    return () => {
      Object.keys(schema.fields).forEach(name => unregister({ name }));
    };
  }, [register, unregister]);

  const watching = watch([
    'firstName',
    'lastName',
    'specialty',
    'phone',
    'email',
    'address',
    'city',
    'state',
    'category',
    'picture',
    'hours',
    'companyName',
    'phoneNumberOffice',
    'occupation',
    'website',
  ]);

  const submitting =
    editRes.fetching || isSubmitting || (!isNew && res.fetching);

  const onSubmit = React.useCallback(
    async form => {
      setError(null);

      const provider = {
        ...form,
        phone: transformNumber(form?.phone),
        phoneNumberOffice: transformNumber(form?.phoneNumberOffice),
        state: form.state?.key,
        serviceCategory: form.category?.id,
        hours: formatHours(form?.hours ?? watching?.hours, true),
      };

      ['picture', 'category'].forEach(k => delete provider[k]);

      if (form.picture?.type) {
        const uri =
          Platform.OS === 'android'
            ? form.picture.uri
            : form.picture.uri.replace('file://', '');
        const data = await RNFetchBlob.fs.readFile(uri, 'base64');
        const rnFile = {
          uri: uri,
          data: data,
          name:
            form.picture.fileName ||
            form.picture.name ||
            `profile:${form?.lastName}-${form?.firstName}`,
        };
        provider.picture = rnFile;
      } else if (provider?.picture) {
        provider.picture = form.picture?.uri;
      }

      const onSuccess = id => {
        route?.params?.onUpdate?.();
        if (isNew) {
          navigation.goBack();
        }
        navigation.navigate('ViewServiceProvider', { id });
      };

      const submit = async () => {
        const upsertRes = await executeMutation({
          provider,
          id: providerId,
        });

        let id;
        if ((id = upsertRes.data?.upsertServiceProvider?.serviceProvider?.id)) {
          onSuccess(id);
        } else {
          setError(
            (upsertRes.error.message || '').replace(
              /\[(Network Error|GraphQL)\]\s*/g,
              '',
            ),
          );
        }
      };
      submit();
    },
    [executeMutation, isNew, navigation, providerId, route, watching],
  );
  const onDelete = React.useCallback(() => {
    const del = async () => {
      const delRes = await deleteMutation({ id: providerId });
      if (delRes.data?.deleteServiceProvider?.success) {
        navigation.navigate('ListServiceProviders', {
          parentCategory: initialValues?.occupation || initialValues?.category,
        });
      } else {
        setError('Failed to delete service provider');
      }
    };
    del();
  }, [deleteMutation, providerId, navigation, initialValues]);

  const [forceUpdate, formUpdateKey] = useForceUpdate();

  useEffect(forceUpdate, [
    watching.category,
    watching.picture,
    error,
    errors,
    watching?.hours,
  ]);

  return (
    <Box as={Layout} flex={1}>
      <Box as={SafeAreaView} flex={1} forceInset={{ top: 'always' }}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
          ]}
          title={isNew ? 'Add Provider' : 'Edit Provider'}
          alignment="center"
          style={{
            title: {
              fontSize: 18,
              fontWeight: '700',
            },
          }}
          divider
        />
        <Box position="relative" pb={40}>
          {submitting ? (
            <Box
              as={Layout}
              opacity={0.6}
              position="absolute"
              zIndex={1}
              left={0}
              top={0}
              right={0}
              bottom={0}
              pt={16}
              alignItems="center"
              justifyContent="flex-start"
              pointerEvents="box-none">
              <Spinner size="giant" />
            </Box>
          ) : null}
          <LazyScreen>
            <KeyboardAwareScrollView enableResetScrollToCoords={false}>
              <Box px={15} pt={30} pb={65}>
                <Form loading={submitting} onSubmit={handleSubmit(onSubmit)}>
                  {error ? (
                    <Box mb="3">
                      <Text category="c1" status="danger">
                        {error}
                      </Text>
                    </Box>
                  ) : null}
                  <EditServiceProviderFields
                    watching={watching}
                    initialValues={initialValues}
                    setValue={setValue}
                    errors={errors}
                    navigation={navigation}
                    submitting={submitting}
                    key={formUpdateKey}
                  />
                </Form>
                <Box mb={15} mt={60}>
                  <SubmitButton
                    size="large"
                    textStyle={{ ...typography['buttons/large'] }}
                    onPress={handleSubmit(onSubmit)}>
                    SAVE
                  </SubmitButton>
                </Box>
                {!isNew && (
                  <SubmitButton
                    onPress={() => setShowDeleteModal(true)}
                    appearance="outline"
                    size="large"
                    marginTop={3}
                    loading={deleteRes.fetching}
                    style={{
                      backgroundColor: '#FFF',
                      borderColor: colors['gray scale/40'],
                      borderRadius: 12,
                    }}
                    textStyle={{
                      ...typography['body/medium – medium'],
                      lineHeight: 20,
                      color: colors['gray scale/40'],
                    }}>
                    REMOVE PROVIDER
                  </SubmitButton>
                )}
              </Box>
            </KeyboardAwareScrollView>
          </LazyScreen>
        </Box>
      </Box>
      <Dialog
        visible={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Remove Provider"
        content="Once you delete this record you won’t be able to undo this action."
        buttons={[
          {
            children: 'Cancel',
            hide: true,
          },
          {
            children: 'OK',
            onPress: onDelete,
            hide: true,
          },
        ]}
      />
    </Box>
  );
};

export const formatWorkHours = ({ startTime, endTime, startDate, endDate }) => {
  let hours = [];
  if (!startDate || !endDate || !startTime || !endTime) return hours;
  let day = startDate.key;
  while (day <= endDate.key) {
    hours.push({
      day,
      start: startTime.toISOString().substr(11),
      end: endTime.toISOString().substr(11),
    });
    day++;
  }
  return hours;
};

export default EditServiceProvider;

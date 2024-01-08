import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation, useQuery } from 'urql';
import viewTenantLeaseQuery from 'queries/tenants/viewTenantLease.gql';
import mutation from 'queries/tenants/addTenant.gql';
import { useLoader } from 'hooks/useLoader';
import { useFormError } from 'hooks/useFormError';
import { useRegisterFields } from 'hooks/useRegisterFields';
import SafeAreaView from 'components/SafeAreaView';
import Form from 'components/Form';
import Box from 'components/Box';
import AddTenantFormField from './AddTenantFormField';
import Button from 'components/Button';
import Text from 'components/Text';
import {
  formatTenantFormDataToMutation,
  formatedInitialValues,
  schema,
} from './schema';
import LazyScreen from 'utils/LazyScreen';
import { validateRequiredFields } from 'helpers/validators';
import { styles } from './styles.js';

const requiredFields = [
  'firstName',
  'lastName',
  'email',
  'phoneNumberCell',
  'dataOfBirth',
];

const phoneNumbers = [
  "phoneNumberCell",
  "phoneNumberWork",
  "previousReferencePhone",
  "previousReferencePhone",
  "emergencyContactPhone"
]

const AddTenant = ({
  navigation,
  route,
  onSuccess = (tenant, isNew) => {
    if(isNew){
      navigation.navigate('AddTenantsUnit', { tenantId: tenant?.pk })
    }
    else {
      route?.params?.onUpdate?.(true);
      navigation?.navigate('ViewTenant', { refreshOnFocus: true });
    }
  },
}) => {
  const [scrollView, setScrollView] = useState({});
  const { error, setError } = useFormError({ scrollView });
  const tenantId = route?.params?.id;

  const [res] = useQuery({
    query: viewTenantLeaseQuery,
    variables: {
      id: tenantId,
      tenantTab: false,
      unitTab: false,
      documentsTab: false,
      activityTab: false,
    },
    pause: !tenantId,
  });

  const initialValues = React.useMemo(() => {
    const tenant = res?.data?.lease?.tenant;
    if (tenant) {
      const vals = formatedInitialValues(tenant);
      phoneNumbers.forEach((key)=>{
        vals[key] = vals[key]?.split('+')[1];
      })
      return vals;
    }
    return null;
  }, [res.data]);

  const isNew = !tenantId;
  const [editRes, addTenantMutation] = useMutation(mutation);
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
      Object.keys(initialValues).forEach(k => !values[k] && setValue(k, initialValues[k]));
    }
  }, [getValues, initialValues, setValue]);

  useRegisterFields(Object.keys(schema.fields), register, unregister);

  const watching = watch([
    'firstName',
    'lastName',
    'email',
    'phoneNumberCell',
    'phoneNumberWork',
    'dataOfBirth',
    'currentAddress',
    'currentReferenceName',
    'currentReferencePhone',
    'previousAddress',
    'previousReferenceName',
    'previousReferencePhone',
    'docType',
    'docNumber',
    'occupation',
    'emergencyContact',
    'picture',
    'emergencyContactPhone',
  ]);
  const submitting =
    editRes.fetching || isSubmitting || (!isNew && res.fetching);

  const onSubmit = React.useCallback(
    async _ => {
      let form = getValues();
      const isFilled = validateRequiredFields(form, requiredFields);
      if (!isFilled) return setError('Please fill all required fields.');
      setError(null);
      const tenant = await formatTenantFormDataToMutation(form);
      const response = await addTenantMutation(
        { data: tenant, id: res?.data?.lease?.tenant?.pk },
        { requestPolicy: 'network-only' },
      );
      const tenantId = response?.data?.upsertTenant?.tenant?.pk;
      if (tenantId) return onSuccess(response?.data?.upsertTenant?.tenant, isNew);
      setError(
        (response.error.message || '').replace(
          /\[(Network Error|GraphQL)\]\s*/g,
          '',
        ),
      );
    },
    [addTenantMutation, isNew, navigation, route, handleSubmit, setError],
  );
  const { loader, isLoading } = useLoader({ isLoading: submitting });

  return (
    <LazyScreen>
      <Box as={SafeAreaView} flex={1}>
        {loader}
        <KeyboardAwareScrollView
          enableResetScrollToCoords={false}
          innerRef={setScrollView}>
          <Box px={15} pt={3}>
            <Form loading={submitting} onSubmit={handleSubmit(onSubmit)}>
              {error && (
                <Text category="c1" status="danger">
                  {error}
                </Text>
              )}
              <AddTenantFormField
                errors={errors}
                watching={watching}
                setValue={setValue}
                submitting={submitting}
              />
              <Button
                style={styles.saveButton}
                textStyle={styles.saveButtonText}
                onPress={onSubmit}>
                {isNew ? "Next" : "Submit"}
              </Button>
            </Form>
          </Box>
        </KeyboardAwareScrollView>
      </Box>
    </LazyScreen>
  );
};

export default AddTenant;

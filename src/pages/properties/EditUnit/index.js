import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';
import upsertUnitMutation from 'queries/properties/upsertUnit.gql';
import getUnitQuery from 'queries/properties/getUnit.gql';
import manualLeaseMutation from 'queries/properties/Lease/ManualLeaseMutation.gql';
import { useFormError } from 'hooks/useFormError';
import { useLoader } from 'hooks/useLoader';
import { useRegisterFields } from 'hooks/useRegisterFields';
import { useMutation, useQuery } from 'urql';
import { removeObjectFromArray } from 'helpers/array.js';
import LazyScreen from 'utils/LazyScreen';
import FormError from 'components/Forms/FormError';
import Box from 'components/Box';
import Form from 'components/Form';
import SupportModal from 'components/SupportModal';
import HeadedScreen from 'components/HeadedScreen';
import EditUnitFormActions from './EditUnitFormActions';
import EditUnitFormFields from './EditUnitFormFields';
import {
  formatUnitFieldsOnSubmit,
  formatUnitInitialValueFields,
  formatUnitLeaseData,
  schema,
  UNIT_FIELDS_WATCHING,
  UNIT_REQUIRED_FIELDS,
} from './schema';
import { validateRequiredFields } from 'helpers/validators';
import { getActions } from 'constants/actions';
import { typography } from 'styles/typography';

const watchingFields = UNIT_FIELDS_WATCHING;
const requiredFields = UNIT_REQUIRED_FIELDS;

const EditUnit = ({ navigation, route }) => {
  const unitId = route?.params?.id;
  const building = route?.params?.building;

  const [scrollRef, setScrollRef] = useState();
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [unitCreated, setUnitCreated] = useState(false);
  const [draftData, setDraftData] = useState([]);
  const { error, setError } = useFormError({ scrollView: scrollRef });
  const [isFormValid, setIsFormValid] = useState();
  const [res] = useQuery({
    query: getUnitQuery,
    variables: { id: unitId },
    pause: !unitId,
  });

  const initialValues = React.useMemo(() => {
    const data = route?.params?.editData?.draftItem ? route?.params?.editData : res.data?.unit;
    const buildingData = data?.building || building;
    return data
      ? formatUnitInitialValueFields(data, buildingData)
      : { building };
  }, [building, res.data]);

  const [editRes, executeMutation] = useMutation(upsertUnitMutation);
  const [addLeaseRes, addLeaseMutation] = useMutation(manualLeaseMutation);

  const isNew = !unitId;

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
  const { loader, setIsLoading, isLoading } = useLoader();

  React.useEffect(() => {
    const values = getValues();
    if (initialValues) {
      Object.keys(initialValues).forEach(
        k => !values[k] && setValue(k, initialValues[k]),
        );
      }
    }, [getValues, initialValues, setValue]);

  useRegisterFields(Object.keys(schema.fields), register, unregister);
  const watching = watch(watchingFields);

  const submitting =
    editRes.fetching || isSubmitting || (!isNew && res.fetching);

  const addManualLease = async (lease, unitId) => {
    const res = await addLeaseMutation({ ...lease, unitId });
    if (!res?.data?.lease?.id) return setError('Error Uploading Lease');
    return res;
  };

  const onComplete = id => {
    Toast.show({
      type: 'success1',
      text1: 'Success',
      text2: !isNew
        ? 'Unit information is updated.'
        : 'Successfully added the unit.',
      props: {
        buttons: [{ children: 'OK', onPress: () => Toast.hide() }],
        styles: { text1: { textTransform: 'uppercase' } },
      },
    });
    navigation.navigate('ViewUnit', { id });
  };

  const showErrorPopup = () => {
    Toast.show({
      type: 'error1',
      text1: 'Error',
      text2: !isNew
        ? 'Unit information can’t be updated.'
        : 'Can’t add the unit.',
      props: {
        buttons: [
          {
            children: 'TRY AGAIN',
            onPress: () => {
              Toast.hide();
              onSubmit();
            },
          },
        ],
        styles: { text1: { textTransform: 'uppercase' } },
      },
    });
  };

  const parseData = async () => {
    const unitDrafts = await AsyncStorage.getItem('unitDrafts');
    const units = JSON.parse(unitDrafts);
    units && setDraftData(units);
  };

  const addUnitDraft = async () => {
    route?.params?.onUpdate?.(true);
    (route?.params?.editData?.draftItem || !route?.params?.editData) && await AsyncStorage.setItem('unitDrafts', JSON.stringify([...removeObjectFromArray(draftData, route?.params?.editData?.draftId, 'draftId'), { ...watching, draftId: draftData?.length + 1, draftItem: true }]));
    route?.params?.updateDraft && route?.params?.updateDraft({ ...watching, draftId: draftData?.length + 1, draftItem: true });
    
  }

  const handleDraft = async (removeDraft, unitCreated) => {
    const addDraft = Object.keys(watching).filter((key) => {
      if (key != 'state' && watching[key]) {
        return true
      }
    });
    if (addDraft?.length > 0 && !removeDraft && !unitCreated) {
      addUnitDraft();
    } else if (removeDraft || unitCreated) {
      route?.params?.onUpdate?.(true);
      await await AsyncStorage.setItem('unitDrafts', JSON.stringify([...removeObjectFromArray(draftData, route?.params?.editData?.draftId, 'draftId')]));
    }
  };

  useEffect(() => {
    parseData();
  }, []);

  useEffect(() => {
    const isValid = validateRequiredFields(watching, requiredFields);
    setIsFormValid(isValid);
    return () => {
      handleDraft(false, unitCreated);
    }
  }, [watching, unitCreated]);

  const onSubmit = React.useCallback(
    _ => {
      try {
        setIsLoading(true);
        setError(null);
        let form = getValues();
        const unit = formatUnitFieldsOnSubmit(form);
        const submit = async () => {
          const isValid = validateRequiredFields(form, requiredFields);
          if (!isValid) return setError('Fill required fields');
          const upsertRes = await executeMutation({ unit, id: unitId });
          setUnitCreated(true);
          handleDraft(true);
          route?.params?.onUpdate?.(true);
          if (!!upsertRes.error) {
            setIsLoading(false);
            return setError(upsertRes.error.message);
          }
          const unitRes = upsertRes.data?.upsertUnit?.unit;
          let id = unitRes?.id;
          if (!id) return setIsLoading(false);
          if (!form?.lease) {
            if (!unitRes?.error) {
              return onComplete(id);
            } else {
              setIsLoading(false);
              showErrorPopup();
              setError(
                (res.error.message || '').replace(
                  /\[(Network Error|GraphQL)\]\s*/g,
                  '',
                ),
              );
            }
          }
          const leaseData = formatUnitLeaseData(form);
          await addManualLease(leaseData, unitRes?.pk);
          onComplete(id);
        };
        submit();
      } catch (e) {
        setIsLoading(false);
        showErrorPopup();
      }
    },
    [executeMutation, isNew, navigation, route, unitId, handleSubmit, setError],
  );

  return (
    <>
      {loader}
      <HeadedScreen
        header={`${isNew ? 'Add New' : 'Edit'} Unit`}
        headerStyle={{ title: { ...typography['body/large – Bold'] } }}
        actions={getActions(
          ['back', { fill: '#000', onPress: () => navigation.goBack() }],
          [
            'questionCircle',
            { onPress: () => setIsSupportOpen(true), fill: '#000' },
          ],
        )}
        divider>
        <Box position="relative">
          <LazyScreen>
            <KeyboardAwareScrollView
              innerRef={setScrollRef}
              enableResetScrollToCoords={false}>
              <FormError px={15} mt={3} error={error} maxWidth="100%" />
              <Box mt={'-25'} px={15}>
                <Form loading={submitting} onSubmit={handleSubmit(onSubmit)}>
                  <EditUnitFormFields
                    watching={watching}
                    setValue={setValue}
                    errors={errors}
                    isNew={isNew}
                    initialValues={initialValues}
                    key={
                      [
                        ...(watching?.photos || []),
                        ...Array(watching?.status || 0),
                      ].length
                    }
                  />
                  <EditUnitFormActions
                    unitId={unitId}
                    onSubmit={onSubmit}
                    isNew={isNew}
                    isFormValid={isFormValid}
                    isLoading={isLoading}
                  />
                </Form>
              </Box>
            </KeyboardAwareScrollView>
          </LazyScreen>
        </Box>
      </HeadedScreen>
      <SupportModal
        isOpen={isSupportOpen}
        onHide={() => setIsSupportOpen(false)}
      />
    </>
  );
};

export default EditUnit;

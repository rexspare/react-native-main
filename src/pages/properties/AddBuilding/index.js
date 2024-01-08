import React, { useMemo, useRef, useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-community/async-storage';
import { compact } from 'lodash';
import { useMutation, useQuery } from 'urql';
import UpsertBuilding from 'queries/properties/upsertProperty.gql';
import NYCdata from 'queries/properties/fetchAutomatedFields.gql';
import getManagementCompanyEmployees from 'queries/properties/getAllManagementUsers.gql';
import { useLoader } from 'hooks/useLoader.js';
import useRole from 'hooks/useRole.js';
import { useForm } from 'hooks/useForm.js';
import Button from 'components/Button';
import Box from 'components/Box';
import HeadedScreen from 'components/HeadedScreen/index.js';
import FormError from 'components/Forms/FormError/index.js';
import Divider from 'components/Divider';
import Text from 'components/Text/index.js';
import SupportModal from 'components/SupportModal';
import ManualBuildingFields from './ManualBuildingFields/index.js';
import AdditionalBuildingFields from './AdditionalBuildingFields/index.js';
import AutomatedBuildingFields from './AutomatedBuildingFields';
import {
  formatBuildingFormData,
  formatBuildingInitialValues,
  getExpandableFieldDetails,
  formatInitialAutomatedFieldValues,
} from './helper.js';
import { chain } from 'helpers/func.js';
import { validateRequiredFields } from 'helpers/validators';
import { removeObjectFromArray } from 'helpers/array.js';
import { getActions } from 'constants/actions.js';
import { styles } from './styles.js';

const staticRequiredFields = [
  'address',
  'state',
  'city',
  'propertyType',
  'neighbourhood',
  'zip',
  'owner',
];
const AddBuilding = ({ navigation, route }) => {
  const [automatedFields, setAutomatedFields] = useState([]);
  const [shouldFetchBuildingData, setShouldFetchBuildingData] = useState(false);
  const [buildingCreated, setBuildingCreated] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [param, setParams] = useState({});
  const [fetchedDataError, setFetchedDataError] = useState('');
  const [isFetchedData, setIsFetchedData] = useState();
  const [formattedAutoFieldData, setFormattedAutoFieldData] = useState();
  const [draftData, setDraftData] = useState([]);
  const { loader, startLoading, stopLoading } = useLoader();
  const { isLandlord, user } = useRole();
  const scrollRef = useRef();
  const [_, addBuilding] = useMutation(UpsertBuilding);
  const { editData, onUpdate } = route?.params;
  const automatedFieldsRef = useRef([]);

  const [managementUserRes, fetchManagementUsers] = useQuery({
    query: getManagementCompanyEmployees,
  });

  const onSuccess = chain([
    () =>
      Toast.show({
        type: 'success1',
        text1: 'Success',
        text2: editData
          ? 'Building information is updated.'
          : 'Successfully added building.',
        props: {
          buttons: [{ children: 'OK', onPress: () => Toast.hide() }],
          styles: { text1: { textTransform: 'uppercase' } },
        },
      }),
    () =>
      editData && !editData?.draftItem
        ? navigation.navigate('ViewProperty', {
          id: editData?.id,
          refresh: true,
        })
        : navigation.navigate('PropertiesTabs', { refresh: true, }),
  ]);

  const initialData = useMemo(
    () => ({
      ...route?.params?.editData,
      owner: isLandlord ? user : route?.params?.editData?.owner,
    }),
    [isLandlord, route.params?.editData],
  );

  const requiredFields = useMemo(
    () =>
      compact([
        ...staticRequiredFields,
        !isLandlord && 'managementTeamMembers',
      ]),
    [isLandlord],
  );

  const {
    setValue,
    setError,
    form,
    error,
    handleSubmit,
    validationState,
    onValidationChange,
  } = useForm({
    initialValues: () => {
      setAutomatedFields(getExpandableFieldDetails(initialData.automatedData));
      return formatBuildingInitialValues(initialData);
    },
    validateOnSubmit: false,
    requiredFields,
    onSubmit: vals => createBuilding(vals, managementUserRes),
    scrollViewRef: scrollRef?.current,
  });

  const showErrorPopup = () => {
    Toast.show({
      type: 'error1',
      text1: 'Error',
      text2: editData
        ? 'Building information can’t be updated.'
        : 'Can’t add the building.',
      props: {
        buttons: [
          {
            children: 'TRY AGAIN',
            onPress: () => {
              Toast.hide();
              handleSubmit();
            },
          },
        ],
        styles: { text1: { textTransform: 'uppercase' } },
      },
    });
  };

  const parseData = async () => {
    const buildingDrafts = await AsyncStorage.getItem('buildingDrafts');
    const buildings = JSON.parse(buildingDrafts);
    buildings && setDraftData(buildings);
  };

  const addBuildingDraft = async (automatedFields) => {
    const formattedData = {};
    automatedFields.forEach(item => {
      if (item.value !== undefined) {
        formattedData[item.key] = item.value;
      }
    })
    onUpdate?.(true);
    (route?.params?.editData?.draftItem || !route?.params?.editData) &&
      (await AsyncStorage.setItem(
        'buildingDrafts',
        JSON.stringify([
          ...removeObjectFromArray(draftData, initialData?.draftId, 'draftId'),
          { ...form, automatedData: formattedData, draftId: draftData?.length + 1, draftItem: true },
        ]),
      ));
    route?.params?.updateDraft &&
      route?.params?.updateDraft({
        ...form,
        automatedData: formattedData,
        draftId: draftData?.length + 1,
        draftItem: true,
      });
  };

  const handleDraft = async (removeDraft, buildingCreated, automatedFields) => {
    const addDraft = Object.keys(form).filter(key => {
      if (key != 'state' && form[key]) {
        return true;
      }
    });
    if (addDraft?.length > 0 && !removeDraft && !buildingCreated) {
      addBuildingDraft(automatedFields);
    } else if (removeDraft) {
      onUpdate?.(true);
      await AsyncStorage.setItem(
        'buildingDrafts',
        JSON.stringify([
          ...removeObjectFromArray(draftData, initialData?.draftId, 'draftId'),
        ]),
      );
    }
  };

  const [res, refetch] = useQuery({
    query: NYCdata,
    variables: { zip: form.zip, staddr: form.address },
  });

  useEffect(() => {
    parseData();
  }, []);

  useEffect(() => {
    const isValid = validateRequiredFields(form, requiredFields);
    setIsDisabled(isValid);
    return () => {
      handleDraft(false, buildingCreated, getExpandableFieldDetails(res?.data));
    };
  }, [form, buildingCreated, res]);



  useEffect(() => {
    setParams(param);
  }, [param]);

  useEffect(() => {
    const fetchedData = getExpandableFieldDetails(res?.data);
    const data = fetchedData?.find(option => option.value !== null);
    setIsFetchedData(data ? true : false);
    if (res?.data?.fetchBuildingData) {
      if (!editData) {
        setAutomatedFields(fetchedData);
      }
      setFetchedDataError('');
    } else {
      setFetchedDataError('No data found with this Address and Zip Code ');
    }
    if (editData?.id && !res?.data?.fetchBuildingData) {
      setAutomatedFields(getExpandableFieldDetails(initialData.automatedData));
    }
  }, [res.data, isFetchedData]);

  useEffect(() => {
    const formattedData = formatInitialAutomatedFieldValues(automatedFields);
    setFormattedAutoFieldData(formattedData);
  }, [automatedFields]);

  useEffect(() => {
    if (
      (param?.zip && param?.address) ||
      (param?.zip && initialData?.building?.address) ||
      (initialData?.building?.zip && param?.address)
    ) {
      refetch();
    }
  }, [param.zip, param.address]);

  useEffect(() => {
    const fetchedData = getExpandableFieldDetails(formattedAutoFieldData);
    automatedFieldsRef.current = fetchedData;
  }, [formattedAutoFieldData]);

  useEffect(() => {
    if (res?.data?.fetchBuildingData) {
      if (!editData) {
        const fetchedData = getExpandableFieldDetails(res?.data);
        setAutomatedFields(fetchedData);
      }
    }
  }, [isFetchedData, editData]);

  const createBuilding = async (form, managementUserRes) => {
    startLoading();
    try {
      const building = formatBuildingFormData(form, managementUserRes);
      const data = automatedFieldsRef.current.find(
        option => option.value !== null,
      );
      const automatedFieldsData = automatedFieldsRef.current;
      const formattedData = formatInitialAutomatedFieldValues(
        automatedFieldsData,
      );
      let result;
      if (data) {
        result = await addBuilding({
          building: building,
          id: editData?.id,
          automatedData: formattedData,
        });
      } else {
        if (editData && !data) {
          result = await addBuilding({
            building,
            id: editData?.id,
            isAutomatedData: false,
          });
        } else {
          result = await addBuilding({
            building,
            isAutomatedData: false,
          });
        }
      }
      if (!result?.error && !!result) {
        setBuildingCreated(true);
        onUpdate?.(true);
        handleDraft(true);
        onSuccess();
      } else {
        showErrorPopup();
        setError(
          (result?.error?.message || '').replace(
            /\[(Network Error|GraphQL)\]\s*/g,
            '',
          ),
        );
      }
    } catch (e) {
      showErrorPopup();
    } finally {
      stopLoading();
    }
  };

  const handleAutoFetchData = () => {
    const { city, state, address } = form;
    if (city && state && address) setShouldFetchBuildingData(true);
    if (editData) setShouldFetchBuildingData(true);
  };

  const handleFetchNYChData = params => {
    if (params) {
      setValue('zip', params?.zip);
      setValue('address', params?.address);
      setParams(params);
    }
  };

  useEffect(() => {
    const initialAutomatedFields = formatInitialAutomatedFieldValues(editData);
    const formatted = getExpandableFieldDetails(initialAutomatedFields);
    setAutomatedFields(formatted);
  }, [editData, param.zip, param.address]);

  return (
    <>
      <HeadedScreen
        actions={getActions(
          ['back', { onPress: () => navigation.goBack() }],
          [
            'questionCircle',
            { onPress: () => setIsSupportOpen(true), fill: '#000' },
          ],
        )}
        title={editData ? 'Edit Building' : 'Add New Building'}
        headerStyle={styles.header}
        contentContainerProps={{ as: ScrollView, ref: scrollRef }}
        divider>
        {loader}
        <Box style={styles.textInputFieldsContainer}>
          {error || validationState?.automatedFields?.validationMessage ? (
            <FormError
              mb={1}
              error={
                error || validationState?.automatedFields?.validationMessage
              }
              mx={null}
              mt={3}
            />
          ) : null}
          <Box pb={15} mt={3}>
            <Text style={styles.textTitle}>
              Fill in zip code & address to automate other information from New
              York database API
            </Text>
          </Box>
          <ManualBuildingFields
            form={form}
            setValue={setValue}
            handleAutoFetchData={handleAutoFetchData}
            editing={!!editData}
            owner={editData?.owner}
            handleFetchNYChData={handleFetchNYChData}
            error={fetchedDataError}
          />
          <AutomatedBuildingFields
            fields={automatedFields}
            setFields={setFormattedAutoFieldData}
            setShouldFetch={setShouldFetchBuildingData}
            shouldFetch={shouldFetchBuildingData}
            onValidationChange={onValidationChange}
            buildingAddress={{
              city: form?.city,
              streetAddress: form?.address,
              state: form?.state,
            }}
            zip={res?.data?.fetchBuildingData ? form.zip : null}
            form={formattedAutoFieldData}
          />
          <Divider mt={4} mb={3} />
          <AdditionalBuildingFields
            form={form}
            setValue={setValue}
            isLandlord={isLandlord}
            navigation={navigation}
            managersList={managementUserRes?.data?.managementUsers?.edges || []}
          />
        </Box>
        <Button
          disabled={!isDisabled}
          style={[styles.saveButton, !isDisabled && styles.disableSaveButton]}
          textStyle={{ fontSize: 16, fontWeight: '500' }}
          onPress={handleSubmit}>
          SAVE BUILDING
        </Button>
      </HeadedScreen>
      <SupportModal
        isOpen={isSupportOpen}
        onHide={() => setIsSupportOpen(false)}
      />
    </>
  );
};

export default AddBuilding;

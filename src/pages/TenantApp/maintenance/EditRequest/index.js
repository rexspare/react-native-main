import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import useForm from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNFetchBlob from 'rn-fetch-blob';
import * as yup from 'yup';
import { Layout, Spinner } from '@ui-kitten/components';
import { useQuery, useMutation } from 'urql';
import viewMaintenanceRequestQuery from 'queries/tasks/viewMaintenanceRequest.gql';
import upsertMaintenanceRequestMutation from 'queries/tasks/upsertMaintenanceRequest.gql';
import { formatImageToFileInput } from 'components/Forms/Tasks/helpers';
import Box from 'components/Box';
import Input from 'components/Input';
import SelectInputForward from 'components/SelectInput';
import Form from 'components/Form';
import HeadedScreen from 'components/HeadedScreen';
import FormError from 'components/Forms/FormError';
import MultiSelectBoxes from 'components/Forms/Fields/MultiSelectBoxes';
import Divider from 'components/Divider';
import YesNoInput from 'components/YesNoInput';
import Button from 'components/SubmitButton';
import SelectModal from 'components/selectModal';
import Icon from 'components/Icon';
import GalleryInput from 'components/Forms/Fields/GalleryInput';
import Text from 'components/Text';
import SelectButton from 'components/SelectButtonInput/SelectButton';
import DateField from 'components/Forms/Fields/DateField';
import { parseDate } from 'utils/exchanges';
import {
  TASK_PRIORITY,
  MAINTENANCE_SERVICES_OPTIONS,
  AREA_OPTIONS,
  MAINTENANCE_TIME_PREFERENCES_OPTIONS,
} from 'constants/enums';
import GreyCalendar from 'img/icons/calendar_grey.svg';
import ServiceIcon from 'img/icons/services-tenant.svg';
import styled from 'styled-components/native';
import { colors } from 'styles/theme';
import { style } from '../style';
import { typography } from 'styles/typography';

export const TaskSelectInput = styled(SelectInputForward).attrs(
  ({ theme, touched }) => ({
    textStyle: {
      color: theme['grey-400'],
      paddingVertical: 8,
      borderBottomWidth: 2,
      borderBottomColor: touched
        ? theme['color-primary-500']
        : theme['grey-100'],
    },
    icon: 'arrow-ios-downward',
  }),
)`
  background-color: transparent;
`;

const schema = yup.object().shape({
  content: yup
    .string()
    .required()
    .label('Description'),
  location: yup
    .string()
    .required()
    .label('Location'),
  additionalDetails: yup.string().label('Additional Details'),
  service: yup
    .string()
    .nullable()
    .label('Reminder'),
  priority: yup
    .number()
    .required()
    .oneOf(Object.values(TASK_PRIORITY))
    .label('Priority'),
  timePreference: yup.array().label('Time Preference'),
  enterPermission: yup
    .boolean()
    .default(false)
    .required()
    .label('Permission to enter'),
  files: yup
    .array()
    .of(
      yup.object().shape({
        uri: yup.string().required(),
        type: yup.string(),
      }),
    )
    .default([])
    .label('Attachments'),
  date: yup.date().label('date'),
});

const EditTask = ({ navigation, route }) => {
  const requestId = route?.params?.id;
  const isNew = !requestId;
  const [error, setError] = React.useState(null);
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [openAreaModal, setOpenAreaModal] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);
  const [selectedTimeOptions, setSelectedTimeOptions] = useState([]);
  const [otherModalOpen, setOtherModalOpen] = useState(false);

  const initialValuesSet = React.useRef(false);

  const [res] = useQuery({
    query: viewMaintenanceRequestQuery,
    variables: {
      id: requestId,
      pause: !requestId,
    },
    requestPolicy: 'network-only',
  });

  const [editRes, executeMutation] = useMutation(
    upsertMaintenanceRequestMutation,
  );

  const initialValues = React.useMemo(() => {
    const data = res.data?.maintenanceRequest;
    if (!data) return { files: [] };

    initialValuesSet.current = false;

    return {
      ...data,
      date: parseDate(data?.date),
      content: data.task?.content,
      priority: data.task?.priority,
      files: (data.task?.files ?? []).map(f => ({
        id: f.id,
        uri: f.url,
        type: f.fileType,
        name: f.url.split('/')[f.url.split('/').length - 1],
      })),
    };
  }, [res.data]);

  const onAddFiles = async files => {
    const newFiles = files.filter(file =>
      watching.files.every(f => f?.uri !== file?.uri),
    );
    const newData = [];
    let itemsProcessed = 0;
    newFiles.forEach(async element => {
      const base64 = await RNFetchBlob.fs.readFile(element.uri, 'base64');
      newData.push({ ...element, data: base64 });
      itemsProcessed++;
      if (itemsProcessed === newFiles.length) {
        setValue('files', [...watching.files, ...newData]);
      }
    });
  };

  const {
    register,
    setValue,
    handleSubmit,
    errors,
    unregister,
    watch,
    getValues,
    formState: { isSubmitting, touched },
  } = useForm({
    defaultValues: initialValues || {},
    validationSchema: schema,
  });

  const watching = watch([
    'service',
    'location',
    'enterPermission',
    'timePreference',
    'priority',
    'files',
    'date',
  ]);

  React.useEffect(() => {
    const values = getValues();
    if (initialValues && !initialValuesSet.current) {
      Object.keys(initialValues).forEach(k => setValue(k, initialValues[k]));
      initialValuesSet.current = true;
    }
  }, [getValues, initialValues, setValue, touched]);

  useEffect(() => {
    if (watching?.timePreference) {
      setSelectedTimeOptions(watching?.timePreference);
    }
  }, [watching?.timePreference]);

  React.useEffect(() => {
    Object.keys(schema.fields).forEach(name => register({ name }));
    return () => {
      Object.keys(schema.fields).forEach(name => unregister({ name }));
    };
  }, [register, unregister]);

  const onSubmit = useCallback(
    form => {
      setError(null);
      const request = {
        ...form,
      };
      request.files = (form.files || []).map(f => formatImageToFileInput(f));
      const submit = async () => {
        const upsertRes = await executeMutation({
          requestData: request,
          id: requestId,
        });
        let id;
        if (
          (id =
            upsertRes.data?.upsertMaintenanceRequest?.maintenanceRequest?.id)
        ) {
          route?.params?.onUpdate?.();
          if (isNew) {
            navigation.navigate('ViewRequest', { id });
          } else navigation.goBack();
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
    [executeMutation, isNew, navigation, requestId, route],
  );

  const submitting =
    editRes.fetching || isSubmitting || (!isNew && res.fetching);

  const onServiceNeeded = val => {
    if (val) {
      if (val.id === MAINTENANCE_SERVICES_OPTIONS?.length - 1) {
        setOtherModalOpen(true);
      } else {
        if (watching.service === val?.text) {
          setValue('service', null);
        } else {
          setValue('service', val?.text);
          setOpenServiceModal(false);
        }
      }
    }
  };

  const onAddArea = val => {
    if (val) {
      if (val.id === AREA_OPTIONS?.length - 1) {
        setOtherModalOpen(true);
      } else {
        if (watching.location === val?.text) {
          setValue('location', null);
        } else {
          setValue('location', val?.text);
          setOpenAreaModal(false);
        }
      }
    }
  };

  const onAddTimePreference = val => {
    if (
      !!selectedTimeOptions?.find(e => e === val?.id) ||
      selectedTimeOptions?.find(e => e === val?.id) === 0
    ) {
      const arr = [...selectedTimeOptions];
      arr.splice(arr.indexOf(val?.id), 1);
      setValue('timePreference', arr);
      setSelectedTimeOptions(arr);
    } else if (selectedTimeOptions?.length < 3) {
      const arr = [...selectedTimeOptions, val?.id].sort((a, b) => {
        return a - b;
      });
      setSelectedTimeOptions(arr);
      setValue('timePreference', arr);
    }
  };

  const handleCloseModal = () => {
    if (otherModalOpen) {
      setOpenServiceModal(false);
      setOpenAreaModal(false);
    } else {
      setOpenServiceModal(false);
      setOpenAreaModal(false);
    }
  };

  const openSelectModal = type => {
    setOtherModalOpen(false);
    if (type === 'area') {
      setOpenAreaModal(true);
    } else if (type === 'service') {
      setOpenServiceModal(true);
    } else {
      setOpenTimeModal(true);
    }
  };

  const ModalButton = ({
    title,
    children,
    onPress,
    isSelected,
    buttonText,
  }) => {
    return (
      <Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <Text style={[style.labelStyle, { marginBottom: 10 }]}>{title}</Text>
          {isSelected && (
            <SelectButton
              isChange={true}
              chooseBtnText={'SELECT'}
              changeBtnText={'SELECT'}
              onPress={onPress}
              displayChange={true}
              isPlusIcon={false}
              isSelected={true}
            />
          )}
        </Box>
        {isSelected ? (
          children
        ) : (
          <Button
            appearance="ghost"
            style={{
              borderWidth: 1,
              borderColor: colors['primary/50 – brand'],
              borderRadius: 12,
            }}
            onPress={onPress}
            textStyle={{
              textTransform: 'uppercase',
              fontSize: 16,
              fontWeight: '500',
            }}>
            {buttonText}
          </Button>
        )}
      </Box>
    );
  };

  return (
    <HeadedScreen
      title={`${isNew ? 'New Maintenance' : 'Edit'} Request`}
      actions={[
        {
          left: true,
          icon: 'arrow-ios-back',
          onPress: () => navigation.goBack(),
        },
      ]}
      style={{
        title: {
          fontWeight: 'bold',
        },
      }}
      divider>
      <Box px="2" position="relative" flex={1}>
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
            justifyContent="center"
            pointerEvents="box-none">
            <Spinner size="giant" />
          </Box>
        ) : null}
        <KeyboardAwareScrollView>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Box px="3">
              <FormError error={error} />
              <ModalButton
                title={'Service Needed'}
                onPress={() => openSelectModal('service')}
                isSelected={!!watching?.service}
                buttonText="Select from list">
                <Box flexDirection="row" alignItems="center">
                  <Box style={style.serviceIconContainer}>
                    <ServiceIcon width="20" height="20" />
                  </Box>
                  <Text style={style.serviceText}>{watching?.service}</Text>
                </Box>
              </ModalButton>
              <Box mb="30" mt={3}>
                <MultiSelectBoxes
                  label={'Priority Level'}
                  values={{ ...TASK_PRIORITY }}
                  value={watching.priority}
                  onPress={val => setValue('priority', val)}
                  styles={style.multiselect}
                />
              </Box>
              <Divider mb={20} />
              <Input
                label="DESCRIPTION"
                multiline
                icon={Icon('expandInput', 'pm')}
                defaultValue={initialValues?.content}
                status={errors.content && 'danger'}
                caption={errors.content?.message}
                onChangeText={val => setValue('content', val)}
                isUppercase
                labelStyle={[style.labelStyle, { marginTop: 20 }]}
                minHeight={48}
                mb="15"
              />
              <ModalButton
                title={'Area'}
                onPress={() => openSelectModal('area')}
                buttonText="Select Area"
                isSelected={!!watching.location}>
                <Box flexDirection="row" alignItems="center">
                  <View style={style.areaBox}>
                    <Text style={style.areaText}>{watching.location}</Text>
                  </View>
                </Box>
              </ModalButton>
              <Divider mb={20} mt={20} />
              <Box mb="10">
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center">
                  <Text
                    style={[
                      style.labelStyle,
                      {
                        color: colors['gray scale/90'],
                        textTransform: 'capitalize',
                      },
                    ]}>
                    Time Preference
                  </Text>
                  <SelectButton
                    isChange={watching?.timePreference?.length > 0}
                    chooseBtnText={'SELECT'}
                    changeBtnText={'SELECT'}
                    onPress={() => openSelectModal('time')}
                    displayChange={true}
                    isPlusIcon={false}
                    isSelected={true}
                  />
                </Box>
                {watching?.timePreference && (
                  <>
                    {watching?.timePreference?.map(e => {
                      const item = MAINTENANCE_TIME_PREFERENCES_OPTIONS.find(
                        i => i.id === e,
                      );
                      return (
                        <Box
                          flexDirection="row"
                          alignItems="center"
                          marginBottom={1}>
                          <GreyCalendar
                            style={{ marginRight: 10 }}
                            fill="#727978"
                            width="25"
                            height="25"
                          />
                          <Text
                            style={{
                              ...typography['body/medium – regular'],
                              fontSize: 16,
                            }}>
                            {item.text}
                          </Text>
                        </Box>
                      );
                    })}
                  </>
                )}
              </Box>
              <Box style={{ marginBottom: 6 }}>
                <DateField
                  value={watching?.date}
                  onSelect={val => setValue('date', val)}
                  editable={true}
                  copy={{
                    label: 'Date',
                  }}
                  labelStyle={[
                    style.labelStyle,
                    { color: colors['gray scale/90'], textTransform: 'none' },
                  ]}
                  isGreyCalendar={true}
                  styles={{
                    iconStyle: { marginTop: -8 },
                    textStyle: { marginTop: -9 },
                  }}
                />
              </Box>
              <YesNoInput
                label={`Permission to enter if no one's home`}
                styles={style.yesNoButton}
                value={watching.enterPermission ? 1 : 2}
                hideNA={true}
                onChange={val => setValue('enterPermission', val == 1)}
              />
              <Input
                label="Additional Details / Entry Instructions"
                labelStyle={[style.labelStyle, { textTransform: 'uppercase' }]}
                multiline
                defaultValue={initialValues?.additionalDetails}
                status={errors.additionalDetails && 'danger'}
                caption={errors.additionalDetails?.message}
                onChangeText={val => setValue('additionalDetails', val)}
                minHeight={48}
                icon={Icon('expandInput', 'pm')}
              />
              <Divider mb={30} mt={20} />
              <GalleryInput
                label="Attachments"
                width={'100%'}
                mt={0}
                labelTransform={null}
                value={watching?.files}
                onAdd={onAddFiles}
                navigation={navigation}
                copy={{ label: 'Attachments', btn: 'ADD FILE' }}
                styles={{ labelStyle: style.labelStyle }}
                onRemove={idx =>
                  setValue(
                    'files',
                    watching.files.filter((f, idx2) => idx2 !== idx),
                  )
                }
              />
              <Box my={3}>
                <Button
                  textStyle={style.submitButtonText}
                  style={{ borderRadius: 12, height: 50, marginBottom: 20 }}
                  onPress={handleSubmit(onSubmit)}>
                  Submit Request
                </Button>
              </Box>
            </Box>
          </Form>
        </KeyboardAwareScrollView>
      </Box>
      <SelectModal
        open={openServiceModal}
        isOther={otherModalOpen}
        close={() => handleCloseModal()}
        values={MAINTENANCE_SERVICES_OPTIONS}
        selectedValue={
          MAINTENANCE_SERVICES_OPTIONS.find(e => e.text === watching.service)
            ?.id
        }
        onSelect={val => onServiceNeeded(val)}
        handleOtherInput={val => {
          setValue('service', val), handleCloseModal();
        }}
        title={'Service needed'}
      />
      <SelectModal
        open={openAreaModal}
        isOther={otherModalOpen}
        close={() => handleCloseModal()}
        handleOtherInput={val => {
          setValue('location', val), handleCloseModal();
        }}
        values={AREA_OPTIONS}
        selectedValue={AREA_OPTIONS.find(e => e.text === watching.location)?.id}
        onSelect={val => onAddArea(val)}
        title={'Area'}
      />
      <SelectModal
        open={openTimeModal}
        close={() => setOpenTimeModal(false)}
        values={MAINTENANCE_TIME_PREFERENCES_OPTIONS}
        selectedValue={selectedTimeOptions}
        text={'Please select 2-3 time preference'}
        onSelect={val => onAddTimePreference(val)}
        title={'Time preference'}
        isCheckbox
      />
    </HeadedScreen>
  );
};

export const TaskInput = styled(Input).attrs(({ theme, size, category }) => ({
  textStyle: {
    borderBottomColor: theme['grey-100'],
    borderBottomWidth: 2,
    paddingVertical: 6,
    ...(category
      ? {
          fontSize: theme[`text-${category}-font-size`],
          fontWeight: theme[`text-${category}-font-weight`],
          fontFamily: theme[`text-${category}-font-family`],
        }
      : {}),
  },
  selectionColor: theme['color-primary-500'],
}))`
  background-color: transparent;
`;

export default EditTask;

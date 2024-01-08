import React from 'react';
import { Platform } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useForm from 'react-hook-form';
import { ReactNativeFile } from 'extract-files';
import { Layout, Spinner } from '@ui-kitten/components';
import * as yup from 'yup';
import { useMutation, useQuery } from 'urql';
import getManagementCompanies from 'queries/properties/getManagementCompanies.gql';
import upsertBuildingMutation from 'queries/properties/upsertProperty.gql';
import deleteBuildingMutation from 'queries/properties/deleteProperty.gql';
import getPropertyQuery from 'queries/properties/getBuild.gql';
import Button from 'components/Button';
import states from 'constants/states';
import Text from 'components/Text';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Header from 'components/Header';
import SafeAreaView from 'components/SafeAreaView';
import Form from 'components/Form';
import Input from 'components/Input';
import SubmitButton from 'components/SubmitButton';
import SelectInput from 'components/SelectInput';
import Persona from 'components/Persona';
import PicutreSelectModal from 'components/PicutreSelectModal';
import Dialog from 'components/Dialog';
import AmenitiesField from 'components/Forms/Fields/AmenitiesField';
import PhotoField from 'components/Forms/Fields/PhotoField';
import LazyScreen from 'utils/LazyScreen';
import buildingClasses from 'constants/buildingClasses';
import styled from 'styled-components/native';

const ShadowPersona = styled(Persona)`
  shadow-opacity: 0.2;
  shadow-radius: 3;
  shadow-color: #000;
  shadow-offset: {height: 0, width: 0};
  elevation: 2;
`;

const statesFormatted = states.map(s => ({
  key: s.abbreviation,
  title: `${s.abbreviation} - ${s.name}`,
}));

const classesFormatted = buildingClasses.map(c => ({
  key: c.code,
  title: `${c.name} (${c.code})`,
}));

const transformNumber = (value, originalValue) =>
  +`${originalValue}`.replace(/[^0-9.]+/g, '');

const schema = yup.object().shape({
  name: yup
    .string()
    .max(100)
    .label('Name'),
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
  zip: yup
    .string()
    .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Not a valid ZIP code')
    .required()
    .label('ZIP'),
  photos: yup
    .array()
    .of(
      yup.lazy(value => {
        if (typeof value === 'string') {
          return yup.string().url();
        }
        return yup.object().shape({
          uri: yup.string().required(),
        });
      }),
    )
    .label('Photos'),
  managementCompany: yup
    .object()
    .shape({
      id: yup.string().required(),
      name: yup.string(),
    })
    .required()
    .label('Management Company'),
  manager: yup
    .object()
    .shape({
      id: yup.string().required(),
      name: yup.string(),
      title: yup.string(),
      managementCompany: yup.object().shape({
        id: yup.string().required(),
      }),
    })
    .label('Manager'),
  amenities: yup
    .array()
    .ensure()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
      }),
    )
    .label('Amenities'),
  blocks: yup
    .string()
    .matches(
      /((\d+)([,.]\s*\d+)*){0,1}/,
      'Use only numbers seperated by commas or dots',
    )
    .required()
    .label('Blocks'),
  lot: yup
    .number()
    .required()
    .label('Lot'),
  lotDimensions: yup
    .array()
    .ensure()
    .of(yup.number().transform(transformNumber))
    .min(2)
    .max(2)
    .label('Lot Dimensions'),
  neighbourhood: yup
    .string()
    .max(50)
    .label('Neighbourhood'),
  floors: yup
    .number()
    .min(1)
    .required()
    .label('Floors'),
  year: yup
    .number()
    .min(1600)
    .max(new Date().getFullYear())
    .required()
    .label('Year'),
  buildingClass: yup
    .object()
    .shape({
      key: yup
        .string()
        .oneOf(buildingClasses.map(c => c.code))
        .required(),
    })
    .required()
    .label('Building Class'),
  areaSize: yup
    .number()
    .transform(transformNumber)
    .required()
    .label('Area Size'),
  taxClass: yup
    .number()
    .transform(transformNumber)
    .required()
    .label('Tax Class'),
  taxes: yup
    .number()
    .transform(transformNumber)
    .required()
    .label('Taxes'),
  maxFar: yup
    .number()
    .required()
    .label('Max FAR'),
  far: yup
    .number()
    .required()
    .label('Building FAR'),
});

const EditProperty = ({ navigation, route }) => {
  const [error, setError] = React.useState(null);
  const [showAddPicture, setShowAddPicture] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const { loader, startLoading, stopLoading } = useLoader();

  const buildingId = route?.params?.id;
  const [res] = useQuery(
    React.useMemo(
      () => ({
        query: getPropertyQuery,
        variables: { id: buildingId },
        pause: !buildingId,
      }),
      [buildingId],
    ),
  );

  const initialValues = React.useMemo(() => {
    const data = res.data?.building;
    return data
      ? {
          ...data,
          state: statesFormatted.find(s => s.key === data.state),
          buildingClass: classesFormatted.find(
            s => s.key === data.buildingClass,
          ),
          amenities: data.amenities.edges?.map(e => e.node),
          photos: data.photos.map(uri => ({ uri })),
          blocks: data.blocks.join(','),
          zip: `${data.zip}`,
          lot: `${data.lot}`,
          floors: `${data.floors}`,
          year: `${data.year}`,
          far: `${data.far}`,
          maxFar: `${data.maxFar}`,
          taxes: `$${data.taxes}`,
          taxClass: `${data.taxClass}%`,
          lotDimensions: data.lotDimensions.map(d => `${d} ft`),
          areaSize: `${data.areaSize} sq ft`,
        }
      : null;
  }, [res.data]);

  const [editRes, executeMutation] = useMutation(upsertBuildingMutation);
  const [deleteRes, deleteMutation] = useMutation(deleteBuildingMutation);

  const isNew = !buildingId;

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
    'state',
    'amenities',
    'managementCompany',
    'manager',
    'photos',
    'buildingClass',
    'taxes',
    'taxClass',
    'areaSize',
    'lotDimensions',
  ]);

  React.useEffect(() => {
    if (
      watching.managementCompany?.id !== watching.manager?.managementCompany?.id
    ) {
      setValue('manager', null);
    }
  }, [setValue, watching.managementCompany, watching.manager]);

  const showAddPictureSetter = React.useCallback(
    value => () => setShowAddPicture(value),
    [],
  );

  const onSelectAmenities = React.useCallback(
    amenities => {
      setValue('amenities', amenities);
    },
    [setValue],
  );

  const mcListProps = React.useMemo(
    () => ({
      dataExtractor: data => data.managementCompanies,
      labelExtractor: item => item.name,
      keyExtractor: company => company.id,
    }),
    [],
  );

  const onSelectManager = React.useCallback(
    manager => {
      setValue('manager', manager);
    },
    [setValue],
  );

  const navSelectManager = React.useCallback(() => {
    navigation.navigate('AssignPropertyManager', {
      company: watching.managementCompany?.id,
      manager: watching.manager,
      onSelect: onSelectManager,
    });
  }, [
    navigation,
    onSelectManager,
    watching.managementCompany,
    watching.manager,
  ]);

  const onAddPicture = React.useCallback(
    res => {
      setValue('photos', [...(watching.photos ?? []), ...res]);
    },
    [setValue, watching.photos],
  );

  const onRemovePicture = React.useCallback(
    index => {
      const curr = watching.photos ?? [];
      setValue('photos', [...curr.slice(0, index), ...curr.slice(index + 1)]);
    },
    [setValue, watching.photos],
  );

  const submitting =
    editRes.fetching || isSubmitting || (!isNew && res.fetching);

  const onSubmit = React.useCallback(
    form => {
      setError(null);
      const building = {
        ...form,
        amenities: form.amenities?.map(am => am.id) ?? [],
        blocks: form.blocks.split(/[.,]/g).map(num => +num),
        buildingClass: form.buildingClass?.key,
        managementCompany: form.managementCompany?.id,
        manager: form.manager?.id,
        state: form.state?.key,
      };
      // delete building.photos;
      building.photos = (form.photos || []).map(photo => {
        if (photo && photo.type) {
          return new ReactNativeFile({
            uri:
              Platform.OS === 'android'
                ? photo.uri
                : photo.uri.replace('file://', ''),
            type: photo.type,
            name: photo.fileName,
          });
        } else {
          return photo?.uri;
        }
      });
      const submit = async () => {
        startLoading();
        const upsertRes = await executeMutation({ building, id: buildingId });
        let id;
        try {
          if ((id = upsertRes.data?.upsertBuilding?.building?.id)) {
            route?.params?.onUpdate?.();
            navigation.goBack();
            if (isNew) {
              navigation.navigate('ViewProperty', { id });
            }
          } else {
            setError(
              (upsertRes.error.message || '').replace(
                /\[(Network Error|GraphQL)\]\s*/g,
                '',
              ),
            );
          }
        } finally {
          stopLoading();
        }
      };
      submit();
    },
    [buildingId, executeMutation, isNew, navigation, route],
  );

  const onDelete = React.useCallback(() => {
    const del = async () => {
      const res = await deleteMutation({ id: buildingId });
      if (res.data?.deleteBuilding?.success) {
        navigation.navigate('PropertiesTabs');
      } else {
        setError('Failed to delete building');
      }
    };
    del();
  }, [buildingId, deleteMutation, navigation]);

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
            {
              text: 'SAVE',
              size: 'small',
              disabled: submitting,
              onPress: handleSubmit(onSubmit),
            },
          ]}
          title={isNew ? 'Add' : 'Edit'}
          alignment="center"
          divider
        />
        {loader}
        <Box position="relative">
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
            <KeyboardAwareScrollView>
              {/* <ScrollView> */}
              <Box px={15} pt={30} pb={45}>
                <Form loading={submitting} onSubmit={handleSubmit(onSubmit)}>
                  {error ? (
                    <Box mb="3">
                      <Text category="c1" status="danger">
                        {error}
                      </Text>
                    </Box>
                  ) : null}
                  <Input
                    label="Property Name"
                    mb={15}
                    defaultValue={initialValues?.name}
                    status={errors.name && 'danger'}
                    caption={errors.name && errors.name.message}
                    onChangeText={val => setValue('name', val)}
                  />
                  <Input
                    label="Address"
                    mb={15}
                    defaultValue={initialValues?.address}
                    status={errors.address && 'danger'}
                    caption={errors.address && errors.address.message}
                    onChangeText={val => setValue('address', val)}
                  />
                  <Input
                    label="City"
                    mb={15}
                    defaultValue={initialValues?.city}
                    status={errors.city && 'danger'}
                    caption={errors.city && errors.city.message}
                    onChangeText={val => setValue('city', val)}
                  />
                  <Box flexDirection="row" alignItems="flex-start" mb={15}>
                    <SelectInput
                      label="State"
                      flex={1}
                      options={statesFormatted}
                      status={errors.state && 'danger'}
                      caption={errors.state && errors.state.message}
                      onSelect={val => setValue('state', val)}
                      value={watching.state?.title}
                    />
                    <Box mx={15} />
                    <Input
                      label="Zip"
                      flex={1}
                      defaultValue={initialValues?.zip}
                      keyboardType="number-pad"
                      status={errors.zip && 'danger'}
                      caption={errors.zip && errors.zip.message}
                      onChangeText={val => setValue('zip', val)}
                    />
                  </Box>
                  <PhotoField
                    value={watching.photos}
                    setValue={photos => setValue('photos', photos)}
                    copy={{ label: 'Building Photo', btn: 'Select From Phone' }}
                  />
                  <Divider mb={30} />
                  <SelectInput
                    mb={15}
                    label="Management Company"
                    status={errors.managementCompany && 'danger'}
                    caption={
                      errors.managementCompany &&
                      errors.managementCompany.message
                    }
                    options={getManagementCompanies}
                    listProps={mcListProps}
                    onSelect={val => setValue('managementCompany', val)}
                    value={watching.managementCompany?.name}
                  />

                  <Collapsible collapsed={!watching?.managementCompany}>
                    <Box mb={30}>
                      <Box
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between">
                        <Text category="label">MANAGER</Text>
                        <Button
                          size="small"
                          appearance="ghost"
                          onPress={navSelectManager}
                          disabled={!watching.managementCompany?.id}>
                          EDIT
                        </Button>
                      </Box>
                      <ShadowPersona
                        name={watching.manager?.fullName ?? 'Unassigned'}
                        title={watching.manager?.title}
                        profile={watching.manager?.photo}
                        mt="3"
                        mb="2"
                      />
                    </Box>
                  </Collapsible>
                  <Divider />
                  <AmenitiesField
                    value={watching.amenities}
                    onSelect={onSelectAmenities}
                  />
                  <Divider />
                  <Input
                    label="Blocks"
                    mb={15}
                    defaultValue={initialValues?.blocks}
                    keyboardType="numeric"
                    status={errors.blocks && 'danger'}
                    caption={
                      (errors.blocks && errors.blocks.message) ||
                      'use comma or dot to separate betweern blocks'
                    }
                    onChangeText={val => setValue('blocks', val)}
                  />
                  <Input
                    label="Lot"
                    mb={15}
                    defaultValue={initialValues?.lot}
                    keyboardType="numeric"
                    status={errors.lot && 'danger'}
                    caption={errors.lot && errors.lot.message}
                    onChangeText={val => setValue('lot', val)}
                  />
                  <Box flexDirection="row" mb={15} alignItems="flex-end">
                    <Input
                      label="Lot Dimensions"
                      flex={1}
                      keyboardType="number-pad"
                      status={errors.lotDimensions && 'danger'}
                      caption={
                        errors.lotDimensions && errors.lotDimensions.message
                      }
                      onChangeText={val =>
                        setValue('lotDimensions', [
                          val,
                          watching.lotDimensions?.[1],
                        ])
                      }
                      selection={{
                        start: `${`${watching.lotDimensions?.[0]}`.replace(
                          /[^0-9.]+/g,
                          '',
                        ) ?? ''}`.length,
                        end: `${`${watching.lotDimensions?.[0]}`.replace(
                          /[^0-9.]+/g,
                          '',
                        ) ?? ''}`.length,
                      }}
                      value={
                        watching.lotDimensions?.[0] &&
                        `${`${watching.lotDimensions?.[0]}`.replace(
                          /[^0-9.]+/g,
                          '',
                        ) ?? ''} ft`
                      }
                    />
                    <Box mx={15} mb={20}>
                      <Text category="c1">X</Text>
                    </Box>
                    <Input
                      flex={1}
                      keyboardType="number-pad"
                      onChangeText={val =>
                        setValue('lotDimensions', [
                          watching.lotDimensions?.[0],
                          val,
                        ])
                      }
                      selection={{
                        start: `${`${watching.lotDimensions?.[1]}`.replace(
                          /[^0-9.]+/g,
                          '',
                        ) ?? ''}`.length,
                        end: `${`${watching.lotDimensions?.[1]}`.replace(
                          /[^0-9.]+/g,
                          '',
                        ) ?? ''}`.length,
                      }}
                      value={
                        watching.lotDimensions?.[1] &&
                        `${`${watching.lotDimensions?.[1]}`.replace(
                          /[^0-9.]+/g,
                          '',
                        ) ?? ''} ft`
                      }
                    />
                  </Box>
                  <Box pointerEvents="none">
                    <Input
                      label="Lot Square Feet"
                      mb={15}
                      hasTVPreferredFocus={false}
                      editable={false}
                      value={
                        watching.lotDimensions?.[0] &&
                        watching.lotDimensions?.[1] &&
                        `${`${watching.lotDimensions[0]}`.replace(
                          /[^0-9.]+/g,
                          '',
                        ) *
                          `${watching.lotDimensions[1]}`.replace(
                            /[^0-9.]+/g,
                            '',
                          )} sq. ft.`
                      }
                    />
                  </Box>
                  <Input
                    label="Neighborhood"
                    mb={15}
                    defaultValue={initialValues?.neighbourhood}
                    status={errors.neighbourhood && 'danger'}
                    caption={
                      errors.neighbourhood && errors.neighbourhood.message
                    }
                    onChangeText={val => setValue('neighbourhood', val)}
                  />
                  <Input
                    label="Floors"
                    mb={15}
                    defaultValue={initialValues?.floors}
                    keyboardType="numeric"
                    status={errors.floors && 'danger'}
                    caption={errors.floors && errors.floors.message}
                    onChangeText={val => setValue('floors', val)}
                  />
                  <Divider />
                  <Input
                    label="Year Built"
                    mb={15}
                    defaultValue={initialValues?.year}
                    keyboardType="numeric"
                    status={errors.year && 'danger'}
                    caption={errors.year && errors.year.message}
                    onChangeText={val => setValue('year', val)}
                  />
                  <SelectInput
                    label="Building Class"
                    mb={15}
                    options={classesFormatted}
                    status={errors.buildingClass && 'danger'}
                    caption={
                      errors.buildingClass && errors.buildingClass.message
                    }
                    onSelect={val => setValue('buildingClass', val)}
                    value={watching.buildingClass?.title}
                  />
                  <Input
                    label="Building Square Feet"
                    mb={15}
                    keyboardType="numeric"
                    status={errors.areaSize && 'danger'}
                    caption={errors.areaSize && errors.areaSize.message}
                    onChangeText={val => setValue('areaSize', val)}
                    selection={{
                      start: `${watching.areaSize?.replace(/[^0-9.]+/g, '') ??
                        ''}`.length,
                      end: `${watching.areaSize?.replace(/[^0-9.]+/g, '') ??
                        ''}`.length,
                    }}
                    value={
                      watching.areaSize &&
                      `${watching.areaSize.replace(/[^0-9.]+/g, '')} sq ft`
                    }
                  />
                  <Divider />
                  <Input
                    label="Tax Class"
                    mb={15}
                    keyboardType="numeric"
                    status={errors.taxClass && 'danger'}
                    caption={errors.taxClass && errors.taxClass.message}
                    onChangeText={val => setValue('taxClass', val)}
                    selection={{
                      start: `${watching.taxClass?.replace(/[^0-9\.]+/g, '') ??
                        ''}`.length,
                      end: `${watching.taxClass?.replace(/[^0-9\.]+/g, '') ??
                        ''}`.length,
                    }}
                    value={
                      watching.taxClass &&
                      `${watching.taxClass.replace(/[^0-9\.]+/g, '')}%`
                    }
                  />
                  <Input
                    label="Taxes"
                    mb={15}
                    keyboardType="numeric"
                    status={errors.taxes && 'danger'}
                    caption={errors.taxes && errors.taxes.message}
                    onChangeText={val => setValue('taxes', val)}
                    value={
                      watching.taxes &&
                      `$${`${watching.taxes || ''}`.replace(/[^0-9\.]+/g, '')}`
                    }
                  />
                  <Input
                    label="Max FAR"
                    mb={15}
                    defaultValue={initialValues?.maxFar}
                    keyboardType="numeric"
                    status={errors.maxFar && 'danger'}
                    caption={errors.maxFar && errors.maxFar.message}
                    onChangeText={val => setValue('maxFar', val)}
                  />
                  <Input
                    label="Building FAR"
                    mb={15}
                    defaultValue={initialValues?.far}
                    keyboardType="numeric"
                    status={errors.far && 'danger'}
                    caption={errors.far && errors.far.message}
                    onChangeText={val => setValue('far', val)}
                  />
                </Form>
                {!isNew && (
                  <>
                    <Box my={15}>
                      <SubmitButton gradient shape="circle" size="giant">
                        Pull Data From Third Party
                      </SubmitButton>
                    </Box>
                    <SubmitButton
                      onPress={() => setShowDeleteModal(true)}
                      appearance="ghost"
                      status="danger"
                      size="large"
                      shape="circle"
                      loading={deleteRes.fetching}>
                      Remove Building
                    </SubmitButton>
                  </>
                )}
              </Box>
            </KeyboardAwareScrollView>
          </LazyScreen>
        </Box>
      </Box>
      <PicutreSelectModal
        visible={showAddPicture}
        onHide={showAddPictureSetter(false)}
        onPicutreSelect={onAddPicture}
      />
      <Dialog
        visible={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Remove Building"
        content="Once you delete this record you won’t be able to undo this action."
        buttons={[
          {
            gradient: true,
            children: 'Cancel',
            shape: 'circle',
            hide: true,
          },
          {
            gradient: true,
            children: 'OK',
            onPress: onDelete,
            shape: 'circle',
            hide: true,
          },
        ]}
      />
    </Box>
  );
};

export default EditProperty;

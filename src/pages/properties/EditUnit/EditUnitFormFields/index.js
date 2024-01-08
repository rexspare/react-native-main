import React, { useMemo } from 'react';
import { format } from 'date-fns';
import buildingSelectQuery from 'queries/properties/listPropertiesSelect.gql';
import useTheme from 'hooks/useTheme';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Text from 'components/Text';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Input from 'components/Input';
import SelectInput from 'components/SelectInput';
import AmenitiesField from 'components/Forms/Fields/AmenitiesField';
import PhotoField from 'components/Forms/Fields/PhotoField';
import DateField from 'components/Forms/Fields/DateField';
import MultiSelectBoxes from 'components/Forms/Fields/MultiSelectBoxes';
import SwitchField from 'components/Forms/Fields/SwitchField';
import TenantField from 'components/Forms/Fields/TenantField';
import LeaseField from 'components/Forms/Fields/LeaseField';
import AmountInput from 'components/Forms/Fields/AmountInput';
import ButtonField from 'components/Forms/Fields/ButtonField';
import { t } from 'helpers/react';
import {
  UNIT_STATUS,
  RENT_TYPES,
  formatEnumToSelectOptions,
  stringifyEnumValue,
  AMENITY_TYPES,
} from 'constants/enums';
import { removeFilterObjectFromArray } from 'helpers/array';
import { usaDateFormat } from 'constants/dateFormat';
import { input_label_14 } from 'styles/reusable-classes';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import { styles } from '../styles';

const commonProps = {
  labelStyle: styles.labelStyle,
  style: styles.input,
  size: 'large',
  isRequired: true,
  mb: 7.5,
  mt: 7.5,
};

const EditUnitFormFields = ({
  watching,
  setValue,
  initialValues,
  errors,
  isNew,
}) => {
  const theme = useTheme();
  const buildingListProps = useMemo(
    () => ({
      dataExtractor: data => data?.buildings,
      labelExtractor: item => item?.displayName,
      keyExtractor: item => item?.id,
    }),
    [],
  );
  const isOccupied = watching.status === UNIT_STATUS.OCCUPIED;

  return (
    <>
      <SelectInput
        label="Property Name"
        placeholder="Select from list"
        status={errors.building && 'danger'}
        caption={errors.building && errors.building.message}
        options={buildingSelectQuery}
        listProps={buildingListProps}
        onSelect={val => setValue('building', val)}
        value={watching.building?.displayName}
        disabled={!isNew}
        {...commonProps}
        labelStyle={{ ...commonProps?.labelStyle, marginBottom: 5 }}
      />
      <Input
        label="Unit"
        defaultValue={initialValues?.unitNumber}
        keyboardType="default"
        status={errors.unitNumber && 'danger'}
        caption={errors.unitNumber && errors.unitNumber.message}
        onChangeText={val => setValue('unitNumber', val)}
        value={watching?.unitNumber}
        {...commonProps}
        labelIcon={watching?.unitNumber ? 'green-circle-tick' : null}
        isRequired={watching?.unitNumber ? false : true}
      />
      <AmountInput
        label="Rent Price"
        defaultValue={parseFloat(initialValues?.price).toFixed(2)}
        value={watching?.price}
        status={errors.price && 'danger'}
        caption={errors.price && errors.price.message}
        onChange={val => {
          setValue('price', val);
        }}
        {...commonProps}
        labelStyle={{ ...commonProps?.labelStyle, marginTop: 10 }}
        labelIcon={watching?.price ? 'green-circle-tick' : null}
        iconTop={15}
        isRequired={watching?.price ? false : true}
      />
      <Input
        label="Unit Description"
        multiline={true}
        icon={Icon('expandInput', 'pm')}
        defaultValue={initialValues?.description}
        status={errors.description && 'danger'}
        caption={errors.description && errors.description.message}
        onChangeText={val => setValue('description', val)}
        value={watching?.description}
        {...commonProps}
        labelStyle={{ ...commonProps?.labelStyle, marginTop: 10 }}
        isRequired={false}
      />
      <Divider mt={15} />
      <Input
        label="Unit SQ FT"
        keyboardType="number-pad"
        defaultValue={initialValues?.areaSize}
        status={errors.areaSize && 'danger'}
        caption={errors.areaSize && errors.areaSize.message}
        onChangeText={val => setValue('areaSize', val)}
        value={watching?.areaSize}
        isRequired={false}
        labelStyle={{ ...commonProps?.labelStyle, textTransform: 'none' }}
      />
      <Input
        label="Floor"
        keyboardType="number-pad"
        defaultValue={initialValues?.floor}
        status={errors.floor && 'danger'}
        caption={errors.floor && errors.floor.message}
        onChangeText={val => setValue('floor', val)}
        value={watching?.floor}
        isRequired={false}
        labelStyle={{ ...commonProps?.labelStyle, marginTop: 10 }}
      />
      <Input
        label="Bedroom"
        keyboardType="number-pad"
        defaultValue={`${initialValues?.bedroomCount || ''}`}
        status={errors.bedroomCount && 'danger'}
        caption={errors.bedroomCount && errors.bedroomCount.message}
        onChangeText={val => setValue('bedroomCount', val)}
        value={watching?.bedroomCount}
        {...commonProps}
        labelStyle={{ ...commonProps?.labelStyle, marginTop: 10 }}
      />
      <Input
        label="Bathroom"
        keyboardType="number-pad"
        defaultValue={`${initialValues?.bathroomCount || ''}`}
        status={errors.bathroomCount && 'danger'}
        caption={errors.bathroomCount && errors.bathroomCount.message}
        onChangeText={val => setValue('bathroomCount', val)}
        value={watching?.bathroomCount}
        {...commonProps}
        labelStyle={{ ...commonProps?.labelStyle, marginTop: 10 }}
      />
      <Box style={{ marginVertical: 15 }}>
        <SwitchField
          label={'Furnished'}
          checked={watching?.isFurnished}
          onChange={val => setValue('isFurnished', val)}
          containerStyle={styles.switchContainer}
          circleSize={26}
          circleRadius={26}
          styles={{
            container: { paddingHorizontal: 1, marginBottom: 3, marginLeft: 1 },
          }}
        />
      </Box>
      <Divider />
      <MultiSelectBoxes
        label={'UNIT STATUS'}
        onPress={status => setValue('status', status)}
        values={UNIT_STATUS}
        value={watching.status}
        style={{ minWidth: 100 }}
        styles={{
          optionsContainer: { justifyContent: 'flex-start' },
          buttonStyle: { padding: 10, paddingLeft: 0 },
          label: {
            ...typography['body/medium – medium'],
            fontFamily: 'Roboto',
            textTransform: 'uppercase',
            color: colors['gray scale/40'],
          },
        }}
        isRequired
      />
      {t(
        !isOccupied,
        <Box mt={15}>
          <Text style={[input_label_14]}>Vacancy Date</Text>
          <Box mt={2}>
            <DateField
              Component={Button}
              onSelect={d => setValue('date', d)}
              triggerKey={'onPress'}
              value={watching?.date}
              boundingMonth={false}
              isRequired
              size={'large'}
              inputProps={{
                icon: () =>
                  Icon(
                    'calendar_black',
                    'pm',
                  )({ width: 18, height: 20, marginRight: 5 }),
                appearance: 'ghost',
                children: watching?.date
                  ? format(watching?.date, usaDateFormat)
                  : 'Select Date',
                textStyle: styles.dateFieldTxt,
                style: styles.dateField(theme),
              }}
            />
          </Box>
        </Box>,
      )}
      <Box style={{ marginTop: 10 }}>
        <SelectInput
          label="Regulation Status"
          options={formatEnumToSelectOptions(RENT_TYPES)}
          placeholder={'Regulation Status'}
          caption={errors.rentType && errors.rentType.message}
          onSelect={val => setValue('rentType', val?.key)}
          value={stringifyEnumValue(RENT_TYPES, watching?.rentType)}
          size={'large'}
          isRequired
          {...commonProps}
          labelStyle={{ ...commonProps?.labelStyle, marginBottom: 5 }}
        />
      </Box>
      <Divider mt={15} />
      {t(
        isOccupied,
        <LeaseField
          value={watching?.lease}
          setValue={lease => setValue('lease', lease)}
          formProps={{
            paymentMethod: false,
            units: false,
            submitBtn: false,
            initialValues: {
              securityDeposit: watching?.price,
              rentAmount: watching?.price,
            },
          }}
          isModal={true}
        />,
      )}
      <Box mt={20}>
        <PhotoField
          value={watching?.photos}
          setValue={val => setValue('photos', val)}
          copy={{ label: 'UNIT PHOTOS', btn: 'ADD FROM PHONE' }}
        />
      </Box>
      <Box mt={25} mb={10}>
        <AmenitiesField
          value={watching.amenities}
          setValue={val => setValue('amenities', val)}
          amenityType={AMENITY_TYPES.UNIT}
        />
      </Box>
      <TenantField
        value={watching.tenants}
        Component={ButtonField}
        setValue={val => setValue('tenants', val)}
        valueKey='pk'
        removeItem={user => {
          const filteredList =
          removeFilterObjectFromArray(watching.tenants, user?.pk, 'pk') || [];
          setValue('tenants', filteredList);
        }} 
        addTenant={true}
        buttonText={'ADD NEW TENANT'}
      />
    </>
  );
};

export default EditUnitFormFields;

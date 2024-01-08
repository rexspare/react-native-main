import React, { useMemo } from 'react';
import SelectInput from 'components/SelectInput';
import Text from 'components/Text';
import TenantField from 'components/Forms/Fields/TenantField';
import BuildingField from 'components/Forms/Fields/BuildingField';
import UnitField from 'components/Forms/Fields/UnitField';
import DateField from 'components/Forms/Fields/DateField';
import AttachmentField from 'components/Forms/Fields/AttachementField';
import Button from 'components/Button';
import { usaDateFormat } from 'constants/dateFormat';
import Icon from 'components/Icon';
import PaymentMethodField from 'components/Forms/Fields/PaymentMethodField';
import InputLabel from 'components/InputLabel';
import Divider from 'components/Divider';
import MultiSelectBoxes from 'components/Forms/Fields/MultiSelectBoxes';
import AmountInput from 'components/Forms/Fields/AmountInput';
import { t } from 'helpers/react';
import { manipulateDate } from 'helpers/date';
import {
  rentValidator,
  securityDepositValidator,
} from 'helpers/validators/lease';
import { format } from 'date-fns';
import {styles} from 'pages/tenants/AddTenant/styles.js'
import { LEASE_FORM_STATUS } from 'constants/enums';
import Box from 'components/Box';
import { input_label_14, input_label_16 } from 'styles/reusable-classes';

const startMin = new Date(new Date().setFullYear(new Date().getFullYear() - 3));
const days = [...Array(28).keys()].map(d => ({
  key: d + 1,
  title: <Text>{d + 1}</Text>,
}));

const getEndDateRange = start =>
  start
    ? {
        endMin: manipulateDate(start, 0, 3),
        endMax: manipulateDate(start, 0, 0, 3),
      }
    : {};

const LeaseFormFields = ({
  setValue,
  value,
  tenants = true,
  units = true,
  paymentMethod = true,
  attachments = true,
  leaseStatus,
  children,
  onValidationChange,
  onUnitChange,
}) => {
  const displayLeaseStatus = useMemo(
    () => leaseStatus && value?.start && new Date(value?.start) > new Date(),
    [leaseStatus, value?.start],
  );
  const { endMin, endMax } = useMemo(() => getEndDateRange(value?.start), [
    value?.start,
  ]);

  return (
    <>
      {t(
        tenants,
        <TenantField
          value={value?.tenant}
          setValue={tenant => setValue('tenant', tenant)}
          isRequired
          displayAdd
        />,
      )}
      {t(
        units,
        <>
          <BuildingField
            value={value?.building}
            setValue={v => setValue('building', v)}
            isRequired
          />
          <UnitField
            value={value?.unit}
            setValue={onUnitChange}
            buildingId={value?.building?.pk}
            isRequired
          />
        </>,
      )}
      <Box mb={1}>
        <InputLabel
          labelStyle={input_label_14}
          label={'Lease Start'}
          isRequired
        />
        <DateField
          onSelect={d => setValue('start', d)}
          copy={{ label: 'Lease Start' }}
          value={value?.start}
          min={startMin}
          Component={Button}
          triggerKey={'onPress'}
          inputProps={{
            icon: Icon('calendar_black', 'pm'),
            appearance: 'ghost',
            children: value?.start
              ? format(value?.start, usaDateFormat)
              : 'Lease Start',
            textStyle: styles.dateFieldText,
            style: styles.dateField,
            size: 'large',
          }}
          isRequired
        />
      </Box>
      <Box mb={1}>
        <InputLabel
          labelStyle={input_label_14}
          label={'Lease End'}
          isRequired
        />
        <DateField
          onSelect={d => setValue('end', d)}
          copy={{ label: 'Lease End' }}
          value={value?.end}
          min={endMin}
          max={endMax}
          date={value?.end || endMin}
          boundingMonth={false}
          Component={Button}
          triggerKey={'onPress'}
          inputProps={{
            icon: Icon('calendar_black', 'pm'),
            appearance: 'ghost',
            children: value?.end
              ? format(value?.end, usaDateFormat)
              : 'Lease End',
            textStyle: styles.dateFieldText,
            style: styles.dateField,
            size: 'large',
          }}
          isRequired
        />
      </Box>
      
      {t(
        displayLeaseStatus,
        <MultiSelectBoxes
          label={'Lease Status'}
          values={LEASE_FORM_STATUS}
          value={value?.leaseStatus}
          onPress={val => setValue('leaseStatus', val)}
        />,
      )}
      <Divider mt={24} mb={10} />
      <SelectInput
        onSelect={d => setValue('rentDay', d)}
        label={'Rent Due Day'}
        options={days}
        value={value?.rentDay?.key && `${value?.rentDay?.key}`}
        isRequired
        size="large"
      />
      <AmountInput
        onChange={a => setValue('rentAmount', a)}
        label="Rent Amount ($)"
        value={value?.rentAmount}
        validators={[rent => rentValidator(rent, value?.unit?.price)]}
        fieldName={'rentAmount'}
        onValidationChange={onValidationChange}
        isRequired
        size="large"
      />
      <AmountInput
        onChange={a => setValue('securityDeposit', a)}
        label="Security Deposit ($)"
        value={value?.securityDeposit}
        validators={[
          deposit => securityDepositValidator(deposit, value?.rentAmount),
        ]}
        fieldName={'securityDeposit'}
        onValidationChange={onValidationChange}
        isRequired
        size="large"
      />
      <Divider mt={24} mb={1} />
      {t(
        paymentMethod,
        <PaymentMethodField
          setValue={val => setValue('paymentMethods', val.length && val)}
          value={value?.paymentMethods}
          isRequired={false}
        />,
      )}

      {t(
        attachments,
        <AttachmentField
          setValue={val => setValue('attachments', val)}
          value={value?.attachments}
        />,
      )}
      {children}
    </>
  );
};

export default LeaseFormFields;

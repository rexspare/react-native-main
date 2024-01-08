import React, { useContext, useMemo, useEffect } from 'react';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from 'urql';
import AuthContext from 'providers/auth';
import { useForm } from 'hooks/useForm';
import ManualPaymentFormMutation from '../../../queries/financials/manualPaymentForm.gql';
import Box from 'components/Box';
import Button from 'components/Button';
import Header from 'components/Header';
import TabListSelect from 'components/TabListSelect/TabListSelect';
import BuildingField from 'components/Forms/Fields/BuildingField';
import UnitField from 'components/Forms/Fields/UnitField';
import TenantField from 'components/Forms/Fields/TenantField';
import { format } from 'date-fns';
import { usaDateFormat } from 'constants/dateFormat';
import DateField from '../Fields/DateField';
import AmountField from '../Fields/AmountField';
import { chain } from 'helpers/func';
import listTenant from 'queries/tenants/listTenantsWLease.gql';
import { formatFileToFileInput } from 'components/Forms/Tasks/helpers.js';
import InputLabel from 'components/InputLabel';
import AttachmentField from '../Fields/AttachementField';
import { removeItem } from 'helpers/array';
import { getActions } from 'constants/actions';
import { colors } from 'styles/theme';
import Icon from 'components/Icon';
import { typography } from 'styles/typography';
import { input_label_14 } from 'styles/reusable-classes';
import { styles } from './styles';

const tabListData = [
  { text: 'Rent', value: 'Rent' },
  { text: 'Other', value: 'Other' },
];

const requiredFields = ['amount', 'paymentMethod', 'tenant'];

const ManualPayment = () => {
  const { user } = useContext(AuthContext);
  const { setValue, form, validateRequiredFields, setForm } = useForm({
    requiredFields,
  });
  const navigation = useNavigation();
  const [_, addManualPayment] = useMutation(ManualPaymentFormMutation);
  const areFieldsFilled = useMemo(() => validateRequiredFields(), [form]);

  useEffect(() => {
    if (form?.paymentMethod?.text == 'Cash') {
      setValue('paidAt', form?.due);
    }
  }, [form?.paymentMethod]);

  const paymentMutation = async () => {
    try {
      const input = formatInput(form, user);
      const res = await addManualPayment({ input });
      if (res?.error?.message) {
        Toast.show({ type: 'error1', text1: res?.error?.message });
      } else if (!!res?.data) {
        onSuccess();
      }
    } catch (e) {
      Toast.show({ type: 'error1', text1: e.message });
    }
  };

  const onSuccess = chain([
    () => Toast.show({ type: 'success', text1: 'Successfully added payment.' }),
    () => toFinancialsHome(),
  ]);

  const handleOnTenantChange = val => {
    if (val) {
      setForm({
        ...form,
        tenant: val,
        lease: val[0]?.latestLease,
        unit: val[0]?.latestLease?.unit,
        building: val[0]?.latestLease?.unit?.building,
      });
    }
  };

  const toFinancialsHome = chain([
    () => navigation.navigate('FinancialsHomePage'),
    () => setForm({}),
  ]);

  return (
    <>
      <Header
        alignment="center"
        title="Manual Payment"
        style={{ title: styles?.title, header: styles?.header }}
        marginTop={getStatusBarHeight() + 7}
        actions={getActions(['back', { onPress: toFinancialsHome }])}
        divider
      />
      <Box as={ScrollView} flex={1}>
        <Box width="90%" alignSelf="center" marginTop="5%">
          <InputLabel
            labelStyle={{
              ...typography['body/medium – medium'],
              color: colors['gray scale/40'],
              fontWeight: '500',
              textTransform: 'uppercase',
            }}
            label={'Payment for'}
          />
          <TabListSelect
            values={tabListData}
            onPress={selectedItem => setValue('description', selectedItem)}
            currentSelectedItem={form?.description}
            isRadio={true}
            buttonWidth={'100%'}
            flexDirection={'column'}
            style={{
              text: {
                ...typography['body/small – regular'],
              },
            }}
          />
          {form?.description?.value == 'Other' && (
            <TextInput
              autoFocus={true}
              onChangeText={val => setValue('other', val)}
              value={form?.other}
              style={styles.otherInputField}
            />
          )}
        </Box>
        <Box
          width="90%"
          alignSelf="center"
          marginTop="2.5%"
          paddingTop="5%"
          paddingBottom="5%"
        >
          <Box>
            <InputLabel
              labelStyle={input_label_14}
              label={'Due Date'}
              isRequired
            />
            <DateField
              copy={{ label: 'Due Date', addLabel: 'Set a Date' }}
              icon={'calendar_grey'}
              value={form?.due}
              onSelect={val => setValue('due', val)}
              Component={Button}
              triggerKey={'onPress'}
              inputProps={{
                icon: Icon('calendar_black', 'pm'),
                appearance: 'ghost',
                children: form?.due ? format(form?.due, usaDateFormat) : 'Due Date',
                textStyle: styles.dateFieldText,
                style: styles.dateField,
                size: 'large',
              }}
              isGreyCalendar={true}
              isScrollCalendar
            />
          </Box>
          <Box>
            <InputLabel
              labelStyle={input_label_14}
              label={'Payment Date'}
            />
            <DateField
              copy={{ label: 'Payment Date', addLabel: 'Set a Date' }}
              icon={'calendar_grey'}
              value={form?.paidAt}
              onSelect={val => setValue('paidAt', val)}
              Component={Button}
              triggerKey={'onPress'}
              inputProps={{
                icon: Icon('calendar_black', 'pm'),
                appearance: 'ghost',
                children: form?.paidAt ? format(form?.paidAt, usaDateFormat) : 'Payment Date',
                textStyle: styles.dateFieldText,
                style: styles.dateField,
                size: 'large',
              }}
              editable={true}
              isGreyCalendar={true}
              isScrollCalendar
            />
          </Box>

          <TenantField
            query={listTenant}
            isRequired={true}
            limit={1}
            setValue={val => handleOnTenantChange(val)}
            value={form?.tenant}
            isMultipleDeleteExist={false}
            removeItem={(v, i) => removeItem(setValue, 'tenant', v, i)}
            isChange={form?.tenant?.length > 0}
          />
          <BuildingField
            limit={1}
            value={form?.building}
            setValue={val => setValue('building', val)}
            removeItem={(v, i) => removeItem(setValue, 'building', v, i)}
            disabled={!form?.tenant}
            subtitle={
              form?.tenant?.length > 0 &&
              form?.building === form?.tenant[0]?.latestLease?.unit?.building &&
              'Auto'
            }
          />
          <UnitField
            limit={1}
            value={form?.unit}
            setValue={val => setValue('unit', val)}
            removeItem={(v, i) => removeItem(setValue, 'unit', v, i)}
            disabled={!form?.tenant}
            subtitle={
              form?.tenant?.length > 0 &&
              form?.unit === form?.tenant[0]?.latestLease?.unit &&
              'Auto'
            }
          />
          <AmountField
            setValue={val => setForm({ ...form, ...val })}
            value={
              form?.paymentMethod &&
              form?.amount && {
                paymentMethod: form?.paymentMethod,
                amount: form?.amount,
              }
            }
            isRequired={true}
            removeItem={(v, i) => {
              delete form.amount;
              delete form.paymentMethod;
              setValue(() => setForm({}));
            }}
          />
          <AttachmentField
            setValue={val => setValue('document', val)}
            value={form?.document}
            removeItem={(v, i) => removeItem(setValue, 'document', v, i)}
          />
        </Box>
        {areFieldsFilled ? (
          <Button
            onPress={paymentMutation}
            style={styles.enterAmountButton}
            textStyle={styles.buttonText}
            size="large">
            Confirm Payment
          </Button>
        ) : null}
      </Box>
    </>
  );
};

const formatInput = (form, user) => ({
  payerId: form?.tenant ? form?.tenant[0]?.pk : undefined,
  recipientId: user?.pk,
  amount: form?.amount,
  unitId: form?.unit?.pk,
  buildingId: form?.building?.pk,
  paidAt: form?.paidAt,
  due: form?.due,
  paymentMethod: form?.paymentMethod?.text == "Bank" ? "BANKACCOUNT" : form?.paymentMethod?.text?.toUpperCase() ,
  notes: form?.other || form?.description?.value,
  attachment: form?.document && formatFileToFileInput(form?.document?.[0]),
  leaseId: form?.lease?.pk,
});

export default ManualPayment;

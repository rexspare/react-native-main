import React, { useContext, useMemo } from 'react';
import { ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Toast from 'react-native-toast-message';
import { useMutation } from 'urql';
import { useForm } from 'hooks/useForm';
import AuthContext from 'providers/auth';
import Box from 'components/Box';
import Header from 'components/Header';
import Button from 'components/Button';
import InputLabel from 'components/InputLabel';
import { format } from 'date-fns';
import { usaDateFormat } from 'constants/dateFormat';
import Icon from 'components/Icon';
import DateField from '../Fields/DateField';
import BuildingField from '../Fields/BuildingField';
import UnitField from '../Fields/UnitField';
import ServiceField from '../Fields/ServiceField';
import ServiceProviderField from '../Fields/ServiceProviderField';
import AttachmentField from '../Fields/AttachementField';
import AmountField from '../Fields/AmountField';
import expenseMutation from '../../../queries/financials/manualPaymentForm.gql';
import { formatFileToBase64Input } from 'components/Forms/Tasks/helpers.js';
import { chain } from 'helpers/func';
import { removeItem } from 'helpers/array';
import { getActions } from 'constants/actions';
import { styles } from './styles';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import { input_label_14 } from 'styles/reusable-classes';

const requiredFields = [
  'building',
  'paidAt',
  'service',
  'amount',
  'paymentMethod',
];

const ManualExpense = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [_, addManualExpense] = useMutation(expenseMutation);
  const { setValue, form, setForm, validateRequiredFields } = useForm({
    requiredFields,
  });
  const areFieldsFilled = useMemo(() => validateRequiredFields(), [form]);

  const paymentMutation = async () => {
    try {
      const input = await formatInput(form, user);
      const res = await addManualExpense({ input });
      if (res.error) {
        return Toast.show({ type: 'error', text1: 'Failed to add expense.' });
      }
      return onSuccess();
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Failed to add expense.' });
    }
  };
  const onSuccess = chain([
    () => Toast.show({ type: 'success', text1: 'Successfully added expense.' }),
    () => toFinancialsHome(),
  ]);

  const toFinancialsHome = chain([
    () => navigation.navigate('FinancialsHomePage'),
    () => setForm({}),
  ]);

  return (
    <>
      <Header
        alignment="center"
        title="Manual Expense"
        style={{ title: styles?.title, header: styles?.header }}
        marginTop={getStatusBarHeight() + 7}
        actions={getActions(['back', { onPress: toFinancialsHome }])}
        divider
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Box style={{ flex: 1 }}>
          <Box style={{ flex: 1 }}>
            <Box
              as={ScrollView}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
              width="90%"
              alignSelf="center"
              marginTop="5%"
              flex={1}>
              <Box>
                <InputLabel
                  labelStyle={input_label_14}
                  label={'Due Date'}
                />
                <DateField
                  copy={{ label: 'Due Date', addLabel: 'Set a Date' }}
                  icon={'date'}
                  value={form?.due}
                  onSelect={val => setValue('due', val)}
                  editable={true}
                  Component={Button}
                  triggerKey={'onPress'}
                  inputProps={{
                    icon: Icon('calendar_black', 'pm'),
                    appearance: 'ghost',
                    children: form?.due
                      ? format(form?.due, usaDateFormat)
                      : 'Select Date',
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
                  isRequired
                />
                <DateField
                  copy={{ label: 'Payment Date', addLabel: 'Set a Date' }}
                  icon={'date'}
                  value={form?.paidAt}
                  onSelect={val => setValue('paidAt', val)}
                  editable={true}
                  Component={Button}
                  triggerKey={'onPress'}
                  inputProps={{
                    icon: Icon('calendar_black', 'pm'),
                    appearance: 'ghost',
                    children: form?.paidAt
                      ? format(form?.paidAt, usaDateFormat)
                      : 'Payment Date',
                    textStyle: styles.dateFieldText,
                    style: styles.dateField,
                    size: 'large',
                  }}
                  isRequired
                  isGreyCalendar={true}
                  isScrollCalendar
                />
              </Box>

              <BuildingField
                setValue={val => setValue('building', val)}
                value={form?.building}
                isRequired
                removeItem={(v, i) => removeItem(setValue, 'building', v, i)}
              />

              <UnitField
                setValue={val => setValue('unit', val)}
                value={form?.unit}
                buildingId={form?.building?.pk}
                removeItem={(v, i) => removeItem(setValue, 'unit', v, i)}
                subtitle={'Optional'}
              />

              <ServiceField
                limit={1}
                setValue={val => setValue('service', val)}
                value={form?.service}
                isRequired
                removeItem={(v, i) => removeItem(setValue, 'service', v, i)}
              />

              <ServiceProviderField
                limit={1}
                setValue={val => setValue('serviceProvider', val)}
                value={form?.serviceProvider}
                serviceId={form?.service?.id}
                isRequired
                removeItem={(v, i) =>
                  removeItem(setValue, 'serviceProvider', v, i)
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
                removeItem={(v, i) => {
                  delete form.amount;
                  delete form.paymentMethod;
                  setValue(() => setForm({}));
                }}
                isRequired
              />
              <AttachmentField
                setValue={val => setValue('document', val)}
                value={form?.document}
                removeItem={(v, i) => removeItem(setValue, 'document', v, i)}
              />
              <Box mb={-15}>
                <InputLabel
                  fontWeight="bold"
                  label="Notes"
                  labelStyle={{
                    ...typography['body/medium – medium'],
                    textTransform: 'uppercase',
                    color: colors['gray scale/40'],
                  }}
                />
                <TextInput
                  onChangeText={val => setValue('description', val)}
                  value={form?.description}
                  style={styles.notesInput}
                  multiline
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
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </>
  );
};

const formatInput = async (form, user) => ({
  payerId: user.pk,
  recipientId: form?.serviceProvider?.pk,
  unitId: form?.unit?.pk,
  buildingId: form?.building.pk,
  paymentMethod: form?.paymentMethod?.text?.toLowerCase(),
  due: form?.due,
  paidAt: form?.paidAt,
  amount: form?.amount,
  notes: form?.description,
  attachment: await formatFileToBase64Input(form?.document?.[0]),
});

export default ManualExpense;

// import React from 'react';
// import TaskScreenLayout from 'components/TaskScreenLayout';
// import {
//   TRANSACTION_TYPE,
//   PAYMENT_METHODS,
//   stringifyEnumKey,
//   stringifyEnumValue,
// } from 'constants/enums';
// import {TaskInput, TaskSelectInput} from 'pages/tasks/EditTask';
// import Box from 'components/Box';
// import Text from 'components/Text';
// import Collapsible from 'react-native-collapsible';
// import * as yup from 'yup';
// import viewTransactionQuery from 'queries/financials/viewTransaction.gql';
// import buildingSelectQuery from 'queries/properties/listPropertiesSelect.gql';
// import unitSelectQuery from 'queries/properties/listUnitsSelect.gql';
// import createTransactionMutation from 'queries/financials/createTransaction.gql';
// import useForm from 'react-hook-form';
// import SelectButtonInput from 'components/SelectButtonInput';
// import SubmitButton from 'components/SubmitButton';
// import Form from 'components/Form';
// import {useMutation, useQuery} from 'urql';
// import {Spinner, Layout} from '@ui-kitten/components';
// import format from 'date-fns/format';

// const transformNumber = (value, originalValue) =>
//   +`${originalValue}`.replace(/[^0-9.]+/g, '');

// const paymentFormsFormatted = Object.keys(PAYMENT_METHODS).map(key => ({
//   key: PAYMENT_METHODS[key],
//   title: stringifyEnumKey(key),
// }));

// const schema = yup.object().shape({
//   name: yup
//     .string()
//     .required()
//     .label('Title'),
//   amount: yup
//     .number()
//     .positive()
//     .required()
//     .transform(transformNumber)
//     .label('Amount'),
//   building: yup
//     .object()
//     .shape({
//       id: yup.string().required(),
//       displayName: yup.string(),
//     })
//     .nullable()
//     .label('Building'),
//   unit: yup
//     .object()
//     .shape({
//       id: yup.string().required(),
//       unitNumber: yup.string().max(5),
//     })
//     .nullable()
//     .label('Unit'),
//   date: yup
//     .date()
//     .required()
//     .label('Date'),
//   paymentForm: yup
//     .object()
//     .shape({
//       key: yup
//         .mixed()
//         .oneOf(Object.values(PAYMENT_METHODS))
//         .required(),
//     })
//     .required()
//     .label('Form of payment'),
// });

// const EditTransaction = ({route, navigation}) => {
//   const [error, setError] = React.useState(null);
//   const [createRes, createTransaction] = useMutation(createTransactionMutation);
//   const transactionId = route.params?.id;
//   const initialValuesSet = React.useRef(false);

//   const [res, executeQuery] = useQuery({
//     query: viewTransactionQuery,
//     variables: {
//       id: transactionId,
//     },
//     pause: !transactionId,

//     requestPolicy: 'network-only',
//   });
//   const isNew = !transactionId;
//   const transaction = res.data?.transaction;
//   const typeString =
//     (transaction?.id ? transaction.transactionType : route.params?.type) ===
//     TRANSACTION_TYPE.INCOME
//       ? 'Payment'
//       : 'Expense';

//   const initialValues = React.useMemo(() => {
//     const data = res.data?.transaction;
//     if (data) {
//       initialValuesSet.current = false;
//     }
//     return data
//       ? {
//           ...data,
//           date: new Date(data.createdAt),
//           paymentForm: {
//             key: data.paymentForm,
//             title: stringifyEnumValue(PAYMENT_METHODS, data.paymentForm),
//           },
//         }
//       : {};
//   }, [res.data]);

//   const {
//     register,
//     setValue,
//     handleSubmit,
//     errors,
//     unregister,
//     getValues,
//     watch,
//     formState: {touched, isSubmitting},
//   } = useForm({
//     defaultValues: initialValues || {},
//     validationSchema: schema,
//   });

//   React.useEffect(() => {
//     const values = getValues();
//     if (initialValues && !initialValuesSet.current) {
//       Object.keys(initialValues).forEach(k => setValue(k, initialValues[k]));
//       initialValuesSet.current = true;
//     }
//   }, [getValues, initialValues, setValue, touched]);

//   React.useEffect(() => {
//     Object.keys(schema.fields).forEach(name => register({name}));
//     return () => {
//       Object.keys(schema.fields).forEach(name => unregister({name}));
//     };
//   }, [register, unregister]);

//   const watching = watch([
//     'building',
//     'unit',
//     'date',
//     'amount',
//     'paymentForm',
//     'date',
//   ]);

//   const buildingListProps = React.useMemo(
//     () => ({
//       dataExtractor: data => data.buildings,
//       labelExtractor: item => item.displayName,
//       keyExtractor: item => item.id,
//     }),
//     [],
//   );

//   const unitListProps = React.useMemo(
//     () => ({
//       dataExtractor: data => data.units,
//       labelExtractor: item => `${item.unitNumber}`,
//       keyExtractor: item => item.id,
//       variables: {buildingId: watching.building?.id},
//     }),
//     [watching.building],
//   );

//   const onSubmit = React.useCallback(
//     form => {
//       const transactionData = {
//         ...form,
//         id: transactionId,
//         building: form.building?.id,
//         unit: form.unit?.id,
//         paymentForm: form.paymentForm.key,
//         transactionType: transaction?.id
//           ? transaction.transactionType
//           : route.params?.type,
//       };
//       const submit = async () => {
//         const res = await createTransaction({
//           transactionData,
//         });
//         if (res.data?.createTransaction?.transaction?.id) {
//           route?.params?.onUpdate?.();
//           navigation.goBack();
//         } else {
//           setError(
//             (res.error.message || '').replace(
//               /\[(Network Error|GraphQL)\]\s*/g,
//               '',
//             ),
//           );
//         }
//       };
//       submit();
//     },
//     [createTransaction, navigation, route, transaction, transactionId],
//   );

//   const submitting = isSubmitting || createRes.fetching;

//   return (
//     <TaskScreenLayout
//       headerProps={{
//         title: `${isNew ? 'Add' : 'Edit'} ${typeString}`,
//         actions: [
//           {
//             icon: 'arrow-ios-back',
//             onPress: () => navigation.goBack(),
//             left: true,
//           },
//         ],
//       }}>
//       <Box px="2" position="relative">
//         {submitting ? (
//           <Box
//             as={Layout}
//             opacity={0.6}
//             position="absolute"
//             zIndex={1}
//             left={0}
//             top={0}
//             right={0}
//             bottom={0}
//             pt={16}
//             alignItems="center"
//             justifyContent="center"
//             pointerEvents="box-none">
//             <Spinner size="giant" />
//           </Box>
//         ) : null}
//       </Box>
//       <Box flex={1}>
//         <Form onSubmit={handleSubmit(onSubmit)}>
//           <Box mb={20} mt="2">
//             <TaskInput
//               placeholder={`Enter ${typeString.toLowerCase()} type`}
//               category="heading-2"
//               autoFocus
//               appearance="transparent"
//               defaultValue={initialValues?.name}
//               status={errors.name && 'danger'}
//               caption={errors.name?.message}
//               onChangeText={val => setValue('name', val)}
//             />
//           </Box>
//           {error ? (
//             <Box mb="3" mx="3">
//               <Text category="c1" status="danger">
//                 {error}
//               </Text>
//             </Box>
//           ) : null}
//           <Text ml="3" mt="2" category="label">
//             Amount
//           </Text>
//           <TaskInput
//             placeholder="Enter amount"
//             // defaultValue={initialValues?.content}
//             status={errors.amount && 'danger'}
//             caption={errors.amount?.message}
//             onChangeText={val => setValue('amount', val)}
//             value={
//               watching.amount &&
//               `$${`${watching.amount || ''}`.replace(/[^0-9\.]+/g, '')}`
//             }
//           />

//           <Text ml="3" mt="2" category="label">
//             Form of Payment
//           </Text>
//           <TaskSelectInput
//             status={errors.paymentForm && 'danger'}
//             caption={errors?.paymentForm?.message}
//             options={paymentFormsFormatted}
//             onSelect={val => setValue('paymentForm', val)}
//             value={watching.paymentForm?.title}
//             placeholder="Select a payment form"
//           />

//           <SelectButtonInput
//             mx="3"
//             mt="2"
//             label="Date"
//             addLabel="Select Date"
//             labelTransform={null}
//             value={
//               watching.date && format(watching.date, 'MMM do, yyyy, KK:mm a')

//               // `${watching.date?.toLocaleString?.(undefined, {
//               //   month: 'short',
//               //   day: '2-digit',
//               //   year: 'numeric',
//               //   hour: '2-digit',
//               //   minute: '2-digit',
//               // })}`
//             }
//             onAdd={() =>
//               navigation.navigate('SelectDate', {
//                 value: watching.date,
//                 onSelect: date => setValue('date', date),
//               })
//             }
//             mb={30}
//           />

//           <Text ml="3" mt="2" category="label">
//             Assign To Property
//           </Text>
//           <TaskSelectInput
//             mt={-1}
//             options={buildingSelectQuery}
//             listProps={buildingListProps}
//             status={errors.building && 'danger'}
//             caption={errors.building?.message}
//             onSelect={val => setValue('building', val)}
//             value={watching.building?.displayName}
//             touched={touched.indexOf('building') !== -1}
//             emptyOption="All Buildings"
//             placeholder="Choose a building"
//           />
//           <Collapsible collapsed={!watching.building?.id}>
//             {watching.building?.id ? (
//               <TaskSelectInput
//                 mt={-3}
//                 options={unitSelectQuery}
//                 listProps={unitListProps}
//                 status={errors.unit && 'danger'}
//                 caption={errors.unit?.message}
//                 onSelect={val => setValue('unit', val)}
//                 value={
//                   watching.unit?.unitNumber && `${watching.unit.unitNumber}`
//                 }
//                 touched={touched.indexOf('unit') !== -1}
//                 emptyOption="All Units"
//                 placeholder="Choose a unit"
//               />
//             ) : null}
//           </Collapsible>
//         </Form>
//       </Box>
//       <Box my="3" mb="4" mx="3">
//         <SubmitButton
//           gradient
//           shape="circle"
//           size="large"
//           loading={isSubmitting}
//           onPress={handleSubmit(onSubmit)}>
//           {isNew ? 'Add' : 'Edit'} {typeString}
//         </SubmitButton>
//       </Box>
//     </TaskScreenLayout>
//   );
// };

// export default EditTransaction;

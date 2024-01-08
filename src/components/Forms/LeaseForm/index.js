import React, { useEffect, useMemo, useRef } from 'react';
import FullPageBottomModal from 'components/FullPageBottomModal';
import { ScrollView } from 'react-native';
import { useForceUpdate } from 'hooks/useForceUpdate';
import { useForm } from 'hooks/useForm';
import Box from 'components/Box';
import Button from 'components/Button';
import LeaseFormFields from './LeaseFormFields';
import FormError from '../FormError';
import { getLeaseRequiredFields } from './LeaseFormFields/helper';
import { isValidAmountInput } from '../Fields/AmountInput';
import { t } from 'helpers/react';
import { button_styles } from 'styles/button';

const LeaseForm = ({
  onSubmit,
  containerProps,
  isModal,
  visible,
  onHide,
  submitBtn,
  submitBtnTxt = 'Save',
  initialValues,
  ...props
}) => {
  const scrollRef = useRef();
  const requiredFields = useMemo(() => getLeaseRequiredFields(props), [props]);

  const [forceUpdate, updateKey] = useForceUpdate();
  const {
    setForm,
    form,
    handleSubmit,
    setValue,
    error,
    onValidationChange,
  } = useForm({
    initialValues,
    onSubmit,
    requiredFields,
    scrollViewRef: scrollRef?.current,
  });

  useEffect(forceUpdate, [
    form.tenant,
    form.building,
    form?.unit,
    form.start,
    form.end,
    form.paymentMethods,
    form.attachments,
    error,
  ]);
  const modalProps = useMemo(
    () =>
      isModal && {
        as: FullPageBottomModal,
        onDone: () => handleSubmit(),
        visible,
        title: 'Add Lease',
        onHide: onHide,
      },
    [isModal, onSubmit, visible, handleSubmit, onHide],
  );

  const handleUnitChange = unit => {
    const priceAmounts = isValidAmountInput(unit?.price) && {
      rentAmount: unit.price.toFixed(2),
      securityDeposit: unit.price.toFixed(2),
    };
    setForm({ ...form, unit, ...priceAmounts });
  };

  return (
    <Box {...modalProps}>
      <ScrollView ref={scrollRef}>
        <FormError mt={3} mx={0} my={0} error={error} />
        <LeaseFormFields
          value={form}
          setValue={setValue}
          onUnitChange={handleUnitChange}
          onValidationChange={onValidationChange}
          key={updateKey}
          {...props}>
          {t(
            submitBtn,
            <Box
              as={Button}
              {...button_styles.primary}
              mt={18}
              mb={10}
              children={submitBtnTxt}
              onPress={() => handleSubmit()}
              minHeight={48}
            />,
          )}
        </LeaseFormFields>
      </ScrollView>
    </Box>
  );
};

export default LeaseForm;

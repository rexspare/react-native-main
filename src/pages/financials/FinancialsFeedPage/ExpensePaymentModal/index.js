import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Icon } from '@ui-kitten/components';
import BottomHalfModal from 'components/BottomHalfModal';
import Box from 'components/Box';
import Button from 'components/Button';
import { chain } from 'helpers/func';
import { styles } from './styles';

const microcopy = { title: 'ADD NEW' };

const ExpensePaymentModal = ({ onHide, ...props }) => {
  const navigation = useNavigation();

  const handlePress = chain([
    pageName => navigation.navigate(pageName),
    () => onHide(),
  ]);

  return (
    <BottomHalfModal
      closeIcon={false}
      onHide={onHide}
      styles={{ headerTxt: { fontSize: 18, fontWeight: '700' } }}
      doneText="DONE"
      displayDone={false}
      displayDoneRight
      {...microcopy}
      {...props}>
      <Box style={styles.secHeadContainer}>
        <Box
          as={Button}
          appearance="ghost"
          icon={() => (
            <Icon name={'manualExpense'} pack="pm" height={20} width={20} />
          )}
          style={styles.button}
          textStyle={styles.buttonsTextStyle}
          onPress={() => handlePress('ManualExpense')}>
          Manual Expense
        </Box>
        <Box
          as={Button}
          appearance="ghost"
          icon={() => (
            <Icon name={'manualPayment'} pack="pm" height={20} width={20} />
          )}
          style={styles.button}
          onPress={() => handlePress('ManualPaymentPage')}
          textStyle={styles.buttonsTextStyle}>
          Manual Payment
        </Box>
      </Box>
    </BottomHalfModal>
  );
};
export default ExpensePaymentModal;

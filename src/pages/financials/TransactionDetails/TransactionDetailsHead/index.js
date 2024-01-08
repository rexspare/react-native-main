import React from 'react';
import Box from 'components/Box';
import UserCashInfo from '../UserCashInfo';
import { styles } from "../styles"

const TransactionDetailsHead = ({ amountDue, amountPaid, picture, name, date, amount, paymentMethod, isIncoming, isOutstanding, displayFeatures, notice }) => {
    return (
        <Box style={styles.profileContainer}>
            <UserCashInfo
                isIncoming={isIncoming}
                date={date}
                amount={amount}
                paymentMethod={paymentMethod}
                amountDue={amountDue}
                amountPaid={amountPaid}
                displayFeatures={displayFeatures}
                notice={notice}
            />
        </Box>
    )
}

export default TransactionDetailsHead
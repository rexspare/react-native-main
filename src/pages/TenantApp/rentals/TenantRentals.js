import React, { useState } from 'react';
import PaymentHistory from 'pages/profile/PaymentHistory';
import HeadedScreenWithTabs from 'components/HeadedScreenWithTabs';
import TenantPaymentsList from './TenantPaymentsList';
import { getActions } from 'constants/actions';

const tabs = [
  { text: 'Payments Due', filter: { isPaid: false, orderBy: 'due' } },
  { text: 'Payment History', filter: { isPaid: true, orderBy: '-due' } },
];

const TenantRentals = ({ navigation }) => {
  const [variables, setVariables] = useState(tabs?.[0].filter);
  return (
    <HeadedScreenWithTabs
      header="Payments"
      options={tabs}
      onSelect={({ filter }) => setVariables(filter)}
      style={{
        title: {
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}
      actions={getActions(['export'])}>
      {!variables.isPaid ? (
        <TenantPaymentsList navigation={navigation} variables={variables} />
      ) : (
        <PaymentHistory navigation={navigation} variables={variables} />
      )}
    </HeadedScreenWithTabs>
  );
};

export default TenantRentals;

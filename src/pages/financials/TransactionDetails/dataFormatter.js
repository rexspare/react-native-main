import { compact } from 'lodash';
import { styles } from './styles';

const getTransactionDetailedCardsData = (
  data = {},
  isOutstanding,
  onViewAllTransactions,
  isIncoming,
) => {
  if (!data) return [];
  return compact([
    isIncoming && {
      label: 'Tenant',
      content: {
        uri: data?.payer?.picture,
        text: data?.payer?.fullName,
        buttonText: 'View all ' + (!isOutstanding ? 'transactions' : 'debts'),
        onPress: () =>
          onViewAllTransactions({
            payer: data.payer?.pk,
            ...(isOutstanding && { isOverdue: isOutstanding }),
          }),
      },
      styles: styles.tenantStyle,
      variables: {
        payer: data.payer?.pk,
        ...(isOutstanding && { isOverdue: isOutstanding }),
      },
    },
    {
      label: 'Building',
      content: {
        uri: data.building?.photos?.[0],
        text: data.building?.address,
        ...(!isOutstanding && {
          buttonText: 'View all transactions',
          onPress: () => onViewAllTransactions({ building: data.building?.pk }),
        }),
      },
      variables: { building: data.building?.pk },
    },
    {
      label: 'Unit',
      content: {
        uri: data.unit?.photos?.[0],
        text: data?.unit?.unitNumber,
        ...(!isOutstanding && {
          buttonText: 'View all transactions',
          onPress: () => onViewAllTransactions({ unit: data.unit?.pk }),
        }),
      },
      variables: { unit: data.unit?.pk },
    },
    // {
    //   label: 'Type of service',
    //   content: {
    //     uri: data.categoryImage,
    //     text: data.categoryName,
    //     buttonText: 'View all transactions',
    //     // onPress: () => onViewAllTransactions({}),
    //   },
    // },
    !isIncoming && {
      label: 'Provider',
      content: {
        uri: data?.recipient?.picture,
        text: data?.recipient?.fullName,
        subText: data.categoryName,
        buttonText: 'View all transactions',
        // onPress: () => onViewAllTransactions({}),
      },
      styles: styles.providerStyle,
    },
    {
      label: 'Description',
      content: {
        text: data.notes,
      },
      styles: styles.descriptionStyle,
    },
  ]).filter(item => !!item?.content?.text);
};

export { getTransactionDetailedCardsData };

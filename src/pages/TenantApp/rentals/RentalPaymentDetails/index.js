import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import HeadedScreen from 'components/HeadedScreen';
import WhiteCard from 'components/Cards/WhiteCard';
import WhiteFeaturesCard from 'components/Features/WhiteFeaturesCard';
import LeasePaymentButton from 'components/RentalCard/LeasePaymentButton';
import Text from 'components/Text';
import Box from 'components/Box';
import { dateToLabel } from 'helpers/list';
import { getActions } from 'constants/actions';
import { dateFormat } from 'constants/dateFormat';
import { colors } from 'styles/theme';
import { styles } from './styles';

//TODO: Get real data
const roomMates = [
  {
    name: 'Esther Howard',
    isPaid: true,
    paidDate: '2022-11-07',
  },
  {
    name: 'Marvin McKinney',
    isPaid: true,
    paidDate: '2022-11-07',
  },
  {
    name: 'Jenny Wilson',
    isPaid: false,
    paidDate: null,
  },
];

const RentalPaymentDetails = ({ route, navigation }) => {
  const { item, status } = route.params;

  const roommatesPayment = (isPaid, i) => {
    return !isPaid ? (
      <Text color={colors['primary/brand']} fontWeight="400">
        {' '}
        Not Paid
      </Text>
    ) : (
      <Box>
        <Text
          textAlign="right"
          color={colors['primary/50 – brand']}
          fontWeight="400">
          Paid
        </Text>
        <Text color={colors['gray scale/90']} fontWeight="400">
          {dateToLabel(i?.paidDate, dateFormat)}
        </Text>
      </Box>
    );
  };

  const features = useMemo(
    () => [
      {
        label: 'Building Name',
        content: item?.lease?.unit?.building?.name,
      },
      {
        label: 'Unit',
        content: item?.lease?.unit?.unitNumber,
      },
      {
        label: 'Address',
        content: `${item?.lease?.unit?.building?.address},
                ${item?.lease?.unit?.building?.state},  ${item?.lease?.unit?.building?.zip}`,
        numberOfLines: 2
      },
      {
        label: 'Amount',
        content:
          item?.amount &&
          '$' +
            item?.amount?.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
      },
      {
        label: 'Due Date',
        content: dateToLabel(item?.due, dateFormat),
        hideBottomBorder: true
      },
      status === 'PAID' && {
        label: 'Date Paid',
        content: dateToLabel(item?.latestPayment, dateFormat),
      },
    ],
    [item],
  );

  const roommates = useMemo(() =>
    roomMates.map(e => ({
      label: e.name,
      contentJsx: roommatesPayment(e.isPaid, e),
    })),
  );

  return (
    <HeadedScreen
      title={'Details'}
      headerStyle={styles.header}
      style={{
        title: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}
      actions={getActions(
        ['back', { onPress: () => navigation.goBack() }],
        ['export'],
      )}>
      <ScrollView>
        <WhiteCard
          flex={1}
          marginTop={2}
          alignItems={'center'}
          backgroundColor={colors['gray scale/5']}>
          <WhiteFeaturesCard
            features={features}
            containerProps={{
              header: 'General',
              marginTop: 3,
              headerStyle: styles.featuresHeader,
              paddingTop: 10,
              paddingBottom: 20
            }}
            styles={{
              features: {
                content: { ...styles.whiteCardRow, ...styles.whiteCardContent },
                label: { ...styles.whiteCardRow, ...styles.whiteCardLabel },
              },
            }}
          />
          <WhiteFeaturesCard
            features={roommates}
            containerProps={{
              header: 'ROOMMATES',
              marginTop: 3,
              paddingTop: 30,
              headerStyle: styles.featuresHeader,
              paddingBottom: 10
            }}
            styles={{
              features: {
                content: { ...styles.whiteCardRow, ...styles.whiteCardContent },
                label: { ...styles.whiteCardRow, ...styles.whiteCardLabel },
              },
            }}
          />
        </WhiteCard>
        <LeasePaymentButton
          style={{
            marginTop: 34,
            marginHorizontal: 20,
            width: '90%',
            minHeight: 48,
          }}
          status={status}
          paymentId={item?.id}
        />
      </ScrollView>
    </HeadedScreen>
  );
};

export default RentalPaymentDetails;

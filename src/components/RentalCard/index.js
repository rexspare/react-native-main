import React from 'react';
import differenceInDays from 'date-fns/differenceInDays';
import Text from 'components/Text';
import Box from 'components/Box';
import Row from 'components/Row';
import TouchableText from '../TouchableText';
import LeasePaymentButton from './LeasePaymentButton';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const RentalCard = ({
  image,
  price,
  due,
  unit,
  onPay,
  pending,
  status,
  paidDate,
  onViewDetails,
  id,
  notes,
  ...props
}) => {
  const now = new Date();
  const diff = differenceInDays(due || now, now);

  return (
    <Box
      mx={16}
      mt="3"
      borderRadius={12}
      borderColor={colors['gray scale/5']}
      borderWidth={1}
      {...props}>
      <Box mx={15} mt={12}>
        <Row justifyContent={'space-between'}>
          <Text
            style={{
              ...typography['body/xlarge – medium'],
              textTransform: 'capitalize',
            }}>
            {notes}
          </Text>
          <Box>
            {diff > 0 ? (
              <Text style={typography['body/small – regular']}>
                {diff} Days
              </Text>
            ) : (
              <Text
                style={{
                  ...typography['body/small – regular'],
                  textTransform: 'uppercase',
                }}
                color={colors['primary/brand']}>
                {diff === 0 ? 'Today' : 'Overdue'}
              </Text>
            )}
          </Box>
        </Row>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text style={typography['body/small – regular']}>
            {unit.building.name || unit.building.address}
            <Text
              style={typography['body/small – regular']}
              color={colors['gray scale/20']}>
              {' '}
              /{' '}
            </Text>
            {unit.unitNumber}
          </Text>
          <Text style={typography['body/xlarge – medium']}>
            {price &&
              '$' +
                price?.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
          </Text>
        </Box>

        <Box
          mt={28}
          mb={16}
          width={'100%'}
          alignSelf="center"
          alignItems={'center'}>
          <LeasePaymentButton status={status} paymentId={id} />
          <TouchableText
            mt={12}
            style={{
              ...typography['body/small – normal'],
              marginTop: 5,
              textDecorationLine: 'underline',
              textDecorationStyle: 'solid',
            }}
            onPress={onViewDetails}>
            View Details
          </TouchableText>
        </Box>
      </Box>
    </Box>
  );
};

export default RentalCard;

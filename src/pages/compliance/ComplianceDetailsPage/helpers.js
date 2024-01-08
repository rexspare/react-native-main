import React from 'react';
import { Linking } from 'react-native';
import Box from 'components/Box';
import Button from 'components/Button';
import Text from 'components/Text';
import { formatAmount } from 'utils/exchanges';
import { format } from 'helpers/date';
import { dateFormat } from 'constants/dateFormat';
import { colors } from 'styles/theme';
import styles from './styles';
import { typography } from 'styles/typography';

export const complianceColors = {
  HPD: colors['additional/success'],
  ECB: colors['primary/brand'],
  DOB: colors['gray scale/40'],
};

export default {
  formatFeatures: (data, route) => [
    {
      label: 'Status',
      content: data?.status,
    },
    {
      label: 'Agency',
      content: data?.source,
    },
    {
      label: 'Issue Date',
      content: format(data?.issueDate, dateFormat, null, {
        toDate: true,
      }),
    },
    {
      label: 'Address',
      content: data?.building?.fullAddress,
    },
    {
      label: route?.params?.title + ' #',
      content: data?.idInSupplier,
    },
    {
      label: 'Penalty Amount',
      content: formatAmount(data?.price),
    },
    data?.description && {
      label: 'Description',
      contentJsx: (
        <Box width="100%" paddingLeft={2}>
          <Text style={{ ...typography['body/medium – regular'] }}>{data?.description}</Text>
        </Box>
      ),
      styles: styles.descriptionFeature,
    },
    data?.weblink && {
      label: 'Government Site',
      contentJsx: (
        <Button
          appearance="outline"
          style={styles.viewButton}
          onPress={() => Linking.openURL(data?.weblink)}>
          VIEW
        </Button>
      ),
      hideBottomBorder: true,
    },
  ],
};

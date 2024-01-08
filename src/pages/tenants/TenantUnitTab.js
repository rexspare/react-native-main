import React, { useEffect, useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';
import format from 'date-fns/format';
import { useMutation, useQuery } from 'urql';
import viewTenantLeaseQuery from 'queries/tenants/viewTenantLease.gql';
import manualLeaseMutation from 'queries/properties/Lease/ManualLeaseMutation.gql';
import { useSetShouldRefresh } from 'hooks/useShouldRefresh';
import FeaturesTab from 'components/ProfilePage/FeaturesTab';
import Box from 'components/Box';
import LeaseField from 'components/Forms/Fields/LeaseField';
import DetailedCard from 'components/DetailedCard';
import Button from 'components/Button';
import { formatLeaseData } from './schema';
import { t } from 'helpers/react';
import { chain } from 'helpers/func';
import { nth } from 'helpers/date';
import { standardDateFormat } from 'constants/dateFormat';
import { TENANT_INFO_TAB } from 'constants/refreshConsts';
import {
  stringifyEnumValue,
  RENT_TYPES,
  PAYMENT_METHODS,
} from 'constants/enums';
import { button_styles } from 'styles/button';
import { typography } from 'styles/typography';
import { styles } from './styles';

const TenantUnitTab = ({ route, navigation, data, isSelf, ...props }) => {
  const [lease, setLease] = useState();
  const [unit, setUnit] = useState();

  const [leaseRes, executeQuery] = useQuery({
    query: viewTenantLeaseQuery,
    variables: {
      id: props?.leaseId,
      tenantTab: false,
      unitTab: true,
      documentsTab: false,
      activityTab: false,
    },
    pause: !props?.leaseId || !!lease,
  });

  useEffect(() => {
    if (leaseRes?.data?.lease) {
      setLease(leaseRes.data?.lease);
      setUnit(leaseRes.data?.lease?.unit);
    }
  }, [leaseRes]);

  const setRefreshInfoTab = useSetShouldRefresh(TENANT_INFO_TAB);

  const formProps = useMemo(
    () => ({
      units: false,
      tenants: false,
      attachments: false,
      submitBtn: false,
      initialValues: {
        paymentMethods: lease?.paymentMethods?.length && lease?.paymentMethods,
        unit,
        rentDay: {
          key: lease?.rentDay,
        },
        building: unit?.building,
        start: lease?.start && new Date(lease?.start),
        end: lease?.end && new Date(lease?.end),
        securityDeposit: `${lease?.securityDeposit || unit?.price}`,
        rentAmount: `${unit?.price}`,
      },
    }),
    [lease, unit],
  );

  const [_, saveLeaseMutation] = useMutation(manualLeaseMutation);

  const saveLease = async data => {
    const dt = {
      ...formatLeaseData(data),
      id: lease?.pk,
      tenantId: lease?.tenant?.pk,
    };
    const res = await saveLeaseMutation(dt);
    if (!res?.data?.lease?.id) console.log('Error', res);
    chain([
      () => setRefreshInfoTab(),
      () => executeQuery({ requestPolicy: 'network-only' }),
      () => Toast.show({ type: 'success', text1: 'Lease Details Saved!' }),
    ])();
  };

  return (
    <>
      <FeaturesTab
        prependder={
          <>
            <DetailedCard
              label={'Building'}
              content={{
                text: unit?.building?.displayName || unit?.building?.address,
                uri: unit?.building?.photos?.[0],
              }}
              styles={styles.buildingTitle}
              headerStyle={styles.header}
              px={2}
            />
            <DetailedCard
              label={'Unit'}
              content={{
                text: unit?.unitNumber,
                uri: unit?.photos?.[0],
              }}
              styles={styles.buildingTitle}
              headerStyle={styles.header}
              px={2}
            />
          </>
        }
        labelProps={styles.label}
        features={[
          { label: 'Floor', content: unit?.floor },
          {
            label: 'Lease Start',
            content: lease?.start
              ? format(new Date(lease.start), standardDateFormat)
              : '',
          },
          {
            label: 'Lease End',
            content: lease?.end
              ? format(new Date(lease.end), standardDateFormat)
              : '',
          },
          {
            label: 'Rent Amount',
            content:
              lease?.rentAmount &&
              '$' +
                lease?.rentAmount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
          },
          {
            label: 'Rent Due',
            content: lease?.rentDay + nth(lease?.rentDay) + ' of Month',
          },
          {
            label: 'Security Deposit',
            content:
              lease?.securityDeposit &&
              '$' +
                lease?.securityDeposit.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
          },
          {
            label: 'Regulation Status',
            content:
              unit?.rentType && stringifyEnumValue(RENT_TYPES, unit?.rentType),
          },
          {
            label: 'Payment Method',
            content:
              lease?.paymentMethods?.length &&
              lease?.paymentMethods
                ?.map(pm => stringifyEnumValue(PAYMENT_METHODS, pm))
                .join(', '),
          },
        ]}>
        {t(
          !isSelf && !lease?.leaseSent,
          <Box mt={4} mx={3}>
            {lease && (
              <LeaseField
                value={false}
                setValue={data => saveLease(data)}
                formProps={formProps}
                isModal={true}
                copy={{ btn: 'Edit Lease Details' }}
                {...button_styles['primary']}
                buttonTextStyle={styles.leaseText}
              />
            )}
          </Box>,
        )}
        <Button
          style={styles.financialButton}
          textStyle={{
            ...typography['body/medium – medium'],
            textTransform: 'uppercase',
          }}
          onPress={() => {}}>
          Financial
        </Button>
      </FeaturesTab>
    </>
  );
};

export default TenantUnitTab;

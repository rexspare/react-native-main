import React, { useEffect, useMemo } from 'react';
import {
  Linking,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useQuery } from 'urql';
import { noop } from 'lodash';
import format from 'date-fns/format';
import viewTenantLeaseQuery from 'queries/tenants/viewTenantLease.gql';
import listTenantReviewsQuery from 'queries/tenants/listTenantReviews.gql';
import { useSetApproveTenantApplicationApproval } from 'hooks/useSetTenantApplicationApproval';
import useShouldRefresh from 'hooks/useShouldRefresh';
import useTheme from 'hooks/useTheme';
import { useIsOpen } from 'hooks/useIsOpen';
import Box from 'components/Box';
import Divider from 'components/Divider';
import InfiniteCarousel from 'components/InfiniteCarousel';
import Text from 'components/Text';
import Dialog from 'components/Dialog';
import FeaturesTab from 'components/ProfilePage/FeaturesTab';
import Button from 'components/Button';
import TenantReviews from '../TenantReviews';
import TenantProfileActions from './TenantProfileActions';
import TenantInviteModal from '../TenantInviteModal';
import { t } from 'helpers/react';
import { CallContact } from 'helpers/number';
import formatPhoneNumber from 'utils/formatPhoneNumber';
import { DENY } from 'constants';
import { usaDateFormat } from 'constants/dateFormat';
import { TENANT_INFO_TAB } from 'constants/refreshConsts';
import { LEASE_STATUS } from 'constants/enums';
import { button_styles } from 'styles/button';
import { typography } from 'styles/typography';
import { styles } from './../styles';

const dims = Dimensions.get('window');

const TenantInfoTab = ({
  route,
  navigation,
  data,
  refetchData = noop,
  isSelf,
  ...props
}) => {
  const theme = useTheme();
  const { isOpen, close, open } = useIsOpen();
  const {
    isOpen: isModalOpen,
    open: openModal,
    close: closeModal,
  } = useIsOpen();

  const carouselRef = React.useRef();
  const [modal, setModal] = React.useState(null);
  const [leaseRes, executeQuery] = useQuery({
    query: viewTenantLeaseQuery,
    variables: {
      id: props?.leaseId,
      tenantTab: true,
      unitTab: false,
      documentsTab: false,
      activityTab: false,
    },
    pause: !props?.leaseId,
  });

  const onRefresh = React.useCallback(() => {
    executeQuery({
      requestPolicy: 'network-only',
    });
    carouselRef.current?.refresh?.();
  }, [executeQuery]);

  useShouldRefresh(TENANT_INFO_TAB, () => {
    executeQuery({
      requestPolicy: 'network-only',
    });
  });

  const lease = leaseRes.data?.lease;

  const tenant = lease?.tenant;

  const carouselProps = React.useMemo(
    () => ({
      query: listTenantReviewsQuery,
      variables: {
        id: lease?.id,
      },
      dataExtractor: data => data?.lease?.tenant?.receivedReviews,
      keyExtractor: item => item.id,
      renderItem: ({ item }) => {
        return (
          <Box>
            <Animated.View>
              <Box
                as={Layout}
                height={192}
                width={dims.width * 0.85}
                borderRadius={10}
                my={3}
                alignSelf="center"
                justifyContent="flex-start">
                <Text style={typography['body/small – bold']} mt={2} mx={3}>
                  {item.reviewer?.fullName}
                </Text>
                <Text
                  style={typography['body/x-small – regular']}
                  numberOfLines={7}
                  mx={3}
                  mb={2}>
                  {item.comment}
                </Text>
              </Box>
            </Animated.View>
          </Box>
        );
      },
    }),
    [lease],
  );

  const onUpdateStatusSuccess = status => {
    route?.params?.refreshList?.();
    if (status === DENY) {
      return navigation.navigate('ListTenants');
    } else {
      // TODO: Optimise, and don't fetch data twice. Maybe unify into a single query.
      onRefresh();
      return refetchData();
    }
  };
  const {
    approve,
    deny,
    confirmModal,
    setApplicationId,
  } = useSetApproveTenantApplicationApproval({
    onSuccess: onUpdateStatusSuccess,
  });

  useEffect(() => {
    if (lease?.application) return setApplicationId(lease?.application?.pk);
  }, [lease?.application]);
  const features = useMemo(() => getFeatures(tenant), [tenant]);

  return (
    <Box as={ScrollView}>
      <FeaturesTab features={features} labelProps={styles.label}>
        <Box py="3" px="3">
          {t(
            !isSelf,
            t(
              lease?.status === LEASE_STATUS.CURRENT,
              <>
                <Divider />
                <Box flexDirection="row" justifyContent="space-between">
                  <Box flexDirection="row">
                    <Text
                      style={{
                        ...typography['body/medium – medium'],
                        marginTop: 10,
                      }}>
                      {tenant?.receivedReviews?.edgeCount
                        ? `Rating`
                        : 'No Ratings'}
                    </Text>
                    {t(
                      tenant?.receivedReviews?.edgeCount,
                      <Text
                        style={{
                          ...typography['body/medium – medium'],
                          marginTop: 11,
                        }}
                        mx="1"
                        color={theme['primary/50']}>
                        {`${tenant?.averageScore}%`}
                      </Text>,
                    )}
                  </Box>
                  {t(
                    tenant?.receivedReviews?.edgeCount,
                    <Box as={TouchableOpacity} onPress={open}>
                      <Text
                        style={{
                          ...typography['body/medium – medium'],
                          marginTop: 11,
                        }}
                        color={theme['primary/50']}>
                        See all reviews
                      </Text>
                    </Box>,
                  )}
                </Box>
                {tenant?.receivedReviews?.edgeCount ? (
                  <InfiniteCarousel
                    containerCustomStyle={{ alignSelf: 'center' }}
                    contentContainerCustomStyle={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    itemWidth={dims.width * 0.85}
                    inactiveSlideOpacity={1}
                    sliderWidth={dims.width}
                    hasParallaxImages
                    useScrollView
                    autoplay
                    ref={carouselRef}
                    {...carouselProps}
                  />
                ) : null}
              </>,
            ),
          )}
          {t(
            !isSelf && !route?.params?.params?.isArchived,
            <TenantProfileActions
              navigation={navigation}
              lease={lease}
              tenant={tenant}
              approveApplication={approve}
              denyApplication={deny}
              onRefresh={onRefresh}
              onSwitchToTab={props?.onSwitchToTab}
              {...route?.params?.params}
            />,
          )}
          {t(
            route?.params?.params?.isArchived,
            <Box mt={25}>
              <Button
                children={'RESTORE'}
                onPress={() =>
                  route?.params?.restoreDeniedTenant(lease?.application?.pk)
                }
                {...button_styles['primary']}
                size="large"
              />
            </Box>,
          )}
          <Dialog
            visible={!!modal}
            onHide={() => setModal(null)}
            {...(modal || {})}
          />
          {tenant?.invitationSent ||
          isSelf ||
          route?.params?.params?.isArchived ? null : (
            <Box py="3">
              <Button
                appearance="outline"
                shape="circle"
                {...button_styles['bordered_clear']}
                onPress={openModal}
                size="large">
                Send Invite
              </Button>
            </Box>
          )}
          <TenantInviteModal
            isVisible={isModalOpen}
            onHide={closeModal}
            id={tenant?.pk}
            tenantName={tenant?.firstName}
            onSuccess={onRefresh}
          />
        </Box>
        <TenantReviews isOpen={isOpen} close={close} lease={lease} />
      </FeaturesTab>
      {confirmModal}
    </Box>
  );
};

const getFeatures = tenant => {
  let features = [
    {
      label: 'Phone Number',
      content: formatPhoneNumber(tenant?.phone),
      onContentPress: () => CallContact(tenant?.phone),
    },
    {
      label: 'Email',
      content: tenant?.email,
      onContentPress: () => Linking.openURL(`mailto:${tenant?.email}`),
    },
    { label: 'Occupation', content: tenant?.occupation },
    {
      label: 'Birthday',
      content:
        tenant?.birthday && format(new Date(tenant.birthday), usaDateFormat),
    },
    { label: 'Driver License', content: tenant?.drivingLicense },
    { label: 'Passport Number', content: tenant?.passport },
    { label: 'SSN', content: tenant?.ssn },
    { label: 'Emergency Contact', content: tenant?.emergencyContact },
    {
      label: 'Emergency Contact Number',
      content: formatPhoneNumber(tenant?.emergencyContactPhone),
      onContentPress: () => CallContact(tenant?.emergencyContactPhone),
    },
    { label: 'Address', content: tenant?.address },
  ];

  tenant?.referees?.edges?.map(({ node: r }) => {
    features = [
      ...features,
      ...[
        { label: 'Referee Name', content: r?.name },
        { label: 'Referee Address', content: r?.address },
        { label: 'Referee Phone Number', content: formatPhoneNumber(r?.phone) },
      ],
    ];
  });
  return features;
};

export default TenantInfoTab;

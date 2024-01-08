import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Dimensions, Animated, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ScrollView } from 'react-native-gesture-handler';
import { Layout } from '@ui-kitten/components';
import { useQuery, useMutation } from 'urql';
import useTheme from 'hooks/useTheme';
import viewServiceProviderQuery from 'queries/services/viewServiceProvider.gql';
import publishServiceProviderMutation from 'queries/services/publishServiceProvider.gql';
import getServiceProviderReview from 'queries/services/ViewUserReview.gql';
import { useLoader } from 'hooks/useLoader';
import useAuth from 'hooks/useAuth';
import AuthContext from 'providers/auth';
import Dialog from 'components/Dialog';
import Button from 'components/Button';
import HeadedScreen from 'components/HeadedScreen';
import Box from 'components/Box';
import RankBadge from 'components/RankBadge';
import Text from 'components/Text';
import ProfileHeadCard from 'components/ProfileHeadCard';
import WorkHours from 'components/WorkHours';
import FeaturesTab from 'components/ProfilePage/FeaturesTab';
import formatPhoneNumber from 'utils/formatPhoneNumber';
import { t } from 'helpers/react';
import { getActions } from 'constants/actions';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import { styles } from './styles';

const ViewServiceProvider = ({ navigation, route }) => {
  const { permissions } = useContext(AuthContext);
  const theme = useTheme();
  const { user } = useAuth();
  const dims = Dimensions.get('window');
  const [refreshing, setRefreshing] = React.useState(false);
  const [publicModalVisible, setPublicModalVisible] = React.useState(false);
  const [review, setReview] = useState();

  const providerId = route?.params?.id;

  const [res, executeQuery] = useQuery({
    query: viewServiceProviderQuery,
    variables: {
      id: providerId,
    },
  });
  const provider = res.data?.serviceProvider;
  const [publishRes, publishProvider] = useMutation(
    publishServiceProviderMutation,
  );

  const [userReview, executeReviewQuery] = useQuery({
    query: getServiceProviderReview,
    variables: {
      serviceProviderId: provider?.pk,
      reviewer: user?.pk,
    },
    pause: !!user?.pk && !!review,
  });

  useEffect(() => {
    setReview(userReview?.data?.serviceProviderRate?.edges[0]?.node);
  }, [userReview]);

  React.useEffect(() => {
    if (refreshing && !res.fetching) {
      setRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res.fetching]);

  const { loader } = useLoader({ isLoading: res.fetching });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    executeQuery({ requestPolicy: 'network-only' });
    executeReviewQuery({ requestPolicy: 'network-only' });
  }, [executeQuery]);

  const onPublish = React.useCallback(() => {
    const publish = async () => {
      setPublicModalVisible(true);
      const pubRes = await publishProvider({ id: providerId });
      onRefresh();
    };
    publish();
  }, [onRefresh, providerId, publishProvider]);

  const reviews = React.useMemo(() => {
    return provider?.topReviews?.edges?.map(e => e.node) ?? [];
  }, [provider]);

  const canManage = React.useMemo(() => {
    return provider?.creator?.id === user?.id;
  }, [provider, user]);

  const workHours = provider?.hours?.[0] && (
    <WorkHours data={provider?.hours} textStyle={{ fontSize: 14 }} />
  );

  const reviewer = name => {
    if (name) {
      const reviewer = name?.split(' ');
      return reviewer[0] + ' ' + reviewer[1]?.charAt(0) + '.';
    }
  };

  const renderReviewSlide = React.useCallback(
    ({ item, index, count }, { scrollPosition }) => {
      const slidePosition = (dims.width / 3 + 15) * index;
      const offset = dims.width / 6;

      return (
        <Box>
          <Animated.View
            style={{
              opacity: scrollPosition.interpolate({
                inputRange: [
                  slidePosition - offset,
                  slidePosition,
                  slidePosition + offset,
                ],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp',
              }),
            }}>
            <Box
              width={dims.width}
              alignSelf="center"
              alignItems="center"
              style={{ position: 'relative' }}>
              <Box
                height={192}
                width={dims.width - 40}
                borderRadius={10}
                alignSelf="center"
                justifyContent="flex-start"
                px={20}
                py={20}
                style={{ backgroundColor: 'white' }}>
                {count === index ? (
                  <Box
                    as={TouchableOpacity}
                    width="100%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                    onPress={() =>
                      navigation.navigate('ServiceProviderReviews', {
                        id: providerId,
                        provider: provider,
                      })
                    }>
                    <Text
                      style={{
                        color: colors['primary/50 – brand'],
                        fontWeight: '400',
                      }}>
                      {item?.label}
                    </Text>
                  </Box>
                ) : (
                  <Box height="100%" justifyContent="space-between">
                    <Box>
                      <Box>
                        <Text
                          style={{
                            ...typography['body/medium – regular'],
                            fontWeight: '700',
                          }}>
                          {reviewer(item?.reviewer?.fullName)}
                        </Text>
                      </Box>
                      <Text
                        style={typography['body/small – regular']}
                        numberOfLines={4}
                        mb={2}>
                        {item.text}
                      </Text>
                    </Box>
                    <Box width="100%" alignItems="center">
                      <RankBadge
                        rank={item.rank}
                        flexDirection="row"
                        alignItems="center"
                        tintColor={colors['gray scale/40']}
                        size={'middle'}
                        isRankNum={false}
                      />
                    </Box>
                  </Box>
                )}
              </Box>

              {t(
                count > 1 && index + 1 < count,
                <Box
                  height={192}
                  width={20}
                  borderRadius={10}
                  style={{
                    backgroundColor: 'white',
                    position: 'absolute',
                    right: -10,
                  }}
                />,
              )}
              {t(
                count > 1 && index > 0,
                <Box
                  height={192}
                  width={20}
                  borderRadius={10}
                  style={{
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: -10,
                  }}
                />,
              )}
            </Box>
          </Animated.View>
        </Box>
      );
    },
    [dims.width, theme, provider],
  );
  const renderHeader = React.useCallback(
    () => (
      <ProfileHeadCard
        userName={provider?.fullName}
        userType={'provider'}
        picture={provider?.picture}
        title={provider?.specialty}>
        <Box
          flexDirection="row"
          justifyContent="center"
          style={{ backgroundColor: 'white' }}
          pb={4}>
          <RankBadge
            rank={provider?.rank}
            flexDirection="row"
            alignItems="center"
            size={'large'}
            tintColor={
              !provider?.rank
                ? colors['gray scale/30']
                : colors['additional/success']
            }
          />
        </Box>
      </ProfileHeadCard>
    ),
    [canManage, navigation, onRefresh, provider, providerId, theme],
  );

  const renderContent = React.useCallback(
    () => (
      <FeaturesTab
        features={[
          { label: 'Company Name', content: provider?.companyName },
          {
            label: 'Mobile Number',
            content: formatPhoneNumber(provider?.phone),
          },
          {
            label: 'Office Number',
            content: formatPhoneNumber(provider?.phoneNumberOffice),
          },
          { label: 'Personal Email', content: provider?.email },
          {
            label: 'Home Address',
            content: provider?.city + ' ' + provider?.address,
          },
          { label: 'Hours', contentJsx: workHours },
        ]}
        styles={{
          features: {
            label: {
              ...typography['body/medium – regular'],
              color: colors['gray scale/40'],
            },
            content: {
              ...typography['body/medium – regular'],
              color: colors['gray scale/90'],
            },
            row: {
              height: 'auto',
              minHeight: 54,
              borderColor: colors['gray scale/10'],
              paddingHorizontal: 7,
            },
          },
        }}
      />
    ),
    [canManage, dims.width, onPublish, provider, renderReviewSlide, theme],
  );

  const renderReviewSection = React.useCallback(
    () => (
      <Box pb={15} mt={2}>
        {!!reviews?.length && !!provider && (
          <Box>
            <Carousel
              data={[
                ...reviews,
                {
                  label: 'SEE ALL REVIEWS',
                },
              ]}
              itemWidth={dims.width / 2.7}
              keyExtractor={item => item.id}
              sliderWidth={dims.width}
              inactiveSlideScale={0.8}
              renderItem={(dt, ct) =>
                renderReviewSlide(
                  {
                    ...dt,
                    count: reviews?.length,
                  },
                  ct,
                )
              }
              hasParallaxImages
              useScrollView
              inactiveSlideShift={-(dims.width / 6) * 0.8}
            />
          </Box>
        )}
      </Box>
    ),
    [canManage, dims.width, onPublish, provider, renderReviewSlide, theme],
  );

  const actions = useMemo(
    () =>
      getActions(
        ['back', { onPress: () => navigation?.goBack() }],
        canManage && [
          'editIcon',
          {
            disabled: !provider?.id,
            icon: 'edit',
            pack: 'pm',
            onPress: () =>
              navigation.navigate('EditServiceProvider', {
                id: providerId,
                onUpdate: onRefresh,
              }),
          },
        ],
      ),
    [navigation, canManage],
  );

  return (
    <HeadedScreen
      backgroundColor={colors['gray scale/5']}
      actions={actions}
      headerProps={{ transparent: true }}>
      {loader}
      <Box
        flex={1}
        alignContent={'space-between'}
        style={styles.container}
        as={Layout}>
        {renderHeader()}
        <Box as={ScrollView} mt={3}>
          <Box>{renderContent()}</Box>
          {!!provider?.rank && renderReviewSection()}
          <Box
            as={Button}
            my={10}
            mx={20}
            appearance="ghost"
            activeOpacity={0.75}
            onPress={() =>
              navigation.navigate('RateServiceProvider', {
                provider: provider,
                onUpdate: onRefresh,
                review: review,
              })
            }
            style={{
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors['primary/50 – brand'],
              backgroundColor: colors['gray scale/0'],
            }}
            textStyle={{
              ...typography['body/medium – medium'],
              textTransform: 'uppercase',
            }}>
            {(!review ? 'Write A' : 'Edit') + ' Review'}
          </Box>

          {canManage && (
            <Box
              as={Button}
              my={10}
              mx={20}
              activeOpacity={0.75}
              onPress={onPublish}
              disabled={provider?.public || provider?.waitingApproval}
              style={{ borderRadius: 12 }}
              textStyle={{
                ...typography['body/medium – medium'],
                textTransform: 'uppercase',
              }}>
              {provider?.public
                ? 'Provider Is Public'
                : provider?.waitingApproval
                ? 'Provider Under Review'
                : 'Send Provider To Public Database'}
            </Box>
          )}
        </Box>
      </Box>
      <Dialog
        visible={publicModalVisible}
        onHide={() => {
          setPublicModalVisible(false);
          onRefresh();
        }}
        title="Request Sent"
        content={
          publishRes.fetching
            ? 'Publishing...'
            : publishRes.error
            ? 'Failed to publish this service provider'
            : 'Your provider has been submitted for review. We will notify you in the case your provider is approved and added to the public database.'
        }
        buttons={[
          {
            hide: true,
            children: 'Done',
            disabled: publishRes.fetching,
            gradient: true,
            shape: 'circle',
          },
        ]}
      />
    </HeadedScreen>
  );
};

export default ViewServiceProvider;

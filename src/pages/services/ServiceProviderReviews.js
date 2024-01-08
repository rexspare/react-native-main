import React, { useMemo, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import ProviderReviewsQuery from 'queries/services/ProviderReviews.gql';
import Box from 'components/Box';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import Text from 'components/Text';
import InfiniteFlatList from 'components/InfiniteFlatList';
import RankBadge from 'components/RankBadge';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const ServiceProviderReviews = ({ navigation, route }) => {
  const [rank, setRank] = useState();

  const { dataExtractor, keyExtractor, variables, onResCallback } = useMemo(
    () => ({
      dataExtractor: data => data?.serviceProvider?.topReviews,
      keyExtractor: data => data?.id,
      onResCallback: res => setRank(res?.data?.serviceProvider?.rank),
      variables: {
        id: route?.params?.id,
        pause: !route?.params?.id,
      },
    }),
    [route],
  );

  const renderItem = React.useCallback(({ item }) => {
    const reviewer = item?.reviewer?.fullName.split(' ');
    const reviewerName = reviewer[0] + ' ' + reviewer[1].charAt(0) + '.';

    return (
      <Box
        width="100%"
        alignSelf="center"
        alignItems="center"
        px={20}
        mb={12}
        style={{ position: 'relative' }}>
        <Box
          minHeight={160}
          width={'100%'}
          borderRadius={10}
          alignSelf="center"
          justifyContent="space-between"
          px={20}
          py={20}
          style={{ backgroundColor: 'white' }}>
          <Box>
            <Box flexDirection="row" justifyContent="space-between">
              <Text
                style={{
                  ...typography['body/medium – regular'],
                  fontWeight: '700',
                }}>
                {reviewerName}
              </Text>
            </Box>
            <Text style={typography['body/small – regular']} mb={2}>
              {item.text}
            </Text>
          </Box>
          <Box alignItems="center">
            <RankBadge
              rank={item.rank}
              flexDirection="row"
              alignItems="center"
              tintColor={colors['gray scale/40']}
              isRankNum={false}
              size={'middle'}
            />
          </Box>
        </Box>
      </Box>
    );
  }, []);

  return (
    <Box flex={1} as={Layout}>
      <Box flex={1} as={SafeAreaView} forceInset={{ top: 'always' }}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
          ]}
          alignment="center"
          title="All Reviews"
          divider
        />
        <Box
          style={{
            paddingBottom: 64,
            backgroundColor: colors['gray scale/5'],
            height: '100%',
          }}>
          <InfiniteFlatList
            query={ProviderReviewsQuery}
            variables={variables}
            dataExtractor={dataExtractor}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            onResCallback={onResCallback}
            ListHeaderComponent={
              rank && (
                <Box alignItems="center" px={20} mb={3} pt={12}>
                  <>
                    <Box>
                      <RankBadge
                        rank={rank}
                        flexDirection="row"
                        alignItems="center"
                        size={'large'}
                        tintColor2={colors['gray scale/5']}
                      />
                    </Box>
                  </>
                </Box>
              )
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ServiceProviderReviews;

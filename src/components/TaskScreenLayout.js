import React from 'react';
import { Dimensions, RefreshControl, Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import { Layout } from '@ui-kitten/components';
import useTheme from 'hooks/useTheme';
import Box from 'components/Box';
import Loader from 'components/Loader';
import Header from 'components/Header';
import HeadedScreen from './HeadedScreen';
import LazyScreen from 'utils/LazyScreen';
import SafeAreaView from './SafeAreaView';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const TaskScreenLayout = ({
  headerProps,
  children,
  refreshing,
  onRefresh,
  isLoading,
  scrollRef,
  mb = 0,
}) => {
  const theme = useTheme();
  const height = Dimensions.get('window').height;
  const [scrollY] = React.useState(new Animated.Value(0));
  const [heightY] = React.useState(new Animated.Value(height * 10));
  const HeaderWrapper = Platform.OS === 'ios' ? Box : SafeAreaView;

  return (
    <HeadedScreen
      style={{
        title: {
          ...typography['body/large – Bold']
        },
        container: {
          borderBottomWidth: 1,
          borderBottomColor: colors['gray scale/10'],
        },
      }}
      {...headerProps}>
      {/* <HeaderWrapper forceInset={{ top: 'always' }}>
        <Header
          {...headerProps}
          style={{
            title: {
              fontWeight: '700',
            },
            container: {
              borderBottomWidth: 1,
              borderBottomColor: colors['gray scale/10'],
            },
          }}
        />
      </HeaderWrapper> */}
      <Box
        as={Animated.ScrollView}
        flex={1}
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={{ flexGrow: 1 }}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          onRefresh ? (
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refreshing}
              tintColor={theme['background-basic-color-1']}
              colors={[theme['color-primary-500']]}
            />
          ) : null
        }
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { y: scrollY },
              contentSize: { height: heightY },
            },
          },
        ])}>
        <Box
          pt={0}
          mb={mb}
          pb={30}
          flex={1}
          style={{ borderTop: 1, borderColor: 'red' }}
          onLayout={({ nativeEvent: { layout } }) =>
            requestAnimationFrame(() => heightY.setValue(layout.height + 60))
          }>
          <LazyScreen>
            <Loader isLoading={isLoading} />
            {children}
          </LazyScreen>
        </Box>
      </Box>
    </HeadedScreen>
  );
};

export default TaskScreenLayout;

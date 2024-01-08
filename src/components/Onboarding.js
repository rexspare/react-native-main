import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import AuthProvider from 'providers/auth';
import Carousel from './Carousel';
import { colors } from 'styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  slider: {
    flex: 1,
    position: 'relative',
  },
  start: {
    paddingVertical: 24,
    borderRadius: 0,
  },
  textWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 100,
  },
  tabText: {
    textAlign: 'center',
    maxWidth: '90%',
    textTransform: 'uppercase',
    lineHeight: 28,
    color: colors['primary/50'],
    fontFamily: 'Candara',
  },
});

const slides = () => {
  const { setOnboarding } = React.useContext(AuthProvider);

  const onStart = React.useCallback(() => {
    setOnboarding(true);
  }, [setOnboarding]);

  return [
    {
      image: require('img/onboarding-1.png'),
      content: (
        <Layout style={styles.textWrapper}>
          <Text category="p1" style={styles.tabText}>
            Take control of your assets & daily operations with our ultimate
            real estate management platform.
          </Text>
        </Layout>
      ),
      buttonText: 'READY',
    },
    {
      image: require('img/onboarding-2.png'),
      content: (
        <Layout style={styles.textWrapper}>
          <Text category="p1" style={styles.tabText}>
            Track tasks, maintenance requests, violations, payments & more using
            our automated software tools.
          </Text>
        </Layout>
      ),
      buttonText: 'SET',
    },
    {
      image: require('img/onboarding-3.png'),
      content: (
        <Layout style={styles.textWrapper}>
          <Text category="p1" style={styles.tabText}>
            All in one easy to use powerful tool is just one click away!
          </Text>
        </Layout>
      ),
      buttonText: 'GO',
      buttonPress: onStart,
    },
  ];
};

const Onboarding = ({ navigation }) => {
  return (
    <>
      <Layout style={styles.container}>
        <Carousel slides={slides()} style={styles.slider} />
      </Layout>
    </>
  );
};

export default Onboarding;

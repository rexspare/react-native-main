import React from 'react';
import { TouchableOpacity } from 'react-native';
import Box from './Box';
import HeadedScreen from './HeadedScreen';
import Text from './Text';
import SubmitButton from './SubmitButton';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const styles = {
  subtitle: {
    fontWeight: '500',
    fontSize: 14,
    color: colors['gray scale/60'],
    marginBottom: 16,
  },
  buttonText: {
    ...typography['buttons/large'],
    textTransform: 'uppercase',
  },
  button: {
    minHeight: 48,
    borderRadius: 12,
  },
};

const ChangePasswordLayout = ({
  children,
  onNavigate,
  copy,
  onPress,
  isLoading,
  navigation,
  containerSize,
  isSubText = true,
}) => {
  return (
    <HeadedScreen
      backgroundColor={'#fff'}
      header={copy?.layout?.title || copy?.title}
      actions={[
        {
          icon: 'arrow-ios-back',
          left: true,
          onPress: () => navigation.goBack(),
        },
      ]}
      contentContainerProps={{
        backgroundColor: colors['gray scale/5'],
      }}
      headerStyle={{ title: { ...typography['body/large – Bold'] } }}
      divider>
      <Box flex={1} justifyContent="flex-end">
        <Box
          flex={1}
          backgroundColor="#fff"
          p={30}
          justifyContent="space-between">
          <Box mb={0}>
            {copy?.layout?.subtitle1 && (
              <Text style={[styles.subtitle]}>{copy.layout.subtitle1}</Text>
            )}
            {children}
            {copy?.subtitle && isSubText && (
              <Box style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: colors['gray scale/60'],
                  }}>
                  {copy.subtitle.text}
                </Text>
                <TouchableOpacity
                  style={{ marginLeft: 8 }}
                  onPress={onNavigate}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: colors['primary/50 – brand'],
                      textTransform: 'uppercase',
                    }}>
                    {copy.subtitle.button}
                  </Text>
                </TouchableOpacity>
              </Box>
            )}
          </Box>
          <SubmitButton
            shape="circle"
            loading={isLoading}
            onPress={onPress}
            textStyle={styles.buttonText}
            style={styles.button}
            size="large">
            {copy.button || copy.submitBtn}
          </SubmitButton>
        </Box>
      </Box>
    </HeadedScreen>
  );
};

export default ChangePasswordLayout;

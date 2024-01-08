import React from 'react';
import { ImageBackground, StyleSheet, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useTheme from 'hooks/useTheme';
import SafeAreaView from 'components/SafeAreaView';
import Button from 'components/Button';
import Header from 'components/Header';
import Box from './Box';
import Text from './Text';
import { t } from 'helpers/react';
import backgroundImg from 'img/login-bg.png';
import { IS_SMALLER } from 'styles/responsive';
import styled from 'styled-components/native';
import Logo from 'img/landing-logo.svg';
import LogoText from 'img/login-text.svg';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

const Grid = styled(Box)`
  flex: 1;
  justify-content: space-between;
  overflow: scroll;
  padding-horizontal: 20;
  padding-vertical: 40;
`;

const Title = styled(Text)`
  width: 90%;
  justify-content: flex-end;
  align-self: center;
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 700;
`;

const Subtitle = styled(Box)`
  width: 80%;
  align-self: center;
  justify-content: center;
`;

const Form = styled.ScrollView`
  flex-grow: 0;
`;

const FormButton = styled.View`
  margin-vertical: 5;
`;

const Actions = styled.View`
  justify-content: flex-end;
`;

const Action = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ActionButton = styled(Button)`
  margin-left: 0;
`;

const LoginLayout = ({
  background,
  title,
  subtitle,
  gradient,
  renderForm,
  actions,
  isBeckButton = false,
  navigation,
}) => {
  const { form, button } = renderForm();
  const theme = useTheme();

  return (
    <Box flex={1}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <ImageBackground
          source={backgroundImg}
          style={styles.container}
          resizeMode="cover">
          <Box as={SafeAreaView} flex={1} justifyContent={'center'}>
            <Grid justifyContent={'center'}>
              {isBeckButton && navigation && (
                <Box flex={1} position="absolute" top={20}>
                  <Header
                    actions={[
                      {
                        icon: 'arrow-ios-back',
                        left: true,
                        onPress: () => navigation.goBack(),
                      },
                    ]}
                    status="control"
                    transparent
                  /> 
                </Box>
              )}
              <Box
                justifyContent="center"
                alignItems="center"
                flex={title && subtitle ? 2 : title || subtitle ? 1.8 : 1.5}>
                <Logo width={58} height={110} />
                <LogoText width={150} height={30} />
              </Box>
              {title && (
                <Box
                  flex={0.4}
                  justifyContent={IS_SMALLER ? 'center' : 'flex-end'}
                  marginBottom={30}>
                  {t(
                    title,
                    <Title category="h3" status="control">
                      {title}
                    </Title>,
                  )}
                </Box>
              )}
              {t(
                subtitle,
                <Subtitle flex={0.4} marginBottom={40}>
                  {subtitle && typeof subtitle === 'string' ? (
                    <Text
                      category="p2"
                      status="control"
                      textAlign="center"
                      style={{ textTransform: 'capitalize', fontSize: 16 }}>
                      {subtitle}
                    </Text>
                  ) : (
                    subtitle
                  )}
                </Subtitle>,
              )}
              <Box flex={4}>
                <Box flex={3} justifyContent={'flex-start'}>
                  <Form>{form}</Form>
                  <FormButton>{button}</FormButton>
                </Box>
                <Actions>
                  {actions &&
                    actions.map((action, i) => (
                      <Action key={i}>
                        <Text
                          category="s3"
                          status="control"
                          style={{ fontWeight: '700' }}>
                          {action.text}
                        </Text>
                        <ActionButton
                          appearance="ghost"
                          textStyle={{
                            color: theme['color-primary-800'],
                            fontSize: theme['text-subtitle-3-font-size'],
                            fontWeight: '700',
                          }}
                          onPress={action.onClick}>
                          {action.button}
                        </ActionButton>
                      </Action>
                    ))}
                </Actions>
              </Box>
            </Grid>
          </Box>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default LoginLayout;

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Directions, FlingGestureHandler } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { noop } from 'lodash';
import { Layout } from '@ui-kitten/components';
import Button from 'components/Button';
import SafeAreaView from 'components/SafeAreaView';
import Icon from 'components/Icon';
import Modal from '../Modal';
import Text from '../Text';
import Box from '../Box';
import { t } from 'helpers/react';
import styled from 'styled-components/native';
import StyledLine from '../StyledLine';
import { styles } from './styles';

const DialogWrapper = styled.View`
  flex: 2;
  /* align-items: center; */
  justify-content: flex-end;
  left: 0;
  /* top: 0; */
  right: 0;
  bottom: 0;
`;

const DialogCloser = styled.View`
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const DialogView = styled(Layout)`
  border-top-left-radius: 18;
  border-top-right-radius: 18;
  padding-bottom: 20;
  position: relative;
  width: 100%;
  shadow-opacity: 0.1;
  shadow-radius: 10;
  shadow-color: #000;
  shadow-offset: {height: 0, width: 1};
  elevation: 5;
`;

const CenterText = styled(Text)`
  text-align: center;
  padding-top: 20;
`;

const Content = styled.View`
  margin-top: 7;
  padding-bottom: 10;
`;

const Buttons = styled.View`
  /* flex-direction: row; */
  /* flex-wrap: wrap; */
`;

const ButtonWrapper = styled.View`
  margin-top: 15;
  /* flex: 1; */
`;

const BottomHalfModal = ({
  visible,
  onHide,
  buttons,
  content,
  title,
  displayDone = true,
  displayDoneRight = false,
  contentContainerProps,
  children,
  headerRight,
  doneText = 'DONE',
  titleAppender,
  onSwipeUp = noop,
  styles: _styles,
  px = 20,
  onDone = onHide,
  headerLine = true,
  leftIcon = false,
  absoluteStyles,
  ...props
}) => {
  const buttonOnPressFacory = React.useCallback(
    (hide, onPress) => {
      return (...args) => {
        if (hide) {
          onHide();
        }
        if (onPress) {
          onPress(...args);
        }
      };
    },
    [onHide],
  );

  const realContent = content || children;

  return (
    <Modal
      visible={visible}
      blurback={true}
      onHide={onHide}
      animationType="slide"
      {...props}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          minHeight: '100%',
          maxHeight: '100%',
          minWidth: '100%',
          maxWidth: '100%',
          ...absoluteStyles,
        }}>
        <DialogWrapper>
          <DialogCloser
            as={TouchableOpacity}
            activeOpacity={1}
            onPress={onHide}
          />
          <DialogView>
            <FlingGestureHandler
              direction={Directions.DOWN}
              onHandlerStateChange={onHide}>
              <FlingGestureHandler
                direction={Directions.UP}
                onHandlerStateChange={onSwipeUp}>
                <Box>
                  <StyledLine style={styles.styledLineTop} />
                  {headerLine && (
                    <Box>
                      <Box
                        borderBottomWidth={!props.search ? 1 : 0}
                        style={[
                          styles.headerContainer,
                          _styles?.headerContainer,
                        ]}>
                        {t(
                          displayDone || leftIcon,
                          <TouchableOpacity
                            onPress={onDone}
                            style={styles.doneContainer}>
                            {t(
                              displayDone,
                              <Text style={styles.doneTxt}>{doneText}</Text>,
                            )}
                            {t(
                              leftIcon,
                              Icon(
                                'chevron-right',
                                'pm',
                              )({ width: 15, height: 15, top: 10 }),
                            )}
                          </TouchableOpacity>,
                        )}
                        <CenterText
                          style={[styles.headerTxt, _styles?.headerTxt]}
                          category="p1">
                          {title}
                        </CenterText>
                        {t(
                          displayDoneRight,
                          <Box
                            style={styles.rightAction}
                            as={TouchableOpacity}
                            onPress={onDone}>
                            {t(
                              displayDoneRight,
                              <Text style={styles.doneTxt}>{doneText}</Text>,
                            )}
                          </Box>,
                        )}
                      </Box>
                      <Box>{props.search}</Box>
                      <Box style={styles.rightAction}>{headerRight}</Box>
                    </Box>
                  )}
                </Box>
              </FlingGestureHandler>
            </FlingGestureHandler>
            {titleAppender}
            <SafeAreaView px={px} {...contentContainerProps}>
              <Content>
                {realContent && typeof realContent === 'string' ? (
                  <CenterText category="p1">{realContent}</CenterText>
                ) : (
                  realContent
                )}
              </Content>
              <Buttons>
                {(buttons || []).map(
                  ({ gradient, hide, onPress, ...btnProps }, i) => (
                    <ButtonWrapper key={i}>
                      {React.createElement(Button, {
                        onPress: buttonOnPressFacory(hide, onPress),
                        ...btnProps,
                      })}
                    </ButtonWrapper>
                  ),
                )}
              </Buttons>
            </SafeAreaView>
          </DialogView>
        </DialogWrapper>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default BottomHalfModal;

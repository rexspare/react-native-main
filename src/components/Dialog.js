import React from 'react';
import styled from 'styled-components/native';
import { Icon } from '@ui-kitten/components';
import Button from 'components/Button';

import Modal from './Modal';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions, ScrollView } from 'react-native';
import Box from './Box';
import { noop } from 'lodash-es';
import ThemedButton from './Button/ThemedButton';
import Typography from './Text/ThemedText';
import Loader from './Loader';
import Text from './Text';
import { hide } from 'react-native-bootsplash';

const DialogWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  backgroundColor: rgba(0, 0, 0, 0.75);
  zIndex: 2;
`;

const DialogView = styled(Box).attrs(({ style }) => ({
  backgroundColor: "#fff",
  ...style

}))`
  border-radius: 15;
  align-items: stretch;
  justify-content: space-between;
  position: relative;
  shadow-opacity: 0.1;
  shadow-radius: 10;
  shadow-color: #000;
  width: 90%;
  shadow-offset: {height: 0, width: 1};
  elevation: 5;
  top: ${() => getStatusBarHeight() * -1};
`;

const CloseButton = styled(Button)`
`;

const CloseIcon = styled(Icon)`
  margin-vertical: 5;
`;

const CenterText = styled(Typography).attrs(({ style }) => ({
  ...style

}))`
  text-align: center;
`;

const Content = styled(ScrollView).attrs(({ ...props }) => ({
  ...props
}))``;

const ButtonsContainer = styled.View`
  /* flex-direction: row; */
  /* flex-wrap: wrap; */
`;

const positionsToStyle = {
  center: 'center',
  bottom: 'flex-end',
  top: 'flex-start'
}

export const Buttons = ({ buttons, containerStyle, btnStyle, textStyle: _textStyle }) => {
  return (
    <ButtonsContainer style={containerStyle}>
      {(buttons).map(
        ({ gradient, additionalOnPress = noop, onPress, textStyle, theme, ...btnProps }, i) => (
          <>
            {React.createElement(theme ? ThemedButton : Text, {
              onPress,
              theme: theme,
              ...btnStyle,
              ...btnProps,
              textStyle: { ..._textStyle, ...textStyle }
            })}
          </>
        ),
      )}
    </ButtonsContainer>
  )
}

const Dialog = ({
  visible,
  onHide,
  buttons = [],
  content,
  title,
  closeIcon,
  position = 'center',
  children,
  modalProps,
  titleProps,
  styles,
  isLoading,
  buttonsContainerStyle = { flexDirection: "row", width: "100%", justifyContent: "space-around" }
}) => {
  const renderedContent = content || children;

  return (
    <Modal visible={visible} animationType="slide" {...modalProps}>
      <DialogWrapper pointerEvents="box-none" style={{ justifyContent: positionsToStyle[position] }}>
        <DialogView p={10} style={styles?.view} alignItems={"center"} minHeight={"18%"} minWidth={"72%"}>
          <Loader isLoading={isLoading}>
            <Box display={`flex`} flexDirection={closeIcon ? `row` :'column'} justifyContent={`flex-start`} alignItems={`center`}>
              {closeIcon && (
                <CloseButton
                  shape="circle"
                  size="small"
                  appearance="ghost"
                  icon={style => (
                    <CloseIcon name={closeIcon} onPress={() => onHide()} width={26} height={26} />
                  )}
                  {...styles?.close}
                />
              )}
              {title && <CenterText typography={"body/large – medium"} {...titleProps} style={{ ...styles?.title }}>{title}</CenterText>}
            </Box>
            
            {renderedContent && <Box maxHeight={Dimensions.get('screen').height / 2.5}>
              <Content mx={10} style={{ flexGrow: 0, paddingVertical: 30, ...styles?.content }} contentContainerStyle={[{ alignItems: "center" }, styles?.contentContainer]} bounces={false}>
                {renderedContent && typeof renderedContent === 'string' ? (
                  <CenterText typography={"body/medium – regular"} style={styles?.contentText} >{renderedContent}</CenterText>
                ) : (
                  renderedContent
                )}
              </Content>
            </Box>}
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              mt={1}
            >
              <Buttons containerStyle={buttonsContainerStyle} buttons={buttons.map(({ hide, ...btn }) => ({ additionalOnPress: hide && onHide, ...btn }))} />
            </Box>
          </Loader>
        </DialogView>
      </DialogWrapper>
    </Modal>
  );
};

export default Dialog;

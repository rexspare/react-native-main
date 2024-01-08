import React from 'react';
import styled, { css } from 'styled-components/native';
import { Button as UKButton, Spinner } from '@ui-kitten/components';
import GradientButton from '../GradientButton';
import { StyleSheet } from 'react-native';
import Box from '../Box';

const LoginSpinnerView = styled.View`
  top: 1;
  right: 5;
  opacity: 0.72;
`;

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  button: {
    borderRadius: 12,
  },
  
});

const StyledSpinner = styled(Spinner)`
  ${({ status }) =>
    status === 'basic'
      ? css`
          border-color: #1a2138;
        `
      : null}
`;

export const ShadowContainer = ({ shadow, children, style }) => {
  return (
    <Box style={[shadow && styles.shadowContainer, style]}>
      {children}
    </Box>
  )
}

const Button = ({
  loading,
  disabled,
  children,
  icon,
  status,
  gradient,
  shadow,
  containerStyle,
  ...props
}) => {
  const ButtonComponent = gradient ? GradientButton : UKButton;
  if (props.appearance === 'ghost' || props.appearance === 'outline') {
    shadow = false;
  }
  return (
    <ShadowContainer shadow={shadow} style={containerStyle}>
      <ButtonComponent
        status={status}
        disabled={loading || disabled}
        activeOpacity={1}
        style={[styles.button, props.style, props.textStyle]}
        textStyle={[styles.buttonText, props.textStyle]}
        shadow={false}
        icon={
          loading
            ? style => (
              <LoginSpinnerView style={style}>
                <StyledSpinner
                  status={
                    status === 'basic' ||
                      (props?.appearance ?? 'filled') === 'ghost'
                      ? status
                      : 'control'
                  }
                  size="small"
                />
              </LoginSpinnerView>
            )
            : icon
        }
        {...props}
        >
        {loading ? null : children}
      </ButtonComponent>
    </ShadowContainer>
  );
};

export default Button;

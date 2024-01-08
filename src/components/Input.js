import React from 'react';
import { Platform } from 'react-native';
import { Icon, Input as InputUI } from '@ui-kitten/components';
import Box from './Box';
import Text from './Text';
import InputLabel from './InputLabel';
import { t } from 'helpers/react';
import { space, flexbox } from 'styled-system';
import { colors } from 'styles/theme';
import { input_label_14 } from 'styles/reusable-classes';
import styled from 'styled-components/native';
import { typography } from 'styles/typography';

export const RequiredAsterisk = ({ ...props }) => (
  <Text fontSize={12} pb={1} color={colors['additional/danger']} {...props}>
    {' '}
    *{' '}
  </Text>
);
const _Input = styled(InputUI).attrs(
  ({
    theme,
    label,
    status,
    captionTextStyle,
    labelStyle = input_label_14,
    textStyle = {
      ...typography['body/medium – regular'],
      color: colors['gray scale/90'],
      lineHeight: Platform.OS === 'ios' ? 0 : 20,
    },
  }) => ({
    labelStyle,
    captionTextStyle:
      (status ?? 'basic') === 'basic'
        ? {
            color: '#979797',
            ...(captionTextStyle ?? {}),
          }
        : captionTextStyle,
    selectionColor: theme['color-primary-500'],
    textStyle,
    label,
  }),
)(space, flexbox);

_Input.styledComponentName = 'Input';

const Input = ({
  label,
  labelStyle = input_label_14,
  isRequired,
  isUppercase,
  containerProps,
  error,
  labelIcon,
  styles,
  isNoTransform,
  iconTop=8,
  ...props
}) => {
  return (
    <Box width={'100%'} {...containerProps}>
      <Box flexDirection="row" style={styles?.labelIcon}>
        {t(
          label,
          <InputLabel
            label={label}
            isRequired={isRequired}
            labelStyle={[
              labelStyle,
              isUppercase && { textTransform: 'none' },
              isNoTransform && { textTransform: 'none' },
            ]}
          />,
        )}
        {t(
          labelIcon,
          <Icon top={iconTop} width={15} height={15} pack={'pm'} name={labelIcon} />,
        )}
      </Box>
      <_Input {...props} />
    </Box>
  );
};

export default Input;

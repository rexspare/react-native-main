import React from 'react';
import Box from 'components/Box';
import Input from 'components/Input';
import Text from 'components/Text';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const PhoneNumberInput = ({ ...props }) => {
  return (
    <Input
      keyboardType="phone-pad"
      textStyle={{
        paddingLeft: 18,
        ...typography['body/medium – regular'],
        color: colors['gray scale/90'],
        lineHeight: Platform.OS === 'ios' ? 0 : 20,
      }}
      icon={style => (
        <Box
          position={'absolute'}
          justifyContent={'center'}
          alignItems={'center'}
          height={18}
          width={18}>
          <Text
            {...style}
            style={{
              ...typography['body/medium – regular'],
              position: 'relative',
            }}
            color={colors['gray scale/30']}>
            +1
          </Text>
        </Box>
      )}
      {...props}
    />
  );
};

export default PhoneNumberInput;

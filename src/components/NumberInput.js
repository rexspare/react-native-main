import React from 'react';
import Button from 'components/Button';
import Box from './Box';
import Icon from './Icon';
import Text from './Text';
import { typography } from 'styles/typography';

const NumberInput = ({ value, onChange, min, max, step = 1, ...props }) => {
  const realValue = +value || 0;

  return (
    <Box flexDirection="row" alignItems="center" mr={-1} {...props}>
      <Button
        appearance="ghost"
        status="basic"
        size="large"
        icon={style =>
          Icon('minus-circle-outline', 'pm')({
            ...style,
          })
        }
        style={{ backgroundColor: 'transparent' }}
        disabled={realValue <= min}
        onPress={() => onChange?.(realValue - step)}
      />
      <Text
        category="label"
        transform="uppercase"
        {...typography['body/medium – regular']}
      >
        {realValue}
      </Text>
      <Button
        appearance="ghost"
        status="basic"
        size="large"
        disabled={realValue >= max}
        icon={style =>
          Icon('plus-circle-outline', 'pm')({
            ...style,
            style: { marginHorizontal: 0, marginRight: -14 },
          })
        }
        style={{ backgroundColor: 'transparent' }}
        onPress={() => onChange?.(realValue + step)}
      />
    </Box>
  );
};

export default NumberInput;

import React, { useEffect } from 'react';
import { Button } from '@ui-kitten/components';
import Box from './Box';
import Text from './Text';
import { t } from 'helpers/react';
import { colors } from 'styles/theme';

const YesNoInput = ({
  label,
  value,
  onChange,
  error,
  styles: _styles,
  hideNA,
  ...props
}) => {
  const [currValue, setCurrValue] = React.useState(value);

  useEffect(() => {
    setCurrValue(value);
  }, [value]);

  const onChangeProxy = React.useCallback(
    val => {
      setCurrValue(val);
      onChange?.(val);
    },
    [onChange],
  );

  return (
    <Box mb="4" {...props}>
      <Text style={_styles?.labelStyle} category="label">
        {label}
      </Text>
      <Box flexDirection="row" pt="3" style={_styles?.buttonContainer}>
        <Button
          appearance={currValue === 1 ? 'filled' : 'outline'}
          onPress={() => onChangeProxy(1)}
          size="small"
          textStyle={[
            _styles?.textStyle,
            currValue == 1 && { color: colors['white'] },
          ]}
          style={[
            {
              flex: 1,
              ...(currValue !== 1 ? { backgroundColor: 'transparent' } : {}),
            },
            _styles?.buttonStyle,
          ]}>
          YES
        </Button>
        <Box mx="2" />
        <Button
          appearance={currValue === 2 ? 'filled' : 'outline'}
          onPress={() => onChangeProxy(2)}
          size="small"
          textStyle={[
            _styles?.textStyle,
            currValue == 2 && { color: colors['white'] },
          ]}
          style={[
            {
              flex: 1,
              ...(currValue !== 2 ? { backgroundColor: 'transparent' } : {}),
            },
            _styles?.buttonStyle,
          ]}>
          NO
        </Button>
        <Box mx="2" />
        {t(
          !hideNA,
          <Button
            appearance={currValue === 3 ? 'filled' : 'outline'}
            onPress={() => onChangeProxy(3)}
            size="small"
            textStyle={[
              _styles?.textStyle,
              currValue !== 3 && { color: colors['white'] },
            ]}
            style={[
              {
                flex: 1,
                ...(currValue !== 3 ? { backgroundColor: 'transparent' } : {}),
              },
              _styles?.buttonStyle,
            ]}>
            N/A
          </Button>,
        )}
      </Box>
      {error && (
        <Text category="c1" status="danger" my="2">
          {error}
        </Text>
      )}
    </Box>
  );
};

export default YesNoInput;

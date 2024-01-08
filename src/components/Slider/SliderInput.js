import React from 'react';
import Box from '../Box';
import Text from '../Text';
import { colors } from "styles/theme";
import { t } from 'helpers/react';
import { styles } from './styles'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Thumb from './Thumb';

const SliderInput = ({ min, max, value = [], onChange, label, labelStyle, hideLabels = false, rangeDisabled = true, low, high, ...props }) => {
  
  const valueFormater = (val) => {
    const min = !!val[0] ? parseFloat(val[0].replace(/,/g, '')) : val[0];
    const max = !!val[1] ? parseFloat(val[1].replace(/,/g, '')) : val[1];
    return [min, max];
  };

  return (
    <Box {...props}>
      {t(label, <Text style={labelStyle} category="label">{label}</Text>)}
      <Box flexDirection="row" alignItems="center">
        {t(!hideLabels,
          <Box mt="3">
            <Text color={colors['primary/50']}>
              {min}
            </Text>
          </Box>
        )}
        <Box flex={1} style={{ width: '100%' }}>
          <Box style={{ position: 'relative', width: '100%' }}>
            <MultiSlider
              min={min}
              max={max}
              values={value.length ? valueFormater(value) : [min, max]}
              onValuesChangeFinish={onChange}
              step={10}
              customMarker={Thumb}
              {...styles.slider}
            />
          </Box>
        </Box>
        {t(!hideLabels,
          <Box mt="3">
            <Text color={colors['primary/50']}>
              {max}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SliderInput;

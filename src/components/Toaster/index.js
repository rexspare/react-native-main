import React from 'react';
import Box from 'components/Box';
import { Buttons } from 'components/Dialog';
import Icon from 'components/Icon';
import Text from 'components/Text';
import { style } from './style';

const Toaster = ({ text1, text2, icon, buttons = [], ...props }) => {
  return (
    <Box
      style={{ ...style.defaultContainerStyles, ...props?.styles?.container }}>
      <Box>
        {text1 && text1.length > 0 && (
          <Box flexDirection="row" alignItems="center" mb={1}>
            <Box mr={2}>{Icon(icon, 'pm')({ width: 20, height: 20 })}</Box>
            <Text style={{ ...style.text1, ...props?.styles?.text1 }}>
              {text1}
            </Text>
          </Box>
        )}
        {text2 && text2.length > 0 && (
          <Text style={{ ...style.text2, ...props?.styles?.text2 }}>
            {text2}
          </Text>
        )}
        <Buttons
          buttons={buttons}
          btnStyle={style.buttonStyle}
          textStyle={style.buttonText}
          containerStyle={style.buttonsContainer}
        />
      </Box>
    </Box>
  );
};

export default Toaster;

import React from 'react';
import HeadedScreen from 'components/HeadedScreen';
import Box from 'components/Box';
import MultiTextSwitch from 'components/MultiTextSwitch';
import { noop } from 'lodash';
import { colors } from 'styles/theme';

const HeadedScreenWithTabs = ({
  children,
  width = 0.9,
  options,
  onSelect = noop,
  ...props
}) => {
  return (
    <HeadedScreen {...props}>
      <Box
        width={1}
        borderBottomWidth={1}
        borderBottomColor={colors['gray scale/10']}
        pb={3}
        my="2">
        <Box alignSelf="center" width={width}>
          <MultiTextSwitch
            shape={'rounded'}
            size="small"
            options={options}
            onSelect={onSelect}
          />
        </Box>
      </Box>
      {children}
    </HeadedScreen>
  );
};

export default HeadedScreenWithTabs;

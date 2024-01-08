import React from 'react';
import Box from './Box';
import { colors } from 'styles/theme';

const Dot = ({
  width = 5,
  height = 5,
  backgroundColor = colors['gray scale/30'],
  style,
  ...props
}) => {
  return (
    <Box
      style={{
        width,
        height,
        backgroundColor,
        borderRadius: 50,
        ...style,
      }}
      {...props}
    />
  );
};

export default Dot;

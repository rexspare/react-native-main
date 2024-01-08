import React from 'react';
import useTheme from 'hooks/useTheme';
import Box from './Box';

const Divider = props => {
  const theme = useTheme();
  return (
    <Box
      backgroundColor={theme['grey-0']}
      height="2px"
      width="100%"
      mb={15}
      {...props}
    />
  );
};

export default Divider;

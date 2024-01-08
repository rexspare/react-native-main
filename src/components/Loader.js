import React from "react";
import { Layout, Spinner } from '@ui-kitten/components';
import Box from 'components/Box';

const Loader = ({ isLoading, size = "giant", ...props }) => {
  if (!isLoading) return props?.children || null
  return (
    isLoading && (
      <Box
        as={Layout}
        opacity={0.6}
        position="absolute"
        zIndex={1}
        left={0}
        top={0}
        right={0}
        bottom={0}
        pt={16}
        alignItems="center"
        justifyContent="center"
        pointerEvents="box-none"
        {...props}
      >
        <Spinner size={size} />
      </Box>
    )
  )
};

export default Loader
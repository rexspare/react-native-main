import React from 'react';
import { ScrollView } from 'react-native';
import Box from 'components/Box';
import WhiteFeaturesCard from 'components/Features/WhiteFeaturesCard';
import { colors } from 'styles/theme';

export const FeaturesTab = ({
  features,
  children,
  prependder,
  containerProps,
  ...props
}) => {
  return (
    <Box as={ScrollView} style={{ backgroundColor: colors['gray scale/5'] }}>
      {prependder}
      <WhiteFeaturesCard
        containerProps={{ mb: 3, ...containerProps }}
        features={features}
        conditional
        styles={props?.styles}
        {...props}
      />
      {children}
    </Box>
  );
};
export default FeaturesTab;

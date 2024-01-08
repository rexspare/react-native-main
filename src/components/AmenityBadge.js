import React from 'react';
import Box from './Box';
import {Layout} from '@ui-kitten/components';
import Text from './Text';
import styled from 'styled-components/native';
import { colors } from 'styles/theme';

const BadgeText = styled(Text)`
  color: ${colors['gray scale/0']};
  font-size: 16;
  text-align: center;
  text-transform: capitalize;
`;

const AmenityBadge = ({amenity, ...props}) => {

  return (
    <Box
      as={Layout}
      p="2"
      py="1"
      mr="2"
      mb="2"
      borderRadius={8}
      backgroundColor={colors['primary/50']}
      {...props}>
      <BadgeText >{amenity}</BadgeText>
    </Box>
  );
};

export default AmenityBadge;

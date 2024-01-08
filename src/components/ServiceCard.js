import React from 'react';
import FastImage from 'react-native-fast-image';
import Box from './Box';
import Text from './Text';
import styled from 'styled-components/native';
import { colors } from 'styles/theme';

const Card = styled(Box)`
  flex-direction:row;
  justify-content: space-between;
  border-width: 1;
  border-color:${colors['gray scale/10']}
  margin-bottom: 16;
  border-radius: 8;
  padding-left: 16;
  padding-right: 16
  padding-top: 14;
  padding-bottom: 14;
`;

const CardText = styled(Text)`
  font-weight: 700;
  text-transform: uppercase;
`;

const ServiceCard = ({ name, minimal }) => {
  return (
    <Card flexDirection="row">
      <CardText category={minimal ? 'p1' : 's1'}>{name}</CardText>
      <FastImage
        style={{
          width: 12,
          height: 12,
          position: 'absolute',
          top: 20,
          right: 10,
        }}
        source={require('img/rightArrow.png')}
      />
    </Card>
  );
};

export default ServiceCard;

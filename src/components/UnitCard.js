import React from 'react';
import styled from 'styled-components/native';
import Box from './Box';
import Text from './Text';
import useTheme from 'hooks/useTheme';
import {RENT_TYPES, UNIT_STATUS} from 'constants/enums';
import UnitStatusBadge from './UnitStatusBadge';
import FastImage from 'react-native-fast-image';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const Shadow = styled(Box)`
  shadow-opacity: 0.15;
  shadow-radius: 10;
  shadow-color: #000;
  shadow-offset: {height: 0, width: 0};
  background-color: ${({theme}) => theme['background-basic-color-1']}
  elevation: 3;
  border-radius: 20;
  
`;

const Card = styled(Box)`
  background-color: ${({theme}) => theme['background-basic-color-1']};
  border-radius: 20;
`;

const InfoContainer = styled(Box)`
  left: 10%;
  top: 2.5%;
`;

const CardImage = styled(FastImage)`
  /* flex: 1; */
  height: 120;
  width: 120;
  border-radius: 20;
`;

const UnitCard = ({unitNumber, status, image, rentType, price, ...props}) => {
  const theme = useTheme();

  return (
    <Shadow borderRadius={4} {...props}>
      <Card overflow="hidden" borderRadius={20} maxWidth={"100%"} flexDirection="row">
        <CardImage
          source={
            image ? {uri: image} : require('img/placeholder-building.jpeg')
          }
        />
        <UnitStatusBadge
          status={status}
          position="absolute"
          top={6}
          left="2%"
        />
        <InfoContainer>
          <Text my={10} color={colors['gray scale/90']} style={typography["Capital/small – medium"]}>
            {`Apartment ${unitNumber}`.toUpperCase()}
          </Text>
          <Text mb={10} color={theme['color-primary-500']} style={typography["body/x-small – regular"]} numberOfLines={1}>
            {Object.keys(RENT_TYPES)
              .filter(k => RENT_TYPES[k] === rentType)
              .map(k =>
                k
                  .split('_')
                  .map(w => w.toUpperCase())
                  .join(' '),
              )}
          </Text>
          <Text style={typography["body / medium – medium"]}  color={colors['gray scale/90']}>
            ${price.toLocaleString()}
          </Text>
        </InfoContainer>
      </Card>
    </Shadow>
  );
};

export default UnitCard;

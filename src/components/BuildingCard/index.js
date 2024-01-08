import React from 'react';
import FastImage from 'react-native-fast-image';
import { t } from 'helpers/react';
import Box from '../Box';
import Text from '../Text';
import ThemedButton from 'components/Button/ThemedButton';
import Icon from 'components/Icon';
import { colors } from 'styles/theme';
import styled from 'styled-components/native';

const CardBox = styled(Box)`
  border-radius: 14;
  background-color: ${({ theme }) => theme['background-basic-color-1']};
  border-width: 1px;
  border-color: ${colors['gray scale/10']};
`;

const Card = styled(Box)`
  background-color: ${({ theme }) => theme['background-basic-color-1']};
  border-radius: 12;
`;

const CardImage = styled(FastImage)`
  height: 80;
`;
const CardNoImage = styled(FastImage)`
  height: 32;
  width: 32;
`;

const CardHintText = styled(Text)`
  margin-left: 10;
  text-transform: uppercase;
  color: ${colors['gray scale/30']};
`;

const BuildingCard = ({ name, image, location, vacantCount, draftItem, ...props }) => {
  return (
    <CardBox mx={10} my="10px" borderRadius={0} {...props}>
      <Card overflow="hidden" borderRadius={0}>
        {t(
          image,
          <CardImage source={{ uri: image }} />,
          <Box
            style={{
              backgroundColor: '#F0F2F2',
              alignItems: 'center',
              justifyContent: 'center',
              height: 80,
            }}>
            <CardNoImage source={require('img/logo-white.png')} />
          </Box>,
        )}
        <Box mx={3} my={12} borderRadius={20}>
          <Box justifyContent="space-between">
            <Box
              maxWidth={'100%'}
              flexDirection="row"
              justifyContent="space-between"
              mb={1}>
              <Text
                color={colors['gray scale/90']}
                fontSize="15"
                fontWeight="bold">
                {name ? `${name}`.toUpperCase() : "N/A" }
              </Text>
              <FastImage
                style={{ width: 12, height: 12, alignSelf: 'center' }}
                source={require('img/lightGrayRightArrow.png')}
              />
            </Box>
            <Box
              maxWidth={'100%'}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Box flexDirection="row" alignItems="center" flex={1}>
                {Icon(
                  'marker',
                  'pm',
                )({ width: 16, height: 16, fill: '#22272F' })}
                <CardHintText
                  numberOfLines={1}
                  category="c2"
                  appearance="hint"
                  pr={12}>
                  {location}
                </CardHintText>
              </Box>
              {t(
                vacantCount || draftItem,
                <ThemedButton
                  theme= {draftItem ? "grey" : "primary_brand"}
                  children={draftItem ? 'DRAFT' : 'VACANT'}
                  style={{
                    paddingHorizontal: 0,
                    paddingVertical: 4,
                    minHeight: 'auto',
                    minWidth: 'auto',
                    marginLeft: 15,
                    borderRadius: 8,
                  }}
                />,
              )}
            </Box>
          </Box>
        </Box>
      </Card>
    </CardBox>
  );
};

export default BuildingCard;

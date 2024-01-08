import React from 'react';
import { Linking } from 'react-native';
import Button from 'components/Button';
import EasyIcon from './Icon';
import Box from './Box';
import RankBadge from './RankBadge';
import Avatar from './Avatar';
import Text from './Text';
import { t } from 'helpers/react';
import { CallContact } from 'helpers/number';
import styled from 'styled-components/native';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const Card = styled(Box)`
  border: 1px solid ${colors['gray scale/10']};
`;

const CardButton = styled(Button)`
  background-color: ${colors['primary/5']};
  padding-vertical: 9px;
  padding-horizontal: 9px;
  border-radius: 60px;
  width: 31px;
  height: 31px;
  border: none;
`;

const ServiceProviderCard = ({
  fullName,
  image,
  title,
  rank,
  phone,
  email,
  ...props
}) => {
  return (
    <Card
      overflow="hidden"
      borderRadius={4}
      flexDirection="row"
      px={16}
      py={9}
      mb={14}
      justifyContent="space-between"
      alignItems="center">
      <Box flexDirection="row" flex={1}>
        <Avatar imageText={fullName} image={image} />
        <Box pl={20} flexShrink={1} justifyContent="center">
          <Text style={{ ...typography['body/medium – bold'] }}>
            {fullName}
          </Text>
          {t(
            title,
            <Text
              style={{
                ...typography['body/small – regular'],
                color: colors['gray scale/40'],
                textTransform: 'uppercase',
              }}>
              {title}
            </Text>,
          )}
          {t(
            rank,
            <RankBadge rank={rank} flexDirection="row" alignItems="center" />,
          )}
        </Box>
      </Box>

      <Box flexDirection="row">
        <CardButton
          activeOpacity={0.6}
          icon={EasyIcon('phone', 'pm')}
          appearance="outline"
          shape="circle"
          onPress={() => CallContact(phone)}
          containerStyle={{ marginRight: 12 }}
        />
        <CardButton
          activeOpacity={0.6}
          icon={EasyIcon('email', 'pm')}
          appearance="outline"
          shape="circle"
          onPress={() => Linking.openURL(`mailto:${email}`)}
        />
      </Box>
    </Card>
  );
};

export default ServiceProviderCard;

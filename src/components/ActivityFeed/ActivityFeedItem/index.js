import React, { useMemo } from 'react';
import Text from 'components/Text';
import Box from 'components/Box';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import { format } from 'helpers/date';
import { t } from 'helpers/react';
import { LINK_PAGES_TO_SCREEN } from '../consts';
import { typography } from 'styles/typography';
import { styles } from './styles';
import { colors } from 'styles/theme';

const formatTime = date => format(date, 'hh:mm aaa', '', { toDate: true });

const ActivityFeedItem = ({ item, nav, onLinkPress }) => {
  const { text, actions, user, createdAt } = item;
  const { picture, fullName } = user || {};
  const { links } = useMemo(() => (actions ? JSON.parse(actions) : {}), [
    actions,
  ]);
  const handleLinkPress = link => {
    if (onLinkPress) onLinkPress();
    link?.page && nav.navigate(LINK_PAGES_TO_SCREEN[link?.page], link?.params);
  };

  return (
    <Box mb={1} mt={2} flexDirection={'row'} justifyContent={'space-between'}>
      <Box height={72} pl={3}>
        <Avatar
          image={picture}
          imageText={user?.fullName}
          styles={{
            image: {
              borderRadius: 60 / 2,
              backgroundColor: colors['gray scale/5'],
              borderWidth: 0,
              width: 40,
              height: 40,
            },
            imageTextStyle: {
              ...typography['body/xlarge – medium'],
              color: colors['primary/20'],
              fontSize: 16,
            },
          }}
        />
      </Box>
      <Box px={3} flex={1}>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Box>
            <Text
              style={{
                ...typography['body/small – bold'],
                ...typography['textFontFamily'],
                fontSize: 16,
              }}>
              {user?.fullName}
            </Text>
          </Box>
          <Text
            style={{
              ...typography['body/x-small – regular'],
              color: colors['gray scale/40'],
              ...typography['textFontFamily'],
            }}>
            {formatTime(createdAt)?.toLowerCase()}
          </Text>
        </Box>
        <Box>
          <Text
            style={{
              ...typography['body/small – regular'],
              color: colors['gray scale/60'],
            }}
            mb={2}>
            {text}
          </Text>
        </Box>
        {t(
          links,
          <Box flex={1} justifyContent={'center'} mb={4} width="100%">
            {[links]?.map(link => (
              <Button
                containerStyle={{
                  alignItems: 'flex-end',
                }}
                size="small"
                shadow={false}
                onPress={() => handleLinkPress(link)}
                style={styles.btn}
                textStyle={styles.btnTxt}>
                VIEW
              </Button>
            ))}
          </Box>,
        )}
      </Box>
    </Box>
  );
};
export default ActivityFeedItem;

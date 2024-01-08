import React from 'react';
import { Icon } from '@ui-kitten/components';
import Box from 'components/Box';
import Button from 'components/Button';
import Text from 'components/Text';
import Avatar from 'components/Avatar_old';
import { comingSoon } from 'helpers/toast';
import { styles } from './styles';

const ContactCard = ({ item }) => {
  const { picture } = item;

  return (
    <Box style={styles.itemContainer}>
      <Box style={styles.imageContainer}>
        <Avatar
          size="giant"
          source={picture ? { uri: picture } : require('img/profile.svgpng')}
          shape="square"
          style={styles.profilePic}
        />
      </Box>
      <Box style={styles.userName}>
        <Text>{item.fullName}</Text>
      </Box>
      <Box style={{ justifyContent: 'flex-end', width: '25%' }}>
        <Box style={styles.actionButtonsContainer}>
          <Box
            as={Button}
            style={styles.actionButton}
            icon={() => (
              <Icon name={'email'} pack="pm" height={18} width={18} />
            )}
            onPress={comingSoon}
          />
          <Box
            as={Button}
            style={styles.actionButton}
            icon={() => (
              <Icon name={'phone'} pack="pm" height={18} width={18} />
            )}
            onPress={comingSoon}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ContactCard;

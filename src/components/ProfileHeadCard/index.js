import React from 'react';
import { styles } from './styles';
import Box from 'components/Box';
import Avatar from 'components/Avatar';
import Text from '../Text';
import { colors } from 'styles/theme';

const ProfileHeadCard = ({
  userName,
  userType,
  picture,
  title,
  children,
  ...props
}) => {
  return (
    <Box backgroundColor={colors['gray scale/5']} {...props}>
      <Box marginTop={40} style={styles.profileContainer}>
        <Box style={{...styles.profileImageBox, ...props?.imageStyle}}>
          <Avatar
            image={picture}
            imageText={userName}
            styles={{
              image: {
                borderRadius: 84 / 2,
                width: 84,
                height: 84,
              },
              imageTextStyle: {
                fontSize: 28,
                lineHeight: 40,
              },
            }}
          />
        </Box>
        <Text style={{...styles.profileName, ...props?.textStyle}}>{userName}</Text>
        {!!title && <Text style={styles.profileType}>{title}</Text>}
      </Box>
      {children}
    </Box>
  );
};

export default ProfileHeadCard;

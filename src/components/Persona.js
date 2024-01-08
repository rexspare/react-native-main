import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import Box from './Box';
import SelectButtonInputValue from './SelectButtonInputValue/SelectButtonInputValue';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

export const defaultStyles = {
  image: {
    borderRadius: 50 / 2,
    backgroundColor: colors['gray scale/5'],
    borderWidth: 0,
  },
  text: { marginLeft: 10 },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholderTextStyle: {
    ...typography['body/medium – medium'],
    color: colors['primary/20'],
  },
};

export const getInitials = function(string) {
  let names = string?.split(' '),
    initials = names?.[0]?.substring(0, 1)?.toUpperCase();

  if (names?.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const UserValue = ({ name, picture, title, userStyles, ...props }) => (
  <SelectButtonInputValue
    text={name}
    image={picture}
    title={title}
    styles={userStyles}
    {...props}
  />
);

const Persona = ({
  profile,
  name,
  subtext,
  title,
  children,
  styles,
  onPress,
  hideImage,
  showInitial,
  isUppercase,
  ...props
}) => {
  const userStyles = {
    ...defaultStyles,
    ...styles,
    container: { ...defaultStyles.container, ...styles?.innerContainer },
  };
  return (
    <Box
      as={onPress ? TouchableOpacity : Layout}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      onPress={onPress}
      borderRadius={10}
      {...styles?.container}
      {...props}>
      <UserValue
        subtext={subtext}
        name={name}
        title={title}
        picture={profile}
        placeholderText={getInitials(name)}
        children={children}
        userStyles={userStyles}
        styles={userStyles}
        isUppercase={isUppercase}
      />
    </Box>
  );
};

export default Persona;

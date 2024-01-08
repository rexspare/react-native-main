import React from 'react';
import Button from 'components/Button';
import Box from './Box';
import Icon from './Icon';
import ThemedGradient from './ThemedGradient';
import Avatar from 'components/Avatar';
import AddFileModal from './Modals/AddFileModal';
import { colors } from 'styles/theme';

const ProfileImageInput = ({
  value,
  onChange,
  disabled,
  isAvatar,
  name,
  cameraIcon,
  ...props
}) => {
  const [picModal, setPicModal] = React.useState(false);

  return (
    <>
      <Box position="relative" overflow="visible" style={{width:84,height:84}}>
        <Box
          as={ThemedGradient}
          style={{
            width: 84,
            height: 84,
            borderRadius: 84,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor: colors['white'],
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Avatar
            image={value?.uri}
            imageText={name}
            isAvatar={isAvatar}
            cameraIcon={cameraIcon}
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
        <Button
          icon={Icon(value ? 'minus' : 'plus')}
          status={value ? 'danger' : 'primary'}
          appearance={value ? 'filled' : 'filled'}
          onPress={() => (value ? onChange(null) : setPicModal(true))}
          style={{
            paddingHorizontal: 0,
            ...(value ? {} : { backgroundColor: colors['primary/50 – brand'], borderWidth: 1, borderColor: "white" }),
          }}
          containerStyle={{
            position: 'absolute',
            bottom: 5,
            right: 0,
          }}
          disabled={disabled}
          shape="circle"
          size="tiny"
        />
      </Box>
      <AddFileModal
        onHide={() => setPicModal(false)}
        setValue={val => onChange(val?.[0])}
        visible={picModal}
        isImageField={true}
      />
    </>
  );
};

export default ProfileImageInput;

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Box from 'components/Box';
import WhiteCard from 'components/Cards/WhiteCard';
import SelectButtonInputValue from 'components/SelectButtonInputValue/SelectButtonInputValue';
import { t } from 'helpers/react';
import { colors } from 'styles/theme';
import { styles } from './styles';

const DetailedCard = ({
  styles: _styles,
  label,
  content,
  index,
  data,
  ...props
}) => {
  return (
    <WhiteCard
      px={3}
      mb={3}
      header={label}
      headerStyle={{
        fontSize: 16,
        color: colors['gray scale/40'],
        ..._styles?.label,
      }}
      headerProps={{ mt: 10 }}
      headerAppender={t(
        content.buttonText,
        <Box
          mt={10}
          as={TouchableOpacity}
          onPress={content?.onPress}
          style={[styles?.contentButton]}>
          <Text style={[styles?.contentButtonText]}>{content.buttonText}</Text>
        </Box>,
      )}
      {...props}>
      <SelectButtonInputValue
        text={content.text}
        label={label}
        image={content.uri}
        defaultImage={!content.uri && require('img/default.png')}
        subtext={content.subText}
        index={index}
        item={content}
        styles={{
          image: {
            width: 50,
            height: 50,
            borderRadius: label === 'Tenant' ? 50 : 10,
          },
          container: {
            marginTop: 12,
            paddingHorizontal: 4,
            ...props.containerStyle,
          },
          text: {
            fontWeight: label === 'Tenant' ? '500' : '400',
            color: '#131F1E',
            ...{
              textTransform: label !== 'Tenant' ? 'uppercase' : 'capitalize',
            },
          },
          ..._styles,
        }}
      />
    </WhiteCard>
  );
};

export default DetailedCard;

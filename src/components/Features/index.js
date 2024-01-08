import React from 'react';
import { compact } from 'lodash-es';
import Icon from 'components/Icon';
import Box from 'components/Box';
import Text from 'components/Text';
import TouchableText from 'components/TouchableText';
import { t } from 'helpers/react';

const FeatureValue = ({ content, style, onPress, numberOfLines=1 }) => {
  const TextComponent = onPress ? TouchableText : Text;
  
  return (
    <TextComponent
      onPress={onPress}
      style={style}
      numberOfLines={numberOfLines}
      ellipsizeMode='tail'
      mr={2}>
      {content} 
    </TextComponent>
  );
};

const Features = ({
  features = [],
  theme = {},
  styles,
  labelProps,
  conditional,
  borderBottom,
  children,
}) => {
  return (
    <Box {...styles?.container}>
      {compact(features)?.map(
        (
          {
            label,
            contentStyle,
            icon,
            content,
            contentJsx,
            iconProps,
            pack = 'eva',
            styles: _styles,
            onContentPress,
            hideBottomBorder,
            numberOfLines
          },
          i,
        ) =>
          t(
            !conditional || (conditional && (content || contentJsx)),
            <Box
              flexDirection={'row'}
              alignItems={'center'}
              style={[
                i === 0 && { borderTopWidth: 0 },
                styles?.row,
                _styles?.row,
              ]}
              justifyContent={'space-between'}
              pr={15}
              maxWidth={'100%'}
              borderBottomWidth={hideBottomBorder ? 0 : borderBottom && 1}>
              <Box
                maxWidth={'50%'}
                flexDirection={'row'}
                alignItems={'center'}
                style={styles?.labelBox}>
                {t(
                  icon,
                  <Box top={-2} style={_styles?.iconContainer}>
                    {Icon(
                      icon,
                      pack,
                    )({
                      width: 24,
                      height: 24,
                      tintColor: theme['color-primary-700'],
                      ...styles?.icon,
                      ...iconProps,
                    })}
                  </Box>,
                )}
                {t(
                  label,
                  <Text
                    ml="2"
                    category="s3"
                    numberOfLines={1}
                    color={theme['grey-600']}
                    style={[styles?.label, _styles?.label]}
                    {...labelProps}>
                    {label}
                  </Text>,
                )}
              </Box>
              {t(
                content,
                <FeatureValue
                  onPress={onContentPress}
                  style={[[styles?.content, _styles?.content, contentStyle]]}
                  content={content}
                  numberOfLines={numberOfLines}
                />,
                <Box mr={2} height="auto">
                  {contentJsx}
                </Box>,
              )}
            </Box>,
          ),
      )}
      {children}
    </Box>
  );
};

export default Features;

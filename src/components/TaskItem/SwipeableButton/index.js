import Box from "components/Box";
import Button from "components/Button";
import { Icon } from '@ui-kitten/components';
import React from "react";
import { Animated as RNAnimated } from 'react-native';


const SwipeableButton = ({status, onPress, theme, backgroundColor,progress,  icon, text}) => {
    return (
        <Box py="5px" ml="-16" >
        <Box
          as={RNAnimated.View}
          style={{
            opacity: progress?.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.85],
            }),
          }}>
          <Box
            as={Button}
            status={status}
            onPress={onPress}
            backgroundColor={backgroundColor ||  theme['grey-200']}
            style={{ borderColor: theme['grey-200'] }}
            shape="rect"
            height="100%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            icon={style => (
              <Icon name={icon} pack="pm" {...style} />
            )}
            textStyle={{
              fontWeight: '400',
              marginTop: 6,
            }}
            position="absolute">
            {text}
          </Box>
        </Box>
      </Box>
    )
}


export default SwipeableButton;
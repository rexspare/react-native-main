import React from 'react';
import {StyleSheet} from 'react-native';
import {styled} from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';

class Avatar extends React.Component {
  constructor() {
    super(...arguments);
    this.getComponentStyle = source => {
      const {roundCoefficient, ...containerParameters} = source;
      // @ts-ignore: avoid checking `containerParameters`
      const baseStyle = StyleSheet.flatten([
        containerParameters,
        this.props.style,
      ]);
      // @ts-ignore: rhs operator is restricted to be number
      const borderRadius = roundCoefficient * baseStyle.height;
      return {
        borderRadius,
        ...baseStyle,
      };
    };
  }
  render() {
    const {themedStyle, ...restProps} = this.props;
    const componentStyle = this.getComponentStyle(themedStyle);
    return <FastImage {...restProps} style={componentStyle} />;
  }
}

Avatar.styledComponentName = 'Avatar';

export default styled(Avatar);

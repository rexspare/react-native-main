import Features from '../index';
import React from 'react';
import { style } from './style';
import WhiteCard from 'components/Cards/WhiteCard';

const WhiteFeaturesCard = ({
  features,
  containerProps,
  children,
  styles,
  featuresStyles = {},
  ...props
}) => {
  return (
    <WhiteCard headerStyle={style.cardHeader} {...containerProps}>
      <Features
        features={features}
        styles={{ ...style.features, ...styles?.features }}
        borderBottom
        {...props}>
        {props.featuresChildren}
      </Features>
      {children}
    </WhiteCard>
  );
};

export default WhiteFeaturesCard;

import React from 'react';
import {Icon as UIIcon} from '@ui-kitten/components';

const Icon = (name, pack = 'eva', ...a) => {
  return props => <UIIcon  {...props} {...a} name={name} pack={pack}/>;
};

export const IconComponent = ({ pack="pm", ...props}) => <UIIcon pack={pack} {...props} />

export default Icon;

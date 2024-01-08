import React from 'react';
import Text from 'components/Text';
import { RequiredAsterisk } from '../Input';
import { t } from 'helpers/react';

const InputLabel = ({ label, isRequired, labelStyle, ...props }) => (
  <Text style={labelStyle} {...props}>
    {label} {t(isRequired, <RequiredAsterisk />)}
  </Text>
);

export default InputLabel;

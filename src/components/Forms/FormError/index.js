import Box from 'components/Box';
import { IconComponent } from 'components/Icon';
import Text from 'components/Text';
import { t } from 'helpers/react';
import React from 'react';

const FormError = ({ error, ...props }) => {
  return (
    <Box
      mb="3"
      minHeight={18}
      flexDirection={'row'}
      alignItems={'center'}
      {...props}>
      {t(
        !!error,
        <>
          <IconComponent height={12} width={12} name={'error'} />
          <Text marginLeft={1} category="c1" status="danger">
            {error}
          </Text>
        </>,
      )}
    </Box>
  );
};

export default FormError;

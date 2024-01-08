import React from 'react';
import Text from 'components/Text';
import Box from 'components/Box';
import { t } from 'helpers/react';
import { typography } from 'styles/typography';

const WhiteCard = ({
  children,
  header,
  headerProps,
  headerStyle,
  headerAppender,
  ...props
}) => {
  const hstyle = {
    marginBottom: 10,
    marginLeft: 6,
    ...typography['body/medium – medium'],
    ...headerStyle,
  };
  return (
    <Box backgroundColor={'#fff'} width={'100%'} {...props}>
      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        width={'100%'}>
        {t(
          header,
          <Text {...headerProps} style={hstyle}>
            {' '}
            {header}{' '}
          </Text>,
        )}
        {headerAppender}
      </Box>
      {children}
    </Box>
  );
};

export default WhiteCard;

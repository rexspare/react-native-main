import React from 'react';
import {UNIT_STATUS} from 'constants/enums';
import Box from './Box';
import useTheme from 'hooks/useTheme';
import Text from './Text';
import { colors } from 'styles/theme';

const statusColors = {
  [UNIT_STATUS.VACANT]: 'primary/brand',
  [UNIT_STATUS.OCCUPIED]: 'additional/success',
  [UNIT_STATUS.LISTED]: 'primary/50 – brand',
};

const UnitStatusBadge = ({status, draftItem, textProps, ...props}) => {
  const theme = useTheme();
  return (
    <Box
      borderRadius={8}
      backgroundColor={draftItem ? colors['gray scale/30'] : colors[statusColors[status]]}
      py={1}
      px={3}
      {...props}>
      <Text
        category="s3"
        transform="uppercase"
        // fontSize={10}
        status="control"
        textAlign="center"
        {...textProps}>
        {draftItem ? 'DRAFT': Object.keys(UNIT_STATUS)
          .filter(k => UNIT_STATUS[k] === status)
          .map(k =>
            k
              .split('_')
              .map(w => w.toUpperCase())
              .join(' '),
          )}
      </Text>
    </Box>
  );
};

export default UnitStatusBadge;

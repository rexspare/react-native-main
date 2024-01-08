import React from 'react';
import Box from 'components/Box';
import TagValue from './TagValue';

const TagsValue = ({ value, onTagDelete, tagProps, ...props }) => {
  if (!value) return null;
  return (
    <Box flexDirection={'row'} maxWidth={'100%'} flexWrap={'wrap'} {...props}>
      {value.map((v, i) => (
        <TagValue
          key={v.id}
          value={v.name}
          onDelete={onTagDelete && (() => onTagDelete(v))}
          {...tagProps}
        />
      ))}
    </Box>
  );
};

export default TagsValue;

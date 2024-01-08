import React from 'react';
import { ScrollView } from 'react-native';
import { compact } from 'lodash-es';
import Box from 'components/Box';
import PaymentsDetailedCard from './paymentsDetailCard.js';

const DetailedCards = ({ data, styles, children }) => {
  return (
    <Box as={ScrollView} {...styles?.container}>
      {compact(data).map(
        ({ label, content, styles: _styles, variables }, index) => (
          <PaymentsDetailedCard
            label={label}
            content={content}
            data={data}
            index={index}
            styles={{ ...styles, ..._styles }}
            variables={variables}
          />
        ),
      )}
      {children}
    </Box>
  );
};

export default DetailedCards;

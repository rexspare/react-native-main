import React from 'react';
import {Layout} from '@ui-kitten/components';
import EventsList from './EventsList';
import Box from 'components/Box';

const Events = ({navigation}) => {
  return (
    <Box flex={1} as={Layout}>
      <Box flex={1}>
        <EventsList navigation={navigation} />
      </Box>
    </Box>
  );
};

export default Events;

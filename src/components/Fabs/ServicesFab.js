import React from 'react';
import { useFocusEffect } from '@react-navigation/core';
import useFab from 'hooks/useFab';
import FAB from 'components/FAB';

const ServicesFab = ({navigation}) => {
  const canAdd = true;
  const fabContext = useFab();
  const {props: fabProps} = fabContext;

  useFocusEffect(
    React.useCallback(() => {
      fabContext.setProps({
        onPress: canAdd ? () => navigation.navigate("EditServiceProvider") : null
      });
      fabContext.setVisible(canAdd);
    }, [canAdd])
  );

  return (
      <FAB {...fabProps} />
  );
};

export default ServicesFab;
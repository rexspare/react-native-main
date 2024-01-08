import React from 'react';
// import {useNavigation, useRoute} from '@react-navigation/core';

export default function useNestedNavigation(props) {
  const navigation = props.navigation;
  const route = props.route;
  React.useEffect(() => {
    if (route.params?.navigate?.length) {
      navigation.navigate(...route?.params.navigate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);
}

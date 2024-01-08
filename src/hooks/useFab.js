import React from 'react';
import {FABContext} from 'providers/fab';

export default function useFab() {
  return React.useContext(FABContext);
}

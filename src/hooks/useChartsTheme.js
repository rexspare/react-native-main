import React from 'react';
import useTheme from './useTheme';

export default function useChartsTheme() {
  const theme = useTheme();
  return React.useMemo(() => {}, []);
}

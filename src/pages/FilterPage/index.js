import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { noop } from 'lodash';
import { _switch } from 'pages/tasks/TaskFiltersPage/styles';
import Box from 'components/Box';
import Header from 'components/Header';
import { chain } from 'helpers/func';

export const getFilterProps = ({ filter, setFilter }) => field => ({
  checked: filter[field],
  setValue: setFilter(field),
  styles: _switch,
  triggerKey: 'onAdd',
});

const FiltersPage = ({
  navigation,
  children,
  onApply = noop,
  styles: _styles = {},
}) => {
  const handleApply = useCallback(chain([onApply, () => navigation.goBack()]), [
    navigation,
    onApply,
  ]);

  return (
    <Box
      as={ScrollView}
      style={{ marginTop: getStatusBarHeight() + 10, ..._styles?.container }}>
      <Header
        title={'Filters'}
        leftText={'Done'}
        onPressLeftText={handleApply}
        divider
      />
      {children}
    </Box>
  );
};

export default FiltersPage;

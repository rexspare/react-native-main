import React, { useEffect, useMemo, useCallback } from 'react';
import { FlatList } from 'react-native';
import InfiniteFlatList from 'components/InfiniteFlatList';
import { removeValueFromObject } from 'helpers/object';
import { compact } from 'lodash';

const GenericSelectList = ({
  query,
  renderItem,
  options,
  header,
  onSelect,
  valueKey,
  value,
  selectedValues,
  listRef,
  limit,
  isCheckBox,
  setSelectedValues,
  initialValues = [],
  search,
  searchKey,
  ...additionalProps
}) => {
  const { ListComponent, listProps } = useMemo(
    () => ({
      ListComponent: !!query ? InfiniteFlatList : FlatList,
      listProps: !!query
        ? { query, ...additionalProps }
        : { data: options, ...additionalProps },
    }),
    [query, options, additionalProps],
  );

  useEffect(() => {
    if (compact(value).length) {
      const selectedValues = {};
      value.map(item => (selectedValues[item?.[valueKey] || item] = item));
      setSelectedValues(selectedValues);
    } else setSelectedValues({});
  }, [value?.length]);

  const wrappedRenderItem = useCallback(
    ({ item, ...additional }) => {
      const value = item?.[valueKey] || item;
      const isSelected = selectedValues[value];
      if (!search) {
        return renderItem({
          item,
          isSelected,
          onPress: () => toggleIsSelected(isSelected, value, item),
          isCheckBox,
          ...additional,
        });
      } else {
        if (item?.[searchKey]?.includes(search)) {
          return renderItem({
            item,
            isSelected,
            onPress: () => toggleIsSelected(isSelected, value, item),
            isCheckBox,
            ...additional,
          });
        } else return null;
      }
    },
    [selectedValues, renderItem, search],
  );

  const toggleIsSelected = (isSelected, value, item) => {
    if (isSelected)
      return setSelectedValues({
        ...removeValueFromObject(selectedValues, value),
      });
    if (limit && Object.keys(selectedValues).length === limit)
      return setSelectedValues({ [value]: item });
    return setSelectedValues(selectedValues => ({
      ...selectedValues,
      [value]: item,
    }));
  };

  return (
    <>
      <ListComponent
        ListHeaderComponent={header}
        ref={listRef}
        {...listProps}
        keyExtractor={val => val}
        renderItem={wrappedRenderItem}
      />
    </>
  );
};
export default GenericSelectList;

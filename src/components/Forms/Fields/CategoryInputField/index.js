import React, { useCallback } from "react";

import SelectButtonInput from "components/SelectButtonInput";
import { stringifyEnumValue, TASK_TYPES } from "constants/enums";

import styled from 'styled-components/native';
import Button from 'components/Button';
import Box from 'components/Box';
import { Icon } from '@ui-kitten/components';

export const AmenityButton = styled(Button)`
  width: 100%;
  justifyContent: space-between;
  margin-vertical: 6;
  alignItems: center;
  padding-vertical: 18;
`;

const CategoryInputField = ({ navigation, options = [], setValue, value, Component = SelectButtonInput, triggerKey = "onAdd", ...props }) => {

  const renderItem = useCallback(
    ({ item, isSelected, onPress }) => {
      return (
        <AmenityButton
          shadow={false}
          status={isSelected ? 'primary' : 'basic'}
          size="large"
          shape="rounded"
          onPress={onPress}
        >
          {stringifyEnumValue(TASK_TYPES, item)}
        </AmenityButton>
      );
    },
    [],
  );
  // const filteredOptions = React.useMemo(() => {
  //   return categories.filter(
  //     val =>
  //       stringifyEnumValue(TASK_TYPES, val)
  //         .toLowerCase()
  //         .indexOf(search.toLowerCase()) !== -1,
  //   );
  // }, [search]);
  const handleNavigation = () =>
    navigation.navigate('GenericSelectScreen', {
      value: value,
      onSelect: ([taskType]) => setValue(taskType),
      header: "Select a Category",
      renderItem,
      options
    })
  const actionProps = { [triggerKey]: handleNavigation }


  return (
    <Component
      label="Category"
      addLabel="Choose category"
      labelTransform={null}
      value={value && stringifyEnumValue(TASK_TYPES, value)}
      mb={30}
      {...actionProps}
      {...props}
    />
  )
}

export default CategoryInputField;
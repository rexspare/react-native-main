import React, { useCallback } from 'react';
import { styles } from 'pages/properties/BuildingsFiltersModal/styles';
import PopoverField from 'components/Forms/Fields/PopoverField';
import SelectButtonInput from 'components/SelectButtonInput';
import SelectListItem from 'components/SelectListItem/SelectListItem';
import Text from 'components/Text';
import { RENT_TYPES, stringifyEnumValue } from 'constants/enums';

const defaultRenderValue = methods =>
  methods.map(m => (
    <Text style={styles.selectedText}>{stringifyEnumValue(RENT_TYPES, m)}</Text>
  ));

const RegulationStatus = ({
  Component = SelectButtonInput,
  triggerKey = 'onAdd',
  setValue,
  value,
  renderValue = defaultRenderValue,
  limit = false,
  ...props
}) => {
  const renderItem = useCallback(({ item, isSelected, onPress }) => {
    return (
      <SelectListItem
        isSelected={isSelected}
        onPress={onPress}
        item={item}
        text={stringifyEnumValue(RENT_TYPES, item)}
      />
    );
  }, []);
  const options = Object.values(RENT_TYPES);
  return (
    <PopoverField
      triggerKey={triggerKey}
      Component={Component}
      value={value}
      setValue={setValue}
      renderValue={renderValue}
      navigationProps={{
        value: value,
        onSelect: propertyForm => setValue(propertyForm),
        header: 'Select Regulation Status',
        renderItem,
        limit,
        options,
      }}
      mb={null}
      {...props}
      label={'Regulation Status'}
    />
  );
};

export default RegulationStatus;

import React, { useCallback } from 'react';
import { styles } from 'pages/properties/BuildingsFiltersModal/styles';
import PopoverField from 'components/Forms/Fields/PopoverField';
import SelectButtonInput from 'components/SelectButtonInput';
import SelectListItem from 'components/SelectListItem/SelectListItem';
import Text from 'components/Text';
import { PROPERTY_TYPES, stringifyEnumValue } from 'constants/enums';

const defaultRenderValue = methods =>
  methods.map(m => (
    <Text style={styles.selectedText}>
      {stringifyEnumValue(PROPERTY_TYPES, m)}
    </Text>
  ));

const PropertiesType = ({
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
        text={stringifyEnumValue(PROPERTY_TYPES, item)}
      />
    );
  }, []);

  const options = Object.values(PROPERTY_TYPES);

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
        header: 'Select Properties Type',
        renderItem,
        limit,
        options,
      }}
      mb={null}
      {...props}
      label={'Properties Type'}
    />
  );
};

export default PropertiesType;

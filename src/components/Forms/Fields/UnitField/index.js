import React, { useState } from 'react';
import SelectButtonInput from 'components/SelectButtonInput';
import { useGetListProps } from 'hooks/useGetListProps';
import unitSelectQuery from 'queries/properties/listUnitsSelect.gql';
import SelectItemCard from 'components/SelectItemCard';
import PopoverField, { renderSelectInputbuttonValues } from '../PopoverField';
import Box from 'components/Box';
import { renderChildren } from '../SearchField';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const defaultCopy = {
  addLabel: 'Choose a unit',
  label: 'Unit',
};

const styles = {
  text: {
    color: colors['gray scale/90'],
    ...typography['body/medium – regular'],
  },
};

const defaultRenderValue = (units, props) =>
  renderSelectInputbuttonValues(units, 'unitNumber', 'photos', props, styles);

const renderItem = ({ item, isSelected, onPress, isCheckBox }) => {
  return (
    <Box mx={20}>
      <SelectItemCard
        text={item?.unitNumber}
        image={item?.photos?.[0]}
        onPress={onPress}
        isSelected={isSelected}
        defaultImage={item?.photos?.[0] ? null : require('img/default.png')}
        isCheckBox={isCheckBox}
        styles={{
          image: { borderRadius: 10 }, container: { justifyContent: 'space-between' }, text: {
            fontSize: 15,
            textAlign: 'left',
            display: 'flex',
            ...typography.textFontFamily,
            fontWeight: '400',
          }
        }}
      />
    </Box>
  );
};

const UnitField = ({
  setValue,
  value,
  copy = defaultCopy,
  buildingId,
  Component = SelectButtonInput,
  triggerKey = 'onAdd',
  limit = 1,
  renderValue = defaultRenderValue,
  showClearField = false,
  displayDone = true,
  displayDoneRight = false,
  isCheckBox=false,
  variables,
  ...props
}) => {
  const [search, setSearch] = useState(null);
  const listProps = useGetListProps({
    dataKey: 'units',
    labelKey: 'displayName',
  });
  return (
    <PopoverField
      Component={Component}
      value={value}
      triggerKey={triggerKey}
      setValue={setValue}
      renderValue={units => renderValue(units, props)}
      showClearField={showClearField}
      navigationProps={{
        displayDone,
        onSelect: ([unit, ...rest]) =>
          setValue(limit === 1 ? unit : unit && [unit, ...rest]),
        header: 'CHOOSE UNIT',
        renderItem,
        limit,
        isCheckBox,
        query: unitSelectQuery,
        valueKey: 'id',
        initialValues: limit === 1 ? value : [value],
        variables: { buildingId, ...variables },
        searchKey: 'unitNumber',
        search,
        children: renderChildren({ search, setSearch }),
        px: 0,
        isSelectBtn: true,
        styles: {
          headerContainer: {
            marginTop: 7,
            borderBottomWidth: 0,
            justifyContent: 'center',
            flexDirection: 'row',
            paddingBottom: 0,
          },
        },
        ...listProps,
      }}
      labelStyle={
        props.disabled
          ? {
            color: colors['gray scale/30'],
          }
          : {}
      }
      {...props}
      {...copy}
      chooseBtnText={'SELECT'}
    />
  );
};

export default UnitField;

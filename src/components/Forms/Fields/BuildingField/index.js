import React, { useState } from 'react';
import buildingSelectQuery from 'queries/properties/listPropertiesSelect.gql';
import { useGetListProps } from 'hooks/useGetListProps';
import SelectButtonInput from 'components/SelectButtonInput';
import Box from 'components/Box';
import SelectItemCard from 'components/SelectItemCard';
import PopoverField, { renderSelectInputbuttonValues } from '../PopoverField';
import { renderChildren } from '../SearchField';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const defaultCopy = {
  addLabel: 'Choose a building',
  label: 'Building',
};

const styles = {
  text: {
    textTransform: 'uppercase',
    color: colors['gray scale/90'],
    ...typography['body/medium – regular'],
  },
};

const renderItem = ({ item, isSelected, onPress, isCheckBox }) => {
  return (
    <Box mx={20}>
      <SelectItemCard
        text={item?.displayName || item?.address}
        image={item?.photos?.[0]}
        onPress={onPress}
        defaultImage={item?.photos?.[0] ? null : require('img/default.png')}
        isSelected={isSelected}
        isCheckBox={isCheckBox}
        styles={{
          text: {
            textTransform: 'uppercase',
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

export const defaultRenderValue = (buildings, props) =>
  renderSelectInputbuttonValues(
    buildings,
    'displayName',
    'photos',
    props,
    styles,
    props?.mr,
  );

const BuildingField = ({
  setValue,
  value,
  copy = defaultCopy,
  Component = SelectButtonInput,
  triggerKey = 'onAdd',
  limit = 1,
  renderValue = defaultRenderValue,
  showClearField = false,
  isCheckBox=false,
  ...props
}) => {
  const [search, setSearch] = useState(null);
  const buildingListProps = useGetListProps({
    dataKey: 'buildings',
    labelKey: 'displayName',
  });

  return (
    <PopoverField
      Component={Component}
      value={value}
      triggerKey={triggerKey}
      setValue={setValue}
      renderValue={buildings => renderValue(buildings, props)}
      showClearField={showClearField}
      navigationProps={{
        onSelect: ([building, ...rest]) =>
          setValue(limit === 1 ? building : building && [building, ...rest]),
        header: 'CHOOSE BUILDING',
        renderItem,
        limit,
        isCheckBox,
        query: buildingSelectQuery,
        initialValues: limit === 1 ? value : [value],
        valueKey: 'id',
        doneText: 'DONE',
        searchKey: 'displayName',
        search,
        children: renderChildren({ search, setSearch }),
        displayDone: false,
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
        ...buildingListProps,
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

export default BuildingField;

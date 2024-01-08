import React from 'react';
import { SvgUri } from 'react-native-svg';
import SelectButtonInputValue from 'components/SelectButtonInputValue/SelectButtonInputValue';
import SelectButtonInput from 'components/SelectButtonInput';
import { useGetListProps } from 'hooks/useGetListProps';
import listTypesOfService from 'queries/services/listTypesOfService.gql';
import SelectItemCard from 'components/SelectItemCard';
import Box from 'components/Box';
import PopoverField, { normaliseSelectValues } from '../PopoverField';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const renderItem = ({ item, isSelected, onPress }) => {
  return (
    <Box mx={20}>
      <SelectItemCard
        isSelected={isSelected}
        text={item.name}
        image={item?.svg}
        onPress={onPress}
        defaultImage={item?.svg ? null : require('img/default-1.jpg')}
        imageRenderType={item?.svg ? SvgUri : Box}
        styles={base_styles}
      />
    </Box>
  );
};

const defaultRenderValue = (services, props) => {
  return (
    <>
      {services?.map((service, index) => (
        <SelectButtonInputValue
          text={service?.name}
          imageRenderType={service?.svg ? SvgUri : Box}
          image={service?.svg}
          defaultImage={service?.svg ? null : require('img/default-1.jpg')}
          key={service?.id}
          index={index}
          item={service}
          styles={{
            ...base_styles,
            text: {
              color: colors['gray scale/90'],
              ...typography['body/medium – regular'],
            },
          }}
          {...props}
        />
      ))}
    </>
  );
};

const ServiceField = ({
  Component = SelectButtonInput,
  limit,
  triggerKey = 'onAdd',
  setValue,
  value,
  renderValue = defaultRenderValue,
  label = 'Type of service',
  ...props
}) => {
  const listProps = useGetListProps({
    dataKey: 'serviceCategories',
    labelKey: 'displayName',
  });

  return (
    <PopoverField
      value={normaliseSelectValues(value)}
      triggerKey={triggerKey}
      Component={Component}
      renderValue={renderValue}
      navigationProps={{
        value,
        onSelect: ([val]) => setValue(val),
        header: 'CHOOSE SERVICE',
        renderItem,
        limit,
        valueKey: 'id',
        query: listTypesOfService,
        variables: { subCategories_Isnull: true },
        displayDone: false,
        px: 0,
        isSelectBtn: true,
        ...listProps,
      }}
      {...props}
      label={label}
    />
  );
};
const base_styles = {
  container: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 0,
    marginVertical: '3%',
  },
  imageContainer: {
    height: 48,
    borderRadius: 12,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    maxWidth: '72%',
    color: colors['gray scale/90'],
    ...typography['body/small – regular'],
  },
  image: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
};

export default ServiceField;

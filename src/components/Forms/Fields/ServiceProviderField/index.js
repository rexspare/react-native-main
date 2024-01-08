import React from 'react';
import { useGetListProps } from 'hooks/useGetListProps';
import listServiceProvider from 'queries/services/serviceProviderSelect.gql';
import { renderPersonaItem } from 'pages/tasks/SelectAssignees';
import SelectButtonInput from 'components/SelectButtonInput';
import PopoverField, { renderSelectPersonaValues } from '../PopoverField';
import Box from 'components/Box';

const providerItem = ({ isSelected, onPress, item }) =>
  <Box mx={20}>
    {renderPersonaItem({ isSelected, onPress, item, subtext: item.specialty })}
  </Box>

const defaultRenderValue = (providers, props) => {
  return renderSelectPersonaValues(
    providers,
    'fullName',
    'picture',
    false,
    props,
    'specialty',
  );
};

const ServiceProviderField = ({
  Component = SelectButtonInput,
  renderItem = providerItem,
  triggerKey = 'onAdd',
  setValue,
  value,
  serviceId,
  limit,
  serviceName,
  renderValue = defaultRenderValue,
  ...props
}) => {
  const listProps = useGetListProps({
    dataKey: 'serviceProviders',
    labelKey: 'displayName',
  });
  return (
    <PopoverField
      triggerKey={triggerKey}
      Component={Component}
      value={value?.name || value}
      renderValue={renderValue}
      navigationProps={{
        value,
        onSelect: ([val]) => setValue(val),
        header: 'Choose provider',
        renderItem,
        valueKey: 'id',
        query: listServiceProvider,
        variables: { serviceId, serviceName },
        displayDone: false,
        px: 0,
        isSelectBtn: true,
        limit,
        ...listProps,
      }}
      {...props}
      label={'Pay to'}
    />
  );
};

export default ServiceProviderField;

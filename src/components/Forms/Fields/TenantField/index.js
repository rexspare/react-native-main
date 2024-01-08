import { useGetListProps } from 'hooks/useGetListProps';
import React, { useCallback, useState, useRef } from 'react';
import tenantsQuery from 'queries/tenants/tenantSelectQuery.gql';
import { useIsOpen } from 'hooks/useIsOpen';
import { renderPersonaItem } from 'pages/tasks/SelectAssignees';
import SelectButtonInput from 'components/SelectButtonInput';
import Box from 'components/Box';
import Text from 'components/Text';
import TouchableText from 'components/TouchableText';
import PopoverField, { renderSelectPersonaValues } from '../PopoverField';
import AddTenantModal from '../AddTenantModal';
import { renderChildren } from '../SearchField';
import { renderSectionHeader } from 'helpers/list';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const defaultRenderValue = (users, props) =>
  renderSelectPersonaValues(users, 'fullName', 'picture', false, props);

const TenantField = ({
  Component = SelectButtonInput,
  query = tenantsQuery,
  triggerKey = 'onPress',
  limit,
  setValue,
  value,
  valueKey= 'id',
  renderValue = defaultRenderValue,
  addTenant,
  buttonText,
  displayAdd,
  ...props
}) => {
  const listProps = useGetListProps({
    dataKey: 'tenants',
    labelKey: 'fullName',
    ref: listRef,
  });
  const renderItem = useCallback(
    ({ isSelected, onPress, item }) => (
      <Box mx={20}>{renderPersonaItem({ isSelected, onPress, item })}</Box>
    ),
    [],
  );
  const { isOpen, close, open } = useIsOpen();
  const [search, setSearch] = useState(null);
  const [sections, setSections] = useState(null);
  const listRef = useRef();

  const _getSections = data => {
    const users = {};
    data?.map(({ node: { ['fullName']: fullName } }) => {
      users[fullName.charAt(0)] = fullName.charAt(0);
    });
    return Object.keys(users).sort((a, b) => a.localeCompare(b));
  };

  const getSections = _data => {
    const section = _getSections(_data?.tenants?.edges);
    return setSections(section);
  };

  const teantFieldHeaderRight = (
    <TouchableText style={typography['body/small – medium']} onPress={open}>
      Add
    </TouchableText>
  );

  return (
    <PopoverField
      triggerKey={triggerKey}
      Component={Component}
      copy={{ label: 'Tenants', btn: 'ADD FROM LIST' }}
      value={value}
      setValue={setValue}
      isPlusButton={false}
      navigationProps={{
        onSelect: val => setValue(val),
        header: 'Select a Tenant',
        headerRight: displayAdd && teantFieldHeaderRight,
        limit,
        renderItem: renderItem,
        valueKey: valueKey,
        displayDone: false,
        addTenant,
        buttonText,
        open,
        query,
        dataExtractor: data => data?.tenants,
        onResCallback: res => getSections(res?.data),
        sections: sections,
        keyExtractor: data => data.id,
        sectionExtractor: item => item?.fullName.charAt(0).toUpperCase(),
        renderSectionHeader: section =>
          renderSectionHeader(section, {
            ...typography['body/xlarge – medium'],
            color: colors['gray scale/90'],
          }),
        ListEmptyComponent: () => (
          <Text category="h6" py={3} textAlign="center" appearance="hint">
            No Users
          </Text>
        ),
        px: 0,
        children: (
          <>
            {renderChildren({ search, setSearch })}
            {displayAdd || addTenant && (
              <AddTenantModal
                isOpen={isOpen}
                close={close}
                setValue={val => setValue(val)}
              />
            )}
          </>
        ),
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
      renderValue={users => renderValue(users, props)}
      {...props}
      label={'Tenants'}
    />
  );
};

export default TenantField;

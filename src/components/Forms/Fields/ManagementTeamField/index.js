import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { useQuery } from 'urql';
import { useIsOpen } from 'hooks/useIsOpen';
import useFilter from 'hooks/useFilter';
import { useTabs } from 'hooks/useTabs';
import getManagementCompanyEmployees from 'queries/properties/getAllManagementUsers.gql';
import { renderPersonaItem } from 'pages/tasks/SelectAssignees';
import BuildingFilter from 'pages/tenants/TenantTabs/BuildingFilter';
import SelectButtonInput from 'components/SelectButtonInput';
import Box from 'components/Box';
import Input from 'components/Input';
import Icon from 'components/Icon';
import MultiTextSwitch from 'components/MultiTextSwitch';
import FAB from 'components/FAB';
import BottomHalfModal from 'components/BottomHalfModal';
import { renderSelectPersonaValues } from '../PopoverField';
import { chain } from 'helpers/func';
import { removeFilterObjectFromArray } from 'helpers/array';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const { height } = Dimensions.get('screen');
const defaultCopy = {
  label: 'Management Team',
  btn: 'ADD FROM LIST',
  labelStyle: {
    ...typography['body/medium – medium'],
    color: colors['gray scale/40'],
    textTransform: 'uppercase',
  },
};

export const defaultRenderValue = (managementUsers, props) =>
  renderSelectPersonaValues(
    managementUsers,
    'fullName',
    'picture',
    false,
    props,
  );

const tabs = [
  {
    TabComponent: ({ managementUser, removeItem, filter, props }) => {
      props.removeItem = removeItem;
      return renderSelectPersonaValues(
        managementUser,
        'fullName',
        'picture',
        filter,
        props,
      );
    },
  },
  {
    TabComponent: ({ managementUser, isSelected, onPress }) =>
      renderPersonaItem({ item: managementUser, isSelected, onPress }),
  },
];

export const renderChildren = ({
  setActiveTabIndex,
  activeTab,
  setActiveTab,
  setShowBuildingFilter,
  showBuildingFilter,
  building,
  setFilter,
}) => {
  const [search, setSearch] = React.useState('');

  const selectTab = i => {
    setActiveTab(i);
    setActiveTabIndex(i);
  };

  return (
    <Box py={1}>
      <Input
        icon={Icon('search')}
        placeholder="Search for a Member"
        size="small"
        mb={10}
        value={search}
        onChangeText={setSearch}
      />
      <MultiTextSwitch
        value={activeTab}
        shape="circle"
        size="small"
        options={[
          { text: 'Assigned', value: 'assigned', flex: 1 },
          { text: 'UnAssigned', value: 'unAssigned', flex: 1 },
        ]}
        onSelect={(_, i) => selectTab(i)}
        themedStyle={{ borderColor: 'red' }}
      />
      <BuildingFilter
        setFilter={building => setFilter('building', building)}
        value={building}
        isOpen={showBuildingFilter}
        close={() => setShowBuildingFilter(false)}
        open={() => setShowBuildingFilter(true)}
        styles={{ container: { marginTop: 10 } }}
      />
    </Box>
  );
};

const ManagementTeamField = ({
  Component = SelectButtonInput,
  query = getManagementCompanyEmployees,
  triggerKey = 'onAdd',
  setValue,
  value = [],
  copy = defaultCopy,
  limit,
  renderValue = defaultRenderValue,
  addLabel = 'Edit Management Team',
  styles,
  isPlusIcon,
  navigation,
  ...props
}) => {
  const actionsProps = { [triggerKey]: () => open() };
  const { isOpen, open, close } = useIsOpen();
  const [activeTab, setActiveTab] = useState(0);
  const [managementUsers, setManagementUsers] = useState([]);
  const [showBuildingFilter, setShowBuildingFilter] = useState(false);
  const [{ building }, setFilter] = useFilter('building');
  const { TabComponent, setActiveTabIndex } = useTabs(tabs);
  const [managementUserRes, fetchManagementUsers] = useQuery({
    query: getManagementCompanyEmployees,
  });

  useEffect(() => {
    !managementUsers?.length &&
      setManagementUsers(managementUserRes?.data?.managementUsers?.edges);
  }, [managementUserRes]);

  const handleSelection = useCallback(
    node => {
      const managersArr = [...value];
      const newItem = managersArr.find(item => {
        return item?.id === node?.id;
      });

      if (!newItem) {
        managersArr.push(node);
      } else {
        const index = managersArr.findIndex(item => item?.id === node?.id);
        managersArr.splice(index, 1);
      }
      setValue(managersArr);
    },
    [value],
  );

  return (
    <>
      <Component
        value={!!value?.length && value[0] != undefined ? value : null}
        mt={1}
        renderValue={user => renderValue(user, props)}
        isPlusIcon={isPlusIcon}
        onPress={open}
        copy={copy}
        {...props}
        {...actionsProps}
        {...copy}
      />
      <BottomHalfModal
        visible={isOpen}
        onHide={chain([close, () => setValue(value)])}
        displayDone
        title={addLabel}
        styles={{
          headerTxt: {
            ...typography['body/large – Bold'],
            color: colors['gray scale/90'],
            bottom: 7,
          },
        }}>
        <Box as={ScrollView} height={(height / 100) * 70}>
          {renderChildren({
            setActiveTabIndex,
            activeTab,
            setActiveTab,
            setShowBuildingFilter,
            showBuildingFilter,
            building,
            setFilter,
          })}
          {activeTab == 0 ? (
            <TabComponent
              managementUser={value}
              filter={building}
              removeItem={managementUser => {
                const filteredList =
                  removeFilterObjectFromArray(
                    value,
                    managementUser?.id,
                    'id',
                  ) || [];
                setValue(filteredList);
              }}
              props={props}
            />
          ) : (
            managementUsers?.length &&
            managementUsers.map(({ node }) => {
              const buildingFilter = node?.buildings?.edges?.findIndex(
                item => item?.node?.id === building?.id,
              );
              if (buildingFilter != -1 || !building) {
                return (
                  <TabComponent
                    onPress={() => handleSelection(node)}
                    managementUser={node}
                    isSelected={value.some(item => item?.id === node?.id)}
                    props={props}
                  />
                );
              }
            })
          )}
        </Box>
        <FAB
          onPress={chain([
            close,
            () =>
              navigation.navigate('AddManager', {
                onSuccess: () =>
                  fetchManagementUsers({
                    requestPolicy: 'network-only',
                  }),
              }),
          ])}
        />
      </BottomHalfModal>
    </>
  );
};

export default ManagementTeamField;

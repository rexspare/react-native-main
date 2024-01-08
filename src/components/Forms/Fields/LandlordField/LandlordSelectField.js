import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { useGetListProps } from 'hooks/useGetListProps';
import listLandlordsQuery from 'queries/landlord/landLordsList.gql';
import { renderPersonaItem } from 'pages/tasks/SelectAssignees';
import Persona from 'components/Persona';
import Box from 'components/Box';
import PopoverField from '../PopoverField';
import ButtonField from '../ButtonField';
import AddMoreButton from 'img/icons/plus.svg';
import { t } from 'helpers/react';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const defaultCopy = {
  label: 'Landlord',
  btn: 'ADD FROM LIST',
  btnUpdateLabel: (
    <Box
      style={{
        width: 36,
        height: 39,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <AddMoreButton width={15} height={15} />
    </Box>
  ),
};

const LandlordSelectField = ({
  Component = ButtonField,
  query = listLandlordsQuery,
  triggerKey = 'onPress',
  setValue,
  value,
  copy = defaultCopy,
  limit,
  editing,
  owner,
  isPlusButton,
  renderValue,
  ...props
}) => {
  const listProps = useGetListProps({
    dataKey: 'landlords',
    labelKey: 'fullName',
  });

  const renderValueFn = value =>
    value?.map((user, i) => (
      <Box flexDirection="row" alignItems="center">
        <Persona
          styles={{
            innerContainer: {
              paddingVertical: 0,
              alignItems: 'center',
              paddingBottom: 0,
            },
            container: { justifyContent: 'space-between' },
            text: {
              color: colors['gray scale/90'],
              ...typography['body/medium – medium'],
              marginLeft: -7,
            },
          }}
          px={0}
          mt={1}
          width='100%'
          profile={user?.picture}
          name={user?.fullName}
        />
        {t(
          props?.removeItem,
          <Box
            as={TouchableOpacity}
            marginLeft={-27}
            onPress={() => props?.removeItem(user, i)}>
            <Icon width={20} height={20} pack={'pm'} name={'remove'} />
          </Box>,
        )}
      </Box>
    ));

  return (
    <PopoverField
      triggerKey={triggerKey}
      Component={Component}
      value={value}
      setValue={setValue}
      copy={copy}
      {...copy}
      isPlusButton={isPlusButton}
      navigationProps={{
        onSelect: val => setValue(val),
        header: 'Landlords',
        renderItem: renderPersonaItem,
        valueKey: 'id',
        query,
        limit,
        ...listProps,
      }}
      renderValue={renderValueFn}
      {...props}
    />
  );
};

export default LandlordSelectField;

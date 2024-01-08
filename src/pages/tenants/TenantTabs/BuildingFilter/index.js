import React from 'react';
import Box from 'components/Box';
import BuildingField from 'components/Forms/Fields/BuildingField';
import SelectButtonInputValue from 'components/SelectButtonInputValue/SelectButtonInputValue';
import { t } from 'helpers/react';
import SelectButtonInput from 'components/SelectButtonInput';
import { colors } from 'styles/theme';

const BuildingFilter = ({ setFilter, value, isOpen, close, styles, open }) => {
  return (
    <Box
      mx={1}
      px={3}
      mb="2px"
      style={styles?.container}>
      <BuildingField
        setValue={val => setFilter(val)}
        renderValue={() => null}
        value={value}
        isModalOpen={isOpen}
        onClose={() => close()}
        isButtonComponent={false}
      />
      {t(
        (value && !open),
        <Box borderTopWidth={1} borderBottomWidth={1} borderColor={colors['gray scale/10']} py={2} alignItems={'center'} justifyContent={'center'}>
          <SelectButtonInputValue
            styles={{ container: { width: '100%', paddingBottom: 0 } }}
            text={value?.displayName}
            image={value?.photos?.[0]}
          />
        </Box>,
      )}
      {t(open, <SelectButtonInput
        style={{borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors['gray scale/10']}}
        value={value}
        chooseBtnText={'SELECT'}
        label={"Filter By Building"}
        onAdd={open}
        renderValue={(value) => <Box mb={3} alignItems={'center'} justifyContent={'center'}>
          <SelectButtonInputValue
            styles={{ container: { width: '100%', paddingBottom: 0, marginLeft: 1 } }}
            text={value?.displayName}
            image={value?.photos?.[0]}
          />
        </Box>}
      />)}
    </Box>
  );
};

export default BuildingFilter;

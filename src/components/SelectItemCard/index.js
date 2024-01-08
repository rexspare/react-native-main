import React from 'react';
import { RadioCircle } from 'components/TabListSelect/TabListButton';
import SelectButtonInputValue from 'components/SelectButtonInputValue/SelectButtonInputValue';
import Box from 'components/Box';
import { Icon } from '@ui-kitten/components';
import { t } from "helpers/react";
import { colors } from 'styles/theme';

const SelectItemCard = ({ isSelected, ...props }) => {
  return (
    <SelectButtonInputValue styles={{ ...styles, ...props.styles }} {...props}>
      {t(!props?.isCheckBox, <RadioCircle isChecked={isSelected} />)}
      {t(props?.isCheckBox, <Box
        style={styles.checkbox}
        borderColor={isSelected ? colors['primary/50'] : colors['gray scale/30']}
      >
        {t(isSelected, <Icon width={15} height={15} pack={'pm'} name={"checkIcon"} fill={isSelected ? "red" : (0, 0, 0)} />)}
      </Box>)}
    </SelectButtonInputValue>
  );
};

const styles = {
  container: { justifyContent: 'space-between', marginBottom: '3%' },
  image: { borderRadius: 25 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default SelectItemCard;

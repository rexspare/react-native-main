import React from 'react';
import { noop } from 'lodash';
import Box from 'components/Box';
import Text from 'components/Text';
import TabListButton from './TabListButton';
import { t } from 'helpers/react';

const TabListSelect = ({
  values,
  onPress = noop,
  isRadio,
  currentSelectedItem,
  flexDirection,
  buttonWidth,
  label,
  style,
}) => {
  const _renderRadioButtons = () => {
    return (values || []).map((selectedItem, i) => {
      let isChecked =
        currentSelectedItem &&
        currentSelectedItem?.value === selectedItem?.value;

      return (
        <TabListButton
          buttonWidth={buttonWidth}
          key={i}
          onButtonPress={() => onPress(selectedItem)}
          isChecked={isChecked}
          isRadio={isRadio}
          icon={selectedItem.icon}
          text={selectedItem.text}
          textStyle={style?.text}
        />
      );
    });
  };

  return (
    <Box
      flexDirection={flexDirection}
      style={[styles.container, style?.container]}>
      {t(label, <Text style={style?.text}>{label}</Text>)}
      {_renderRadioButtons()}
    </Box>
  );
};

const styles = {
  container: {
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-evenly',
  },
};

export default TabListSelect;

import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { compact } from 'lodash';
import Box from 'components/Box';
import Button from 'components/Button';
import AddMoreButton from 'img/icons/plus.svg';
import Remove from 'img/icons/remove-circle.svg';
import { style } from '../style';

export const PlusButton = ({ onPress }) => {
  return (
    <Box style={style.changeBtn}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: 32,
          height: 32,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AddMoreButton width={15} height={15} />
      </TouchableOpacity>
    </Box>
  );
};

const SelectButton = ({
  onPress,
  isChange,
  displayChange,
  disabled,
  chooseBtnText,
  changeBtnText,
  isPlusIcon,
  value,
  isSelected,
  ...props
}) => {
  if (isChange && !displayChange) return null;

  return !isPlusIcon ? (
    <Box style={style.chooseBtnContainer} px={1} flexDirection="row">
      {props?.removeItem &&
        value?.length > 0 &&
        props?.isMultipleDeleteExist &&
        compact(value).map((v, i) => (
          <Box
            as={TouchableOpacity}
            marginRight={10}
            onPress={() => props?.removeItem(v, i)}>
            <Remove style={{ marginTop: 3, marginRight: 5 }} />
          </Box>
        ))}
      <Button
        size="small"
        style={
          disabled
            ? style.disabled
            : isChange
            ? style.changeBtn
            : style.chooseBtn
        }
        appearance="outline"
        onPress={onPress}
        disabled={!onPress || disabled}
        {...props}
        textStyle={disabled ? style.disabledBtnText : style.chooseBtnText}>
        {chooseBtnText}
      </Button>
    </Box>
  ) : (
    <PlusButton isChange={isChange} onPress={onPress} />
  );
};

export default SelectButton;

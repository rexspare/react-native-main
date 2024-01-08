import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import TabListButton from 'components/TabListSelect/TabListButton';
import FullPageBottomModal from './FullPageBottomModal';
import SelectListItem from './SelectListItem/SelectListItem';
import Text from './Text';
import Input from './Input';
import Icon from './Icon';
import Button from './Button';
import { colors } from 'styles/theme';

const SelectModal = ({
  open,
  close,
  title,
  values,
  onSelect,
  selectedValue,
  onPress = () => {},
  handleOtherInput,
  isCheckbox,
  isOther = false,
  text,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');
  const [modalType, setModalType] = useState(isOther);

  useEffect(() => {
    setModalType(isOther);
  }, [isOther]);

  return (
    <>
      <FullPageBottomModal
        modalHeight={modalType ? 160 : null}
        displayDone={false}
        visible={open}
        onHide={close}
        title={title}
        styles={{
          headerTxt: { textTransform: 'uppercase', fontWeight: 'bold' },
        }}>
        {modalType ? (
          <>
            <Input
              labelStyle={{
                color: colors['gray scale/40'],
                fontWeight: '500',
                marginTop: 10,
              }}
              label="OTHER"
              isUppercase
              onChangeText={val => setInputValue(val)}
              size={'large'}
              icon={Icon('expandInput', 'pm')}
            />
            <Button
              style={{ borderRadius: 12, marginTop: 40 }}
              size={'large'}
              textStyle={{ fontSize: 16, textTransform: 'uppercase' }}
              onPress={() => !!inputValue && handleOtherInput(inputValue)}>
              Save
            </Button>
          </>
        ) : (
          <ScrollView>
            {text && (
              <Text
                style={[
                  {
                    fontSize: 16,
                    fontWeight: '500',
                    color: colors['gray scale/40'],
                    textTransform: 'uppercase',
                    marginTop: 12,
                  },
                  props.textStyle,
                ]}>
                {text}
              </Text>
            )}
            {values.map((e, index) => {
              return isCheckbox ? (
                <SelectListItem
                  text={e.text}
                  onPress={() => {
                    onSelect(e);
                    onPress();
                  }}
                  isSelected={
                    selectedValue && selectedValue?.find(e => e === index) >= 0
                  }
                />
              ) : (
                <TabListButton
                  key={index}
                  isRadio={true}
                  text={e.text}
                  onButtonPress={() => {
                    onSelect(e);
                    onPress();
                  }}
                  isChecked={selectedValue === index}
                />
              );
            })}
          </ScrollView>
        )}
      </FullPageBottomModal>
    </>
  );
};

export default SelectModal;

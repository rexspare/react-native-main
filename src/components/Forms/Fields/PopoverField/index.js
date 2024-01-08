import React, { useEffect, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@ui-kitten/components';
import { compact, isArray } from 'lodash';
import { useIsOpen } from 'hooks/useIsOpen';
import SelectButtonInput from 'components/SelectButtonInput';
import SelectButtonInputValue from 'components/SelectButtonInputValue/SelectButtonInputValue';
import GenericSelectModal from 'components/GenericSelectModal';
import Box from 'components/Box';
import  { defaultStyles, getInitials } from 'components/Persona';
import { t } from 'helpers/react';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const PopoverField = ({
  navigationProps,
  value: _value,
  Component = SelectButtonInput,
  triggerKey = 'onAdd',
  isModal = true,
  popoverPageName = 'GenericSelectScreen',
  openSelectOnValuePress,
  showClearField,
  isButtonComponent = true,
  ...props
}) => {
  const navigation = useNavigation();
  const { isOpen, open, close } = useIsOpen();
  let value = useMemo(() => normaliseSelectValues(_value), [_value]);
  const handleNavigation = () =>
    navigation.navigate(popoverPageName, { value, ...navigationProps });
  const openSelect = isModal ? open : handleNavigation;
  const actionProps = { [triggerKey]: openSelect };

  useEffect(() => {
    if (props.isModalOpen) {
      openSelect();
    }
  }, [props.isModalOpen]);

  const onModalHide = () => {
    close();
    !!props?.onClose && props?.onClose();
  };

  return (
    <>
      {isButtonComponent && (
        <Component
          value={value}
          showClearField={showClearField}
          addLabelTransform={null}
          mt={0}
          isPlusButton={false}
          renderValueProps={
            (openSelectOnValuePress || props?.removeItem) && {
              onPress: openSelect,
              removeItem: props?.removeItem,
            }
          }
          {...actionProps}
          {...props}
        />
      )}

      {t(
        isModal,
        <GenericSelectModal
          visible={isOpen}
          value={value}
          onHide={onModalHide}
          {...navigationProps}
        />,
      )}
    </>
  );
};
export const normaliseSelectValues = value =>
  value && (isArray(value) ? value : [value]);

export const renderSelectInputbuttonValues = (
  value,
  textKey,
  imageKey,
  props,
  _styles,
  mr = 14,
) =>
  compact(value).map((v, i) => (
    <SelectButtonInputValue
      styles={{ ...styles, ..._styles }}
      text={v[textKey]}
      image={isArray(v[imageKey]) ? v[imageKey][0] : v[imageKey]}
      key={v?.id || i}
      {...props}>
      {props?.removeItem && !props?.isMultipleDeleteExist && (
        <Box
          as={TouchableOpacity}
          marginRight={mr}
          onPress={() => props?.removeItem(v, i)}>
          <Icon width={20} height={20} pack={'pm'} name={'remove'} />
        </Box>
      )}
    </SelectButtonInputValue>
  ));

export const renderSelectPersonaValues = (
  value,
  textKey,
  imageKey,
  filter,
  props,
  subtextKey,
) =>
  compact(value).map((v, i) => {
    const buildingFilter = v?.buildings?.edges?.findIndex(
      item => item?.node?.id === filter?.id,
    );
    if (buildingFilter != -1 || !filter) {
      return (
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          borderRadius={10}
          {...styles?.container}
          {...props}>
          <SelectButtonInputValue
            styles={{
              ...defaultStyles, ...styles,
              container: { ...defaultStyles.container, ...styles?.innerContainer },
            }}
            text={v[textKey] || v.node.fullName}
            image={isArray(v[imageKey]) ? v[imageKey][0] : v[imageKey] || v?.node?.picture}
            key={v?.id || i}
            placeholderText={getInitials(v[textKey] || v.node.fullName)}
            subtext={v[subtextKey]}
            {...props}>
            {props?.removeItem && (
              <Box
                marginLeft={18}
                as={TouchableOpacity}
                onPress={() => props?.removeItem(v, i)}>
                <Icon width={20} height={20} pack={'pm'} name={'remove'} />
              </Box>
            )}
          </SelectButtonInputValue>
        </Box>
      );
    }
  });

const styles = {
  container: { width: '100%', justifyContent: 'space-between' },
  text: {
    color: colors['gray scale/90'],
    ...typography['body/medium – medium'],
    fontFamily: 'Roboto',
    marginLeft: 0,
  },
};

export default PopoverField;

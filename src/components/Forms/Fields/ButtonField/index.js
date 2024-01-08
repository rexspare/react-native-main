import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { compact } from 'lodash';
import Button from 'components/Button';
import Box from 'components/Box';
import Text from 'components/Text';
import { RequiredAsterisk } from 'components/Input';
import { deleteBtnProps } from 'components/Button/const';
import { PlusButton } from 'components/SelectButtonInput/SelectButton';
import AddMoreButton from 'img/icons/plus.svg';
import Remove from 'img/icons/remove-circle.svg';
import { t } from 'helpers/react';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';
import { styles } from './styles';

const ButtonField = ({
  copy,
  setValue,
  value,
  isPlusButton,
  addMore = true,
  clearAll = true,
  onPress,
  addMoreProps,
  isRequired,
  renderValue: _renderValue,
  removeItems,
  disabled,
  ...props
}) => {
  const actions = disabled
    ? []
    : compact([
        clearAll &&
          value && {
            ...deleteBtnProps,
            onPress: () => setValue(null),
          },
        addMore && {
          children: copy?.btnUpdateLabel || (
            <Box
              style={{
                width: 36,
                height: 39,
                marginTop: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AddMoreButton
                width={15}
                height={15}
                style={{ paddingLeft: 20 }}
              />
            </Box>
          ),
          onPress: onPress,
          shadow: false,
          ...styles.addMoreAction,
          ...addMoreProps,
        },
        addMore && {
          children: props.btnUpdateLabel ?? (
            <Box
              style={{
                width: 36,
                height: 39,
                marginTop: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AddMoreButton
                width={15}
                height={15}
                style={{ paddingLeft: 20 }}
              />
            </Box>
          ),
          onPress: onPress,
          shadow: false,
          ...styles.addMoreAction,
          ...addMoreProps,
        },
      ]);

  const renderValue = useCallback(value =>
    _renderValue ? _renderValue(value) : value,
  );

  return (
    <Box pb={'18px'} width={'100%'} style={{ marginTop: 10 }}>
      <Box
        flexDirection={
          !isPlusButton && (!value || value?.length === 0) ? 'column' : 'row'
        }
        justifyContent={'space-between'}>
        {t(
          props?.label || copy?.label,
          <Text
            transform="uppercase"
            style={[
              {
                ...typography['body/medium – medium'],
                color: colors['gray scale/40'],
              },
              props?.styles?.labelStyle,
            ]}
            fontSize={16}>
            {props?.label || copy?.label}
            {t(isRequired, <RequiredAsterisk />)}
          </Text>,
        )}
        <Box flexDirection={!!removeItems && !!value ? 'row' : 'column'}>
          {!!removeItems && !!value && (
            <Box as={TouchableOpacity} marginRight={10} onPress={removeItems}>
              <Remove style={{ marginTop: 3, marginRight: 5 }} />
            </Box>
          )}
          {isPlusButton ? (
            <PlusButton onPress={onPress} />
          ) : !value || value?.length === 0 ? (
            <Button
              onPress={onPress}
              appearance="outline"
              style={{ backgroundColor: 'white', borderRadius: 12, top: 10 }}
              textStyle={{
                ...typography['body/medium – regular'],
                fontWeight: '500',
                ...props.buttonTextStyle,
              }}>
              {copy?.btn || props.btn}
            </Button>
          ) : (
            <PlusButton onPress={onPress} />
          )}
        </Box>
      </Box>
      {t(value, renderValue(value))}
    </Box>
  );
};

export default ButtonField;

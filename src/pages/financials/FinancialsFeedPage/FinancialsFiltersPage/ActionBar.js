import React from 'react';
import Box from 'components/Box';
import Text from 'components/Text';
import Button from 'components/Button';
import { isString } from 'lodash';
import Icon from 'components/Icon';
import { styles as _styles } from './styles';
import { t } from 'helpers/react';
import { useIsOpen } from 'hooks/useIsOpen';
import InputLabel from 'components/InputLabel';
import { input_label_16 } from 'styles/reusable-classes';
import { colors } from 'styles/theme';

// To-Do: Merge with the existing SelectButtonInput and jut have option for the minimise and delete actions etc..
const ActionBar = ({
  value,
  label,
  addLabel,
  onAdd,
  icon = 'plus',
  labelCategory = 'label',
  renderValue,
  addLabelTransform = null,
  buttonProps,
  LabelComponent = Text,
  styles,
  setValue,
  renderValueProps,
  disabled,
  ...props
}) => {
  const { isOpen, toggle } = useIsOpen(true);
  const onRemove = () => setValue(null);

  return (
    <Box
      width={'100%'}
      flexWrap="wrap"
      flexDirection="row"
      paddingTop="2.5%"
      paddingBottom="2.5%"
      {...props}>
      <Box
        width="50%"
        flexDirection="row"
        alignItems="center"
        alignSelf="center"
        px={1}
        py="10">
        <InputLabel label={label} labelStyle={input_label_16} />
        {t(value && value?.length, <Box bg={colors['primary/50 – brand']} style={_styles?.countContainer}><Text style ={_styles?.countText}>{value?.length}</Text></Box>)}
      </Box>
      {value ? (
        <>
          <Box
            flexDirection="row"
            width="50%"
            alignItems="center"
            justifyContent="flex-end">
            <Box
              as={Button}
              appearance="ghost"
              onPress={onRemove}
              py="0px"
              px="0px"
              style={_styles.removeFliterBox}
              icon={style =>
                Icon(
                  'remove-filter',
                  'pm',
                )({ height: 21, width: 21})
              }
            />
            <Box
              as={Button}
              appearance="ghost"
              onPress={toggle}
              py="0px"
              px="0px"
              style={_styles.dropdownFilterBox}
              icon={style =>
                Icon(
                  'dropdown-filter',
                  'pm',
                )({ height: 19, width: 18 })
              }
            />
          </Box>
          {t(
            isOpen,
            renderValue?.(value, renderValueProps) ?? (
              <Box width="100%" mt="8px">
                {isString(value) ? <Text>{value}</Text> : value}
              </Box>
            ),
          )}
        </>
      ) : (
        <Box width="50%" height="100%" px={1} py="10">
          <Button
            size="small"
            appearance="outline"
            onPress={onAdd}
            disabled={!onAdd || disabled}
            {...buttonProps}
            style={_styles.chooseButton}
            textStyle={_styles.chooseButtonText}>
            SELECT
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ActionBar;

import React, { useEffect } from 'react';
import Box from 'components/Box.js';
import Button from 'components/Button';
import Text from 'components/Text';
import TextInputField from '../TextInputField/index.js';
import { styles } from './styles.js';
import { t } from 'helpers/react.js';
import { isInteger, isString } from 'lodash';
import { useIsOpen } from 'hooks/useIsOpen.js';
import { typography } from 'styles/typography.js';
import SelectInput from 'components/SelectInput';
import {
  formatEnumToSelectOptions,
  stringifyEnumValue,
} from 'constants/enums.js';
import { colors } from 'styles/theme.js';

const commonProps = {
  labelStyle: styles.labelStyle,
  style: styles.input,
  size: 'large',
};
const ExpandableInputList = ({ values, zip, setValue, form }) => {
  const { isOpen, toggle, open } = useIsOpen();

  const btnProps = isOpen
    ? {
        children: 'COLLAPSE FIELDS',
        style: styles.collapseBtn,
        textStyle: styles.collapseBtnText,
      }
    : {
        children: `+${values.length}`,
        style: styles.expandBtn,
        textStyle: styles.btnText,
      };

  useEffect(() => {
    if (values.find(val => val.value !== null)) {
      open(true);
    }
  }, [values]);

  const ExpandBtnElements = () => {
    return (
      <Box style={styles.expandBtnElements}>
        <Box
          as={Button}
          onPress={() => {
            toggle(!isOpen);
          }}
          opacity={0.4}
          style={styles.expandBtnUnderBottom}></Box>
        <Box
          as={Button}
          onPress={() => {
            toggle(!isOpen);
          }}
          opacity={0.7}
          style={styles.expandBtnUnderMid}></Box>
      </Box>
    );
  };

  return (
    <Box style={styles.mainContainer}>
      <Box
        flexDirection={'row'}
        justifyContent="space-between"
        alignItems={'center'}>
        <Text
          marginRight={1}
          style={{
            ...typography['body/medium – medium'],
            textTransform: 'uppercase',
            color: colors['gray scale/40'],
          }}>
          Automated fields
        </Text>
        {t(
          !isOpen,
          <Text
            marginRight={1}
            style={{
              ...typography['body/medium – regular'],
              color: colors['gray scale/30'],
            }}>
            Tap to expand
          </Text>,
        )}
      </Box>
      {t(
        isOpen,
        values?.map(({ label, value, formatter, options, key }, i) => {
          let val = formatter
            ? formatter(value)
            : isInteger(value)
            ? value.toString()
            : isString(value) && value;
          if (options) {
            return (
              <SelectInput
                label="Property type"
                placeholder="Select from list"
                options={formatEnumToSelectOptions(options)}
                value={stringifyEnumValue(options, val)}
                onSelect={val => setValue('propertyType', val?.key)}
                {...commonProps}
              />
            );
          } else {
            return (
              <TextInputField
                key={i}
                text={label}
                value={label === 'Zip Code' ? zip : val}
                size={'large'}
                onChange={val => setValue({ ...form, [key]: val })}
                disabled={(label === 'Zip Code' && zip) || value}
              />
            );
          }
        }),
      )}
      <Box as={Button} onPress={toggle} {...btnProps} />
      {!isOpen && <ExpandBtnElements />}
    </Box>
  );
};

export default ExpandableInputList;

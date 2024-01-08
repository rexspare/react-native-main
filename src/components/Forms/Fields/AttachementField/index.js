import React from 'react';
import SelectButtonInput from 'components/SelectButtonInput';
import AttachmentModal from 'components/AttachmentModal';
import SelectButtonInputValue from 'components/SelectButtonInputValue/SelectButtonInputValue';
import Box from 'components/Box';
import { useIsOpen } from 'hooks/useIsOpen';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const styles = {
  container: { width: '100%', justifyContent: 'space-between' },
  text: {
    color: colors['gray scale/90'],
    ...typography['body/medium – regular'],
  },
};

const defaultRenderValue = (document, props) => {
  return (
    <Box style={styles.container}>
      {document.map(e => {
        return (
          <SelectButtonInputValue
            styles={styles}
            item={e}
            index={0}
            text={e?.name}
            icon={!e.type.includes('image') && 'file'}
            defaultImage={e.type.includes('image') && e}
            {...props}
          />
        );
      })}
    </Box>
  );
};

const AttachmentField = ({
  value,
  setValue,
  Component = SelectButtonInput,
  renderValue = defaultRenderValue,
  triggerKey = 'onAdd',
  label = 'Attachment',
  ...props
}) => {
  const { isOpen, open, close } = useIsOpen();
  const triggerProps = { [triggerKey]: open };

  return (
    <>
      <Component
        label={label}
        value={value}
        renderValue={() => (renderValue ? renderValue(value, props) : null)}
        {...triggerProps}
        {...props}
      />
      <AttachmentModal
        onHide={close}
        title={'Add Attachment'}
        visible={isOpen}
        setValue={val => {
          try {
            setValue(val);
            close();
          } catch (e) {
            console.log(e);
          }
        }}
        navigationProps= {{
          displayDone: true,
        }}
      />
    </>
  );
};

export default AttachmentField;

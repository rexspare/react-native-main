import React, { useEffect, useState } from 'react';
import Box from 'components/Box';
import Text from 'components/Text';
import SwitchField from 'components/Forms/Fields/SwitchField';
import { styles } from './styles';
import { typography } from 'styles/typography';
import Divider from 'components/Divider';
import { colors } from 'styles/theme';

const PermissionSetInput = ({
  setValue,
  value,
  sectionKey,
  sectionLabel,
  children,
  addLabel = 'Add',
  editLabel = 'Edit',
  viewLabel = 'View',
}) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!value) return;

    if (!value?.view) {
      setValue(sectionKey, { ...value, create: false, edit: false });
    }
    if (hide) {
      setValue(sectionKey, { create: false, edit: false, view: false });
    }
  }, [value?.view, value?.create, value?.edit, hide]);

  return (
    <Box>
      <Box py={15}>
        <Text style={{ ...typography["body/medium – medium"], color: colors['gray scale/40'] }}>{sectionLabel}</Text>
        <Box style={styles.permissionsSwitchContainer}>
          {children || (
            <>
              <SwitchField
                label={`${addLabel}/${editLabel}`}
                status="primary"
                checked={value?.create}
                styles={{ container: { marginBottom: 2 } }}
                containerStyle={{ height: 25, width: 44 }}
                circleSize={21}
                circleRadius={21}
                onChange={val => setValue(sectionKey, { ...value, create: val })}
              />
              <SwitchField
                label={viewLabel}
                status="primary"
                checked={value?.view}
                styles={{ container: { marginBottom: 2 } }}
                containerStyle={{ height: 25, width: 44 }}
                circleSize={21}
                circleRadius={21}
                onChange={val => setValue(sectionKey, { ...value, view: val })}
              />
              <SwitchField
                label={'Hide'}
                status="primary"
                checked={hide}
                containerStyle={{ height: 25, width: 44 }}
                circleSize={21}
                circleRadius={21}
                onChange={val => setHide(val)} />
            </>
          )}
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default PermissionSetInput;

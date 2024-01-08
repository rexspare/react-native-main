import React from 'react';
import Box from 'components/Box';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Input from 'components/Input';
import { styles } from './styles';

const AppendedTextField = ({ onAddition, setAmenityText, amenityText }) => {
  return (
    <Box style={styles.titleAppenderContainerBackdrop}>
      <Box pb="2" px={20} style={styles.titleAppenderContainer}>
        <Input
          onChangeText={e => setAmenityText(e)}
          styles={styles.input}
          size="large"
          value={amenityText}
        />
        <Button
          onPress={onAddition}
          shadow={false}
          style={styles.titleAppenderBtn}
          icon={Icon('green-tick', 'pm')}
        />
      </Box>
    </Box>
  );
};

export default AppendedTextField;

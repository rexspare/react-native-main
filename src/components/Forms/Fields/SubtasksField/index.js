import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from '@ui-kitten/components';
import useTheme from 'hooks/useTheme';
import { compact } from 'lodash';
import { Container } from 'components/Forms/Tasks/TaskForm';
import Box from 'components/Box';
import Input from 'components/Input';
import ButtonField from '../ButtonField';

const SubtaskInput = ({
  index,
  theme,
  autofocus,
  addSubtask,
  handleDelete,
  sub,
}) => {
  return (
    <Box flexDirection="row" alignItems="center">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        width={'90%'}>
        <Input
          flex={1}
          value={sub}
          opacity={1}
          width={'90%'}
          style={{ width: '95%', minHeight: 48 }}
          autoFocus={autofocus}
          placeholder={'Add subtask'}
          onChangeText={val => addSubtask(val, index)}
        />
      </Box>
      <TouchableWithoutFeedback onPress={() => handleDelete(sub, index)}>
        <View style={styles.dotContainer}>
          <Icon
            name={'delete'}
            pack="pm"
            width={18}
            height={18}
            style={styles.deleteIcon}
          />
        </View>
      </TouchableWithoutFeedback>
    </Box>
  );
};

const SubtasksField = ({ values, setValue, autofocus }) => {
  const theme = useTheme();

  const addSubtask = (val, i) => {
    let _values = values.slice();
    _values[i] = val;
    setValue('subTasks', compact([..._values]));
  };

  const handleDelete = (s, i) =>
    setValue(
      'subTasks',
      values.filter(_s => _s !== s),
    );

  return (
    <Container height={null} pb={1} theme={theme}>
      <ButtonField
        copy={{ label: 'SUBTASKS', btn: 'ADD SUBTASKS' }}
        displayChange
        onPress={() => setValue('subTasks', [...values, ''])}
        value={
          values.length &&
          values?.map((sub, key) => (
            <SubtaskInput
              addSubtask={val => addSubtask(val, key)}
              sub={sub}
              index={key}
              theme={theme}
              values={values}
              autofocus={autofocus && key === values.length - 1}
              handleDelete={handleDelete}
            />
          ))
        }
        buttonProps={{ marginTop: 0 }}
      />
    </Container>
  );
};

const styles = {
  dotContainer: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
    padding: 1,
  },
};
export default SubtasksField;

import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import RNFetchBlob from 'rn-fetch-blob';
import useTheme from 'hooks/useTheme';
import { CREATE_TASK_FORM_COPY } from 'pages/tasks/consts/microcopy';
import Form from 'components/Form';
import SelectButtonInput from 'components/SelectButtonInput';
import Button from 'components/Button';
import Icon from 'components/Icon';
import GalleryInput from 'components/Forms/Fields/GalleryInput';
import Text from 'components/Text';
import Box from 'components/Box';
import MultiSelectBoxes from 'components/Forms/Fields/MultiSelectBoxes';
import { styles } from 'components/Forms/Tasks/TaskForm/styles';
import SwitchField from 'components/Forms/Fields/SwitchField';
import FormError from 'components/Forms/FormError';
import ManagementTeamField from 'components/Forms/Fields/ManagementTeamField';
import Input from 'components/Input';
import { defaultCopy } from 'components/Forms/Fields/DateField/styles';
import ButtonField from 'components/Forms/Fields/ButtonField';
import BuildingField from '../../Fields/BuildingField';
import UnitField from '../../Fields/UnitField';
import SubtasksField from '../../Fields/SubtasksField';
import DateField from '../../Fields/DateField';
import { t } from 'helpers/react';
import { removeFilterObjectFromArray } from 'helpers/array';
import { removeValueFromObject } from 'helpers/object';
import {
  TASK_PRIORITY,
  stringifyEnumValue,
  EVENT_REPEATS,
  TASK_STATUSES,
} from 'constants/enums';
import { usaDateFormat } from 'constants/dateFormat';
import styled from 'styled-components';
import { input_label_16 } from 'styles/reusable-classes';
import { button_styles } from 'styles/button';

const copy = CREATE_TASK_FORM_COPY;
export const Container = styled(Box).attrs(
  ({ theme, marginTop, ...style }) => ({
    marginLeft: 3,
    marginRight: 3,
    alignItems: 'center',
    mt: 2,
    borderColor: theme['grey-100'],
    paddingVertical: 0,
    minHeight: 0,
    marginTop,
    paddingTop: 0,
    overflow: 'hidden',
    paddingLeft: 0,
    alignItems: 'flex-start',
    ...style,
  }),
)``;

const TaskForm = ({
  onSubmit,
  task,
  error,
  errors,
  setValue,
  navigation,
  initialValues,
  watching,
  touched,
  formIsValid,
}) => {
  const [selectedManagementUser, setSelectedManagementUser] = useState(
    watching.assignees?.length ? watching.assignees : [],
  );
  const theme = useTheme();
  const onAddFiles = async files => {
    const newFiles = files.filter(file =>
      watching.files.every(f => f?.uri !== file?.uri),
    );
    const newData = [];
    let itemsProcessed = 0;
    newFiles.forEach(async element => {
      const base64 = await RNFetchBlob.fs.readFile(element.uri, 'base64');
      newData.push({ ...element, data: base64 });
      itemsProcessed++;
      if (itemsProcessed === newFiles.length) {
        setValue('files', [...watching.files, ...newData]);
      }
    });
  };

  useEffect(() => {
    setValue('assignees', selectedManagementUser);
  }, [selectedManagementUser]);

  return (
    <Form onSubmit={onSubmit}>
      <Container theme={theme} flex={1} style={{ marginTop: 18 }}>
        <Input
          placeholder="Title"
          defaultValue={initialValues?.title}
          status={errors.title && 'danger'}
          caption={errors.title?.message}
          disabled={task?.systemTask}
          onChangeText={val => setValue('title', val)}
          size="large"
          mb={10}
        />
        <Input
          placeholder="Description"
          multiline={true}
          icon={Icon('expandInput', 'pm')}
          defaultValue={initialValues?.content}
          status={errors.content && 'danger'}
          caption={errors.content?.message}
          onChangeText={val => setValue('content', val)}
          size="large"
        />
      </Container>
      {t(
        task?.systemTask,
        <Box mt={1} mx="3">
          <Text category="c1" appearance="hint">
            This is an automated task, some of it's properties cannot be
            changed.
          </Text>
        </Box>,
      )}
      <FormError
        error={error}
        mt={!!error ? 2 : 0}
        minHeight={!!error ? 18 : 0}
        mb={10}
        mx={3}
      />
      <Container
        theme={theme}
        //marginBottom={10}
        pb={2}
        height={null}
        alignItems={'flex-start'}>
        <BuildingField
          status={errors.building && 'danger'}
          caption={errors.building?.message}
          value={watching?.building}
          setValue={val => setValue('building', val)}
          touched={touched.indexOf('building') !== -1}
          width={'100%'}
          disabled={task?.systemTask}
          navigation={navigation}
          displayDone={false}
          displayDoneRight={true}
          {...copy.inputs.building}
        />
        <UnitField
          width={'100%'}
          status={errors.unit && 'danger'}
          caption={errors.unit?.message}
          setValue={val => setValue('unit', val)}
          value={watching.unit}
          touched={touched.indexOf('unit') !== -1}
          disabled={task?.systemTask}
          navigation={navigation}
          displayDone={false}
          displayDoneRight={true}
          buildingId={watching.building?.pk}
        />
      </Container>
      <MultiSelectBoxes
        label={'Status'}
        values={removeValueFromObject({ ...TASK_STATUSES }, 'ARCHIVED')}
        value={watching.status}
        onPress={val => setValue('status', val)}
        styles={styles.multiselect}
      />
      <MultiSelectBoxes
        label={'Task Priority'}
        values={TASK_PRIORITY}
        value={watching.priority}
        onPress={val => setValue('priority', val)}
        activeColor={'#000'}
        styles={styles.multiselect}
      />
      <Container height={null} theme={theme}>
        <DateField
          value={watching.due}
          onSelect={val => setValue('due', val)}
          editable={!task?.systemTask}
          copy={{
            ...defaultCopy,
            label: 'Due Date',
          }}
          isScrollCalendar
        />
        <SelectButtonInput
          label="Reminder"
          addLabel="Add Reminder"
          value={
            watching.reminder &&
            `${stringifyEnumValue(EVENT_REPEATS, watching.reminder || null)}${
              watching.endReminder
                ? `, Until ${format(watching.endReminder, usaDateFormat)}`
                : ''
            }`
          }
          onAdd={() =>
            navigation.navigate('SelectRepeat', {
              onSelect: ({ repeat, endRepeat }) => {
                setValue('reminder', repeat);
                setValue('endReminder', endRepeat);
              },
              repeat: watching.reminder,
              endRepeat: watching.endReminder,
            })
          }
          mb={10}
          isCalendarIcon={false}
        />
      </Container>
      <SubtasksField
        values={watching.subTasks}
        setValue={setValue}
        autofocus={!task?.id}
      />
      <Container paddingBottom={0}>
        <ManagementTeamField
          setValue={val => setSelectedManagementUser(val)}
          value={selectedManagementUser?.map(user => user)}
          triggerKey="onPress"
          removeItem={managementUser => {
            const filteredList =
              removeFilterObjectFromArray(
                selectedManagementUser,
                managementUser?.id,
                'id',
              ) || [];
            setSelectedManagementUser(filteredList);
          }}
          addLabel="CHOOSE A MEMBER"
          Component={ButtonField}
          copy={{ label: 'ASSIGN TO', btn: 'ADD ASSIGNEES' }}
        />
      </Container>
      <Container height={null}>
        <GalleryInput
          label="Files"
          width={'100%'}
          mt={0}
          labelTransform={null}
          value={watching?.files}
          onAdd={onAddFiles}
          navigation={navigation}
          copy={{ label: 'FILES', btn: 'ADD FILES' }}
          onRemove={idx =>
            setValue(
              'files',
              watching.files.filter((f, idx2) => idx2 !== idx),
            )
          }
        />
      </Container>
      <SwitchField
        label={copy.inputs.notify.label}
        checked={watching.sendNotificationOnCompletion}
        styles={{ switchContainer: { paddingRight: 36 } }}
        onChange={val => setValue('sendNotificationOnCompletion', val)}
        labelStyle={{ ...input_label_16 }}
        containerStyle={{ height: 26, width: 40 }}
        circleSize={22}
        circleRadius={20}
      />
      <Box
        paddingBottom={18}
        marginTop={28}
        style={{ alignSelf: 'center', width: '95%' }}>
        <Button
          onPress={onSubmit}
          {...(formIsValid ? button_styles.primary : button_styles.greyed)}>
          SAVE
        </Button>
      </Box>
    </Form>
  );
};

export default TaskForm;

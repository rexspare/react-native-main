import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon as UIIcon } from '@ui-kitten/components';
import useTheme from 'hooks/useTheme';
import { CREATE_TASK_FORM_COPY } from 'pages/tasks/consts/microcopy';
import SelectButtonInput from 'components/SelectButtonInput';
import Button from 'components/Button';
import Box from 'components/Box';
import Icon from 'components/Icon';
import Persona from 'components/Persona';
import Form from 'components/Form';
import Input from 'components/Input';
import DateTimeRange from 'components/Forms/Fields/DateTimeRange';
import { Container } from '../TaskForm';
import BuildingField from '../../Fields/BuildingField';
import UnitField from '../../Fields/UnitField';
import { format } from 'helpers/date';
import { t } from 'helpers/react';
import {
  EVENT_REPEATS,
  stringifyEnumValue,
  EVENT_ALERTS,
} from 'constants/enums';
import { usaDateFormat } from 'constants/dateFormat';
import { typography } from 'styles/typography';
import { button_styles } from 'styles/button';

const copy = CREATE_TASK_FORM_COPY;

const EventForm = ({
  onSubmit,
  error,
  errors,
  setValue,
  navigation,
  initialValues,
  watching,
  touched,
}) => {
  const theme = useTheme();
  return (
    <Form onSubmit={onSubmit}>
      <Container theme={theme} style={{ marginTop: 18 }}>
        <Input
          placeholder="Title"
          autoFocus
          defaultValue={initialValues?.title}
          status={errors.title && 'danger'}
          caption={errors.title?.message}
          theme={theme}
          onChangeText={val => setValue('title', val)}
          mb={'0'}
          size={'large'}
          isRequired
        />
      </Container>

      <Container>
        <Input
          placeholder="Location"
          defaultValue={initialValues?.location}
          status={errors.location && 'danger'}
          caption={errors.location?.message}
          onChangeText={val => setValue('location', val)}
          size={'large'}
        />
      </Container>
      <Container borderBottomWidth={0}>
        <Input
          placeholder="Notes"
          multiline={true}
          icon={Icon('expandInput', 'pm')}
          defaultValue={initialValues?.content}
          status={errors.content && 'danger'}
          caption={errors.content?.message}
          onChangeText={val => setValue('content', val)}
          size={'large'}
        />
      </Container>
      <DateTimeRange
        copy={{ label: watching?.date ? 'Date' : 'Set Date' }}
        px={3}
        onSelect={({ startDate, endDate, startTime, endTime, allDay }) => {
          setValue('date', startDate);
          setValue('allDay', allDay);
          t(!!!allDay, setValue('startTime', startTime));
          t(!!!allDay, setValue('endTime', endTime));
        }}
        value={
          (watching?.date || watching?.allDay) && {
            startDate: watching?.date,
            endDate: null,
            allDay: watching?.allDay,
            startTime: watching?.startTime,
            endTime: watching?.endTime,
          }
        }
        labelStyle={typography['body/medium – regular']}
        btnText={'DONE'}
        displayDone={false}
        displayDoneRight={false}
        isDateRange={true}
        showTimePicker={true}
        leftIcon={null}
      />
      <Box px={3}>
        <SelectButtonInput
          onAdd={() =>
            navigation.navigate('SelectRepeat', {
              onSelect: ({ repeat, endRepeat }) => {
                setValue('repeat', repeat);
                setValue('endRepeat', endRepeat);
              },
              repeat: watching.repeat,
              endRepeat: watching.endRepeat,
            })
          }
          label={'Repeat'}
          addLabel={'Add repeat'}
          value={
            watching.repeat &&
            `${stringifyEnumValue(EVENT_REPEATS, watching?.repeat)} ${
              watching.endRepeat
                ? `, Until ${format(watching.endRepeat, usaDateFormat, '')}`
                : ''
            } `
          }
        />
        <SelectButtonInput
          onAdd={() =>
            navigation.navigate('SelectAlert', {
              onSelect: val => setValue('alert', val),
              value: watching.alert,
            })
          }
          label={'Alert'}
          addLabel={'Add Alert'}
          value={
            watching.alert && stringifyEnumValue(EVENT_ALERTS, watching.alert)
          }
        />
        <BuildingField
          status={errors.building && 'danger'}
          caption={errors.building?.message}
          value={watching?.building}
          setValue={val => setValue('building', val)}
          touched={touched.indexOf('building') !== -1}
          width={'100%'}
          navigation={navigation}
          {...copy.inputs.building}
          displayDone={false}
          displayDoneRight={true}
          removeItem={() => setValue('building', null)}
        />
        <UnitField
          width={'100%'}
          status={errors.unit && 'danger'}
          caption={errors.unit?.message}
          setValue={val => setValue('unit', val)}
          value={watching.unit}
          touched={touched.indexOf('unit') !== -1}
          navigation={navigation}
          buildingId={watching.building?.pk}
          displayDone={false}
          displayDoneRight={true}
          removeItem={() => setValue('unit', null)}
        />
        <SelectButtonInput
          label="Assign To"
          addLabel="Choose a member"
          value={watching.assignees.length ? watching.assignees : null}
          renderValue={assignees => (
            <Box width={1}>
              {assignees.map((user, i) => (
                <Persona
                  key={user.id}
                  profile={user.picture}
                  name={user.fullName}
                  title={user.title}>
                  <TouchableOpacity
                    onPress={() =>
                      setValue(
                        'assignees',
                        assignees.filter(s => s.id !== user.id),
                      )
                    }>
                    <UIIcon
                      name="delete"
                      pack="pm"
                      width={20}
                      height={20}
                      style={{ marginRight: 8 }}
                    />
                  </TouchableOpacity>
                </Persona>
              ))}
            </Box>
          )}
          onAdd={() =>
            navigation.navigate('SelectAssignees', {
              assignees: watching?.assignees,
              onSelect: assignees => setValue('assignees', assignees),
            })
          }
        />
      </Box>
      <Box px={3} pt="3">
        <Button onPress={onSubmit} {...button_styles.primary}>
          SAVE
        </Button>
      </Box>
    </Form>
  );
};

export default EventForm;

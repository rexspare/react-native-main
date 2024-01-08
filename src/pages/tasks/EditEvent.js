import React, { useRef } from 'react';
import Box from 'components/Box';
import TaskScreenLayout from 'components/TaskScreenLayout';
import useForm from 'react-hook-form';
import AddTaskCategoryDialog from 'components/AddTaskCategoryDialog';
import { TASK_STATUSES } from 'constants/enums';
import { useQuery, useMutation } from 'urql';
import viewEventQuery from 'queries/tasks/viewEvent.gql';
import upsertEventMutation from 'queries/tasks/upsertEvent.gql';  
import { EVENT_FORM_SCHEMA } from './consts/schema';
import { TASK_STATUS_COLORS } from './consts';
import { useRegisterFields } from 'hooks/useRegisterFields';
import EventForm from 'components/Forms/Tasks/EventForm';
import { validateRequiredFields } from 'helpers/validators';
import { useFormError } from 'hooks/useFormError';

const schema = EVENT_FORM_SCHEMA
const requiredFields = ["title", "date"];
const EditEvent = ({ navigation, route }) => {
  const eventId = route?.params?.id;
  const isNew = !eventId;
  const [addCategoryModal, setAddCategoryModal] = React.useState(false);
  const scrollRef = useRef();
  const {error, setError} = useFormError({scrollView: scrollRef?.current?.getNode()})
  const initialValuesSet = React.useRef(false);

  const [res, executeQuery] = useQuery({
    query: viewEventQuery,
    variables: {
      id: eventId,
      pause: !eventId,
    },
    requestPolicy: 'network-only',
  });
  const [editRes, executeMutation] = useMutation(upsertEventMutation);

  const initialValues = React.useMemo(() => {
    const data = res.data?.event;
    if (data) {
      initialValuesSet.current = false;
      const date = new Date(data.date);
      let startTime = null;
      let endTime = null;
      if (!data.allDay) {
        startTime = new Date(`1970-01-01T${data.startTime}.000Z`);
        startTime.setFullYear(date.getFullYear());
        startTime.setMonth(date.getMonth());
        startTime.setDate(date.getDate());
        startTime.setMinutes(startTime.getMinutes() + date.getTimezoneOffset());
        endTime = new Date(`1970-01-01T${data.endTime}.000Z`);
        endTime.setFullYear(date.getFullYear());
        endTime.setMonth(date.getMonth());
        endTime.setDate(date.getDate());
        endTime.setMinutes(endTime.getMinutes() + date.getTimezoneOffset());
      }
      return {
        ...data,
        createdAt: new Date(data.createdAt),
        date: date,
        startTime,
        endTime,
        endRepeat: data.endRepeat && new Date(data.endRepeat),
        assignees: (data?.assignees?.edges ?? []).map(e => e.node),
      };
    }
    return {
      assignees: [],
    };
  }, [res.data]);

  const {
    register,
    setValue,
    handleSubmit,
    errors,
    unregister,
    watch,
    getValues,
    formState: { isSubmitting, touched },
  } = useForm({
    defaultValues: initialValues || {},
    validationSchema: schema,
  });

  React.useEffect(() => {
    const values = getValues();
    if (initialValues && !initialValuesSet.current) {
      Object.keys(initialValues).forEach(k => setValue(k, initialValues[k]));
      initialValuesSet.current = true;
    }
  }, [getValues, initialValues, setValue, touched]);

  useRegisterFields(Object.keys(schema.fields), register, unregister)

  const watching = watch([
    'building',
    'unit',
    'date',
    'startTime',
    'endTime',
    'repeat',
    'endRepeat',
    'alert',
    'assignees',
    'allDay',
  ]);

  const headerProps = React.useMemo(
    () => ({
      title: `${isNew ? 'New' : 'Edit'} Appointment`,
      actions: [
        {
          left: true,
          icon: 'arrow-ios-back',
          onPress: () => navigation.goBack(),
        },
      ],
    }),
    [isNew, navigation],
  );
  const onSubmit = React.useCallback(
    form => {
      const isFilled = validateRequiredFields(form, requiredFields)
      if (!isFilled) return setError("Please fill in all required fields.")
      setError(null);
      let startTime = null;
      let endTime = null;
      if (!form.allDay && form.startTime && form.endTime) {
        const start = new Date(form.date);
        start.setHours(form.startTime.getHours());
        start.setMinutes(
          form.startTime.getMinutes() - form.date.getTimezoneOffset(),
        );
        start.setSeconds(0);
        startTime = start
          .toISOString()
          .split('T')[1]
          .slice(0, 8);
        start.setHours(form.endTime.getHours());
        start.setMinutes(
          form.endTime.getMinutes() - form.date.getTimezoneOffset(),
        );
        endTime = start
          .toISOString()
          .split('T')[1]
          .slice(0, 8);
      };

      const event = {
        ...form,
        allDay: !startTime && !endTime ? true : form?.allDay,
        location: form?.location || "",
        assignees: form.assignees?.map(u => u.id) ?? [],
        date: form.date.toISOString().split('T')[0],
        startTime,
        endTime,
        unit: form.unit?.id,
        building: form.building?.id,
      };

      const submit = async () => {
        const upsertRes = await executeMutation({
          eventData: event,
          id: eventId,
        });
        let id;
        if ((id = upsertRes.data?.upsertEvent?.event?.id)) {
          route?.params?.onEdit?.();
          navigation.goBack();
        } else {
          setError(
            (upsertRes.error.message || '').replace(
              /\[(Network Error|GraphQL)\]\s*/g,
              '',
            ),
          );
        }
      };
      submit();
    },
    [eventId, executeMutation, navigation, route, setError],
  );

  const submitting =
    editRes.fetching || isSubmitting || (!isNew && res.fetching);

  return (
    <TaskScreenLayout 
      headerProps={headerProps} 
      isLoading={submitting} 
      status={TASK_STATUS_COLORS[res.data?.task?.status ?? TASK_STATUSES.TO_DO]}
      scrollRef={scrollRef}
    >
      <Box px="2" position="relative">
        <EventForm
          onSubmit={handleSubmit(onSubmit)}
          error={error}
          navigation={navigation}
          errors={errors}
          initialValues={initialValues}
          watching={watching}
          touched={touched}
          setValue={setValue}
        />
      </Box>
      <AddTaskCategoryDialog visible={addCategoryModal} onHide={() => setAddCategoryModal(false)} onAdd={category => setValue('category', category)}/>
    </TaskScreenLayout>
  );
};

export default EditEvent;

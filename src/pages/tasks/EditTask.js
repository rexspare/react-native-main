import React, { useCallback, useEffect, useRef } from 'react';
import useForm from 'react-hook-form';
import { useQuery, useMutation } from 'urql';
import { useSafeSubmit } from 'hooks/useSafeSubmit';
import { useRegisterFields } from 'hooks/useRegisterFields';
import viewTaskQuery from 'queries/tasks/viewTask.gql';
import upsertTaskMutation from 'queries/tasks/upsertTask.gql';
import Box from 'components/Box';
import TaskScreenLayout from 'components/TaskScreenLayout';
import AddTaskCategoryDialog from 'components/AddTaskCategoryDialog';
import TaskForm from 'components/Forms/Tasks/TaskForm';
import {
  taskFormHelpers as helpers,
  taskFormRequiredFields,
} from 'components/Forms/Tasks/helpers';
import { TASK_FORM_SCHEMA } from './consts/schema';
import { statusThemeMap } from './consts';
import { validateRequiredFields } from 'helpers/validators';
import { TASK_STATUSES } from 'constants/enums';

const schema = TASK_FORM_SCHEMA;
const { setInitialValues, parseFormData, isSubmitSuccessful } = helpers;

const EditTask = ({ route, navigation }) => {
  const taskId = route?.params?.id;
  const { goBack = () => navigation.goBack() } = route?.params ?? {}
  const isNew = !taskId;
  const [addCategoryModal, setAddCategoryModal] = React.useState(false);
  const initialValuesSet = React.useRef(false);

  const [res] = useQuery({
    query: viewTaskQuery,
    variables: { id: taskId, pause: isNew },
    requestPolicy: 'network-only',
  });
  const [editRes, executeMutation] = useMutation(upsertTaskMutation);

  const initialValues = React.useMemo(
    () => setInitialValues(
      route?.params?.initialValues ?? res.data?.task,
      route?.params?.category,
      initialValuesSet,
    ),
    [res.data, route.params],
  );
  const task = res.data?.task;
  const scrollRef = useRef();

  const {
    register,
    setValue,
    handleSubmit: handleSubmit,
    errors,
    unregister,
    watch,
    getValues,
    formState: { isSubmitting, touched },
  } = useForm({
    defaultValues: initialValues || {},
    validationSchema: schema,
  });

  useEffect(() => {
    if (initialValues && !initialValuesSet?.current) {
      Object.keys(initialValues).forEach(k => setValue(k, initialValues[k]));
      initialValuesSet.current = true;
    }
  }, [getValues, initialValues, setValue, touched]);

  useRegisterFields(Object.keys(schema.fields), register, unregister);

  const watching = watch([
    'building',
    'unit',
    'title',
    'subTasks',
    'priority',
    'due',
    'files',
    'assignees',
    'taskType',
    'reminder',
    'endReminder',
    'status',
    'sendNotificationOnCompletion',
  ]);

  const headerProps = React.useMemo(
    () => ({
      title: `${isNew ? 'New' : 'Edit'} Task`,
      actions: [
        {
          left: true,
          icon: 'arrow-ios-back',
          onPress: goBack,
        },
      ],
    }),
    [isNew, navigation],
  );

  const formatFields = form => ({ taskData: parseFormData(form), id: taskId });

  const onSuccessfullSubmit = res => {
    route?.params?.onUpdate?.();
    navigation.goBack();
    if (isNew) {
      navigation.navigate('ViewTask', { id: res?.data?.upsertTask?.task?.id });
    }
  };

  const isFilled = validateRequiredFields(watching, taskFormRequiredFields);

  const validateSubmit = useCallback(() => {
    if (!isFilled) {
      setError('Please Fill all required fields');
      return { isValid: false };
    }
  }, [watching, setError]);

  const { safeSubmit: onSubmit, error, setError } = useSafeSubmit(
    executeMutation,
    formatFields,
    isSubmitSuccessful,
    onSuccessfullSubmit,
    [executeMutation, isNew, navigation, route, taskId, validateSubmit],
    validateSubmit,
    scrollRef?.current?.getNode(),
  );

  const submitting =
    editRes.fetching || isSubmitting || (!isNew && res.fetching);

  return (
    <TaskScreenLayout
      headerProps={headerProps}
      isLoading={submitting}
      scrollRef={scrollRef}
      status={statusThemeMap?.[task?.status || TASK_STATUSES.DONE]}>
      <Box px="2" position="relative">
        <TaskForm
          task={task}
          onSubmit={handleSubmit(onSubmit)}
          error={error}
          errors={errors}
          setValue={setValue}
          watching={watching}
          navigation={navigation}
          initialValues={initialValues}
          touched={touched}
          formIsValid={isFilled}
        />
      </Box>
      <AddTaskCategoryDialog
        visible={addCategoryModal}
        onHide={() => setAddCategoryModal(false)}
        onAdd={category => setValue('category', category)}
      />
    </TaskScreenLayout>
  );
};

export default EditTask;

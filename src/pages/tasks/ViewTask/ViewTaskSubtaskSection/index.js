import React, { useCallback } from 'react';
import checkSubTaskMutation from 'queries/tasks/checkSubTask.gql';
import deleteSubtaskMutation from 'queries/tasks/deleteSubtask.gql';
import { useMutation } from 'urql';
import { buttons } from 'constants/buttons';
import TaskItem from 'components/TaskItem';
import SuccessModal from 'components/SuccessModal';
import ViewTaskSection from '../ViewTaskSection';
import { useIsOpen } from 'hooks/useIsOpen';
import { useLoader } from 'hooks/useLoader';
import { colors } from 'styles/theme';

const copy = {
  successMsg: 'Subtask successfully Deleted',
};
const styles = {
  container: { mt: 10 },
  content: { marginTop: 0, px: 0, ml: -20 },
  label: { color: colors['gray scale/40'] },
};
const ViewTaskSubtaskSection = ({
  subtasks,
  theme,
  themeColor,
  taskId,
  onRefresh,
}) => {
  const { isOpen, close, open } = useIsOpen();
  const [_, checkSubTask] = useMutation(checkSubTaskMutation);
  const [__, deleteSubtask] = useMutation(deleteSubtaskMutation);

  const { loader, startLoading, stopLoading } = useLoader();

  const handleDeleteSubtask = useCallback(async id => {
    const params = { input: { id } };
    startLoading();
    return new Promise(async (resolve, rej) => {
      const res = await deleteSubtask(params);
      const success = res?.data?.deleteSubtask?.success;

      if (res.error || !success) {
        stopLoading();
        return rej(res.error || 'failed to delete the subtask');
      }
      stopLoading();
      onRefresh();
      open();
      return resolve(success);
    });
  });

  const onCheck = React.useCallback(
    (id, checked) => {
      return new Promise(async (resolve, reject) => {
        const setRes = await checkSubTask({
          taskId,
          subTaskId: id,
          checked,
        });
        if (setRes.error || !setRes.data?.checkSubTask?.success) {
          return reject(setRes.error || 'Failed to set task status');
        }
        return resolve(checked);
      });
    },
    [checkSubTask, taskId],
  );

  if (!subtasks?.length) return null;
  return (
    <ViewTaskSection
      label={'Subtasks'}
      display={subtasks?.length}
      theme={theme}
      styles={styles}>
      {subtasks?.map(sub => (
        <TaskItem
          style={{
            borderWidth: 1,
            borderColor: colors['gray scale/10'],
            borderRadius: 12,
          }}
          title={sub.text}
          value={sub.done}
          key={sub.id}
          id={sub.id}
          rightButton={{
            ...buttons['archive'],
            text: 'Delete',
            onPress: handleDeleteSubtask,
          }}
          themeColor={themeColor}
          onCheck={() => onCheck(sub.id, true)}
          onUnCheck={() => onCheck(sub.id, false)}
          subtitle
          animateCheck
        />
      ))}
      <SuccessModal msg={copy.successMsg} onHide={close} visible={isOpen} />
      {loader}
    </ViewTaskSection>
  );
};

export default ViewTaskSubtaskSection;

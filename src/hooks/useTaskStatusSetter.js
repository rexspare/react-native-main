import React, { useCallback, useState } from 'react';
import { TASK_STATUSES } from 'constants/enums';
import { useMutation } from 'urql';
import setTaskStatusMutation from 'queries/tasks/setTaskStatus.gql';
import SuccessModal from 'components/SuccessModal';
import { t } from 'helpers/react';
import { noop } from 'lodash-es';
import { useLoader } from './useLoader';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

export const STATUS_TO_SUCCESS_STRING = {
  [TASK_STATUSES.IN_PROGRESS]: "Task now in Progress",
  [TASK_STATUSES.DONE]: `Task successfully marked as "done"`,
  [TASK_STATUSES.ARCHIVED]: `Task successfully moved to "archive"`,
  [TASK_STATUSES.TO_DO]: `Task successfully moved to "to-do"`,
}

export const useSetTaskStatus = (onSuccess) => {
  const [res, mutation] = useMutation(setTaskStatusMutation);
  const setTaskStatus = useCallback((id, status) => {
    return new Promise(async (resolve, reject) => {
      const setRes = await mutation({ id, status });
      if (setRes.error || !setRes.data?.setTaskStatus?.success) {
        return reject(setRes.error || 'Failed to set task status');
      } else {
        onSuccess(status, id)
      }
      return resolve(status);
    })
  }, [mutation])
  return { setTaskStatus, res }
};

const _modalProps = {
  style: { backgroundColor: "#fff" },
  titleProps: { style: { fontSize: 18, fontWeight: "400", marginTop: 7, textTransform: "uppercase" } },
  styles: {
    content: { marginHorizontal: 10, marginTop: 5, paddingTop: 0, paddingBottom: 10 },
    title: { ...typography['body/large – Bold'], textTransform: "uppercase" },
    contentText: { fontSize: 14, fontWeight: "400" }
  },
  buttonsContainerStyle: { width: "100%" },
  closeIcon: false,
  padding: 0,
};
const statusBtn = {
  hide: true,
}

export default function useTaskStatusSetter(currentStatus, onSuccess = noop, options = {}) {
  const { setTaskStatus, res: setStatusRes } = useSetTaskStatus((status, id) => handleSuccess(status, id))
  const [statusModal, setStatusModal] = useState(null);
  const [successString, setSuccessString] = useState();
  const { loader, startLoading, stopLoading } = useLoader()


  const showStatusSetModal = React.useCallback(
    ({ status, id }) => {
      let title, content;
      const same = currentStatus === status;
      switch (status) {
        case TASK_STATUSES.ARCHIVED:
          title = "Are you sure you would like to archive this task?"
          content = 'This task will be moved to "Archived" and will be automatically deleted after 7 days'
          break;
        case TASK_STATUSES.DONE:
          title = "Are you sure you would like to move this task to done?"
          content = 'This task will be moved to "Done" and will automatically archived after 7 days'
          break;
        case TASK_STATUSES.IN_PROGRESS:
          title = "Are you sure you would like to move this task to in progress?";
          break;
        case TASK_STATUSES.TO_DO:
        default:
          title = 'Task Restarted!';
          content = same
            ? 'This task is now re-marked as unstarted.'
            : 'This task is now marked as unstarted and has been moved to the To Do section.';
      }
      setStatusModal({
        title,
        content,
        buttons: [
          {
            children: 'Yes',
            ...statusBtn,
            onPress: async () => {
              startLoading()
              const res = await setTaskStatus(id, status);
              setStatusModal(null)
              stopLoading()
            },
            style: { ...typography["buttons/large"], marginTop: 20, color: "white", overflow: 'hidden', borderRadius: 10, backgroundColor: colors["primary/50 – brand"], paddingVertical: 10, textAlign: "center", textTransform: "uppercase" },
          },
          {
            children: options?.backTxt || 'No, Back To Task List',
            ...statusBtn,
            onPress: async () => {
              startLoading()
              setStatusModal(null)
              stopLoading()
            },
            style: { ...typography["buttons/large"], borderWidth: 2, borderColor: colors["primary/50 – brand"], borderRadius: 10, color: colors["primary/50 – brand"], marginTop: 10, paddingVertical: 10, textAlign: "center", textTransform: "uppercase" }
          },
        ],
      });
    },
    [currentStatus],
  );

  const onSetStatus = React.useCallback((id, status, options = { displayModal: true }) => options.displayModal ? showStatusSetModal({ status, id }) : setTaskStatus(id, status), [setTaskStatus, showStatusSetModal]);

  const modalProps = React.useMemo(
    () => ({
      visible: statusModal !== null,
      onHide: () => setStatusModal(null),
      ..._modalProps,
      ...statusModal,
    }),
    [statusModal],
  );

  const handleSuccess = (status, id) => {
    setSuccessString(STATUS_TO_SUCCESS_STRING[status])
    onSuccess(id, status)
  }

  return React.useMemo(
    () => ({
      modalProps,
      onSetStatus,
      setStatusResult: setStatusRes,
      loader,
      successModal: t(!!successString, <SuccessModal msg={successString} onHide={() => setSuccessString("")} />)
    }),
    [modalProps, onSetStatus, setStatusRes, successString],
  );
}

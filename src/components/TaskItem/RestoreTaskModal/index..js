import Dialog from "components/Dialog";
import SuccessModal from "components/SuccessModal";
import { TASK_STATUSES } from "constants/enums";
import { STATUS_TO_SUCCESS_STRING, useSetTaskStatus } from "hooks/useTaskStatusSetter";
import React, { useMemo, useState } from "react";

const styles = {
    title: {
        marginHorizontal: 18, marginTop: 10
    },
    btn: {
        marginHorizontal: 18, borderRadius: 36, marginTop: 7
    },
    backBtn: {
        backgroundColor: "#fff", borderWidth: 2,  marginBottom: 18
    }
}
const title = 'Where would you like to restore this task to';
const _buttons = [{
    children: 'to do list',
    gradient: true,
    shape: 'circle',
    hide: true,
    style: styles.btn,
    status: TASK_STATUSES.TO_DO,
    containerStyle: { padding: 0, backgroundColor: "transparent" }
},
{
    children: 'In progress List',
    shape: 'circle',
    gradient: true,
    hide: true,
    style: styles.btn,
    status: TASK_STATUSES.IN_PROGRESS
},
{
    children: 'Done List',
    gradient: true,
    shape: 'circle',
    gradient: true,
    hide: true,
    style: styles.btn,
    status: TASK_STATUSES.DONE

},
{
    children: 'back',
    shape: 'circle',
    hide: true,
    backgroundColor: "#fff",
    textStyle: { color: "#36796F" },
    style: [styles.btn, styles.backBtn],
},
];

const RestoreTaskModal = ({ taskId, ...props }) => {
    const [successString, setSuccessString] = useState(null)
    const { setTaskStatus, res } = useSetTaskStatus((status) => setSuccessString(STATUS_TO_SUCCESS_STRING[status]))
    const buttons = useMemo(() => _buttons.map(btn => ({ ...btn, onPress: () => setTaskStatus(taskId, btn.status) })), [taskId])
    return (
        <>
            <Dialog title={title} titleProps={{ style: styles.title }} closeIcon={false} buttons={buttons} {...props} />
            <SuccessModal visible={!!successString} onHide={() => setSuccessString(null)} msg={successString} />
        </>
    )
}


export default RestoreTaskModal;
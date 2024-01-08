import React from "react";
import Dialog from "components/Dialog";

const DeleteModal = ({ title = "Are you sure you want to delete this?", onDelete, actions: _actions, ...props }) => {
    const actions = _actions || getButtons(onDelete)
    return (
        <Dialog buttons={actions} title={title} {...props} closeIcon={false} />
    )
}

const getButtons = (onDelete) => ([
    {
        children: "Yes, Delete", hide: true, onPress: onDelete, shape: "circle", style: { marginHorizontal: 18, marginTop: 15 }
    },
    {
        children: "No, cancel", hide: true, shape: "circle", style: { backgroundColor: "#fff", borderWidth: 2, color: "red", marginHorizontal: 18, marginBottom: 18, marginTop: 15 }, textStyle: {color:  "#26A799"}
    }
])




export default DeleteModal
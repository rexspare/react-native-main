import React, { useCallback, useEffect, useState } from "react";
import { useMutation } from "urql";
import { useIsOpen } from "./useIsOpen";
import updateApplicationStatus from 'queries/tenants/application/UpdateApplicationStatus.gql';
import { chain } from "helpers/func";
import ApplicationApprovalModal, { SetApplicationStatusModal } from "components/ApplicationProcess/ApplicationApprovalModal";
import { APPROVE, DENY } from "constants";
import Toast from 'react-native-toast-message';


export const useSetApproveTenantApplicationApproval = ({ onSuccess }) => {
    const [applicationId, setApplicationId] = useState()
    const [status, setStatus] = useState();
    const { isOpen: displayConfirm, open: openConfirm, close: closeConfirm } = useIsOpen();
    const { isOpen: displayApproveModal, open: openApproveModal, close: closeApproveModal } = useIsOpen();

    useEffect(() => {
        if (!!status && applicationId) return openConfirm()
        else return closeConfirm()
    }, [status, applicationId])

    const handleSetApplicationId = (id) => {
        if (!id) return Toast.show({ type: "error", text1: "Couldn't find application for tenant" })
        openApproveModal()
        setApplicationId(id)
    }

    const resetState = chain([
        () => setApplicationId(null),
        () => setStatus(null),
    ]);

    const [_, updateApplicationStatusMutation] = useMutation(updateApplicationStatus);

    const handleSuccess = useCallback(
        chain([
            (status) => onSuccess?.(status),
            (status, text) => Toast.show({ type: "success", text1: text || (status === APPROVE ? 'Tenant approved' : 'Tenant denied') }),
            () => resetState()
        ]), [onSuccess, resetState]
    )
    const handleError = (res) => {
        console.log('Error', res);
        resetState()
        return Toast.show({ type: "error", text1: "Error: Failed to update tenant's application status" })
    }

    const setApplicationStatus = useCallback(async () => {
        const isApproved = status === APPROVE;
        const res = await updateApplicationStatusMutation({ isApproved, applicationId, isDenied: !isApproved });
        if (!res?.data?.updateTenantApplicationStatus?.success) return handleError(res)
        handleSuccess(status)
    }, [handleSuccess, applicationId, status, resetState]);

    const restoreDeniedTenant = async (applicationId) => {
        const res = await updateApplicationStatusMutation({ isApproved: false, applicationId, isDenied: false });
        if (!res?.data?.updateTenantApplicationStatus?.success) return handleError(res)
        handleSuccess(null, "Tenant restored")
    }

    return {
        approve: () => setStatus(APPROVE),
        deny: () => setStatus(DENY),
        setApplicationId: handleSetApplicationId,
        confirmModal: <ApplicationApprovalModal
            visible={displayConfirm}
            onHide={() => setStatus(null)}
            onAction={() => setApplicationStatus()}
            status={status}
        />,
        setStatusModal: <SetApplicationStatusModal
            visible={!!displayApproveModal}
            onHide={() => closeApproveModal()}
            setStatus={setStatus}
        />,
        restoreDeniedTenant
    }
}


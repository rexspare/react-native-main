import React from 'react';
import FullPageBottomModal from 'components/FullPageBottomModal';
import AddTenant from 'pages/tenants/AddTenant';
import Toast from 'react-native-toast-message';

const AddTenantModal = ({ isOpen, close, setValue }) => {
    const onSuccess = (data) => {
        Toast.show({ type: "success", text1: "Tenant has been created." }),
            setValue(data);
        close();
    }
    return (
        <FullPageBottomModal
            displayDone={false}
            visible={isOpen}
            onHide={close}
            title={"Add New Tenant"}
        >
            <AddTenant onSuccess={onSuccess} />
        </FullPageBottomModal>
    )
};

export default AddTenantModal; 
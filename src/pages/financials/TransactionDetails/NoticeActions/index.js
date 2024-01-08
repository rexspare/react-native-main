import Box from "components/Box";
import Button from "components/Button";
import { useIsOpen } from "hooks/useIsOpen";
import React from "react";
import { styles } from "./styles";
import ServiceProviderField from "components/Forms/Fields/ServiceProviderField";
import SendNoticeModal from "./SendNoticeModal";
import ContactCard from "components/ContactCard";
import { noop } from "lodash";
import { chain } from "helpers/func";
import { t } from "helpers/react";

const LawyerBtn = () => {
    return (
        <ServiceProviderField
            Component={Button}
            textStyle={styles.lawyerBtnText}
            setValue={noop}
            style={styles.contactLawyerBtn}
            triggerKey="onPress"
            renderItem={ContactCard}
            serviceName={'Legal'}
        >
            Contact A Lawyer
        </ServiceProviderField>
    )

};

const NoticeActions = ({ onReload =noop, leaseId,notice }) => {
    const { isOpen: displayNoticeModal, close: closeNoticeModal, open: openNoticeModal } = useIsOpen()
    const handleClose = chain([closeNoticeModal, onReload])

    return (
        <>
            <Box flex={1}>
                {t( notice, <LawyerBtn  />)}
                <Button style={styles.openModalBtn} onPress={openNoticeModal}
                    textStyle={{textTransform: 'uppercase', fontSize: 16, fontWeight: '500'}}
                >
                    {notice ? 'Send Another Notice' : 'Send Notice'}
                </Button>
            </Box>
            <SendNoticeModal
                visible={displayNoticeModal}
                onHide={handleClose}
                leaseId={leaseId}
            />
        </>
    )
};

export default NoticeActions;
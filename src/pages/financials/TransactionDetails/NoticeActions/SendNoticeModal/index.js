import React from "react";

import BottomHalfModal from "components/BottomHalfModal";
import Box from "components/Box";
import Button from "components/Button";
import { typography } from "styles/typography";
import { styles } from "./styles";
import TabListSelect from "components/TabListSelect/TabListSelect";
import sendNoticeGql from "queries/properties/Lease/SendLeaseNotice.gql";
import { useMutation } from "urql";
import { noop } from "lodash";

const microcopy = { title: "Notice", doneText: "" };
const tabs = [{ text: "With Late Fee", value: '1' }, { text: "Without Late Fee", value: "2" }];

const SendNoticeModal = ({ onHide, leaseId, onReload=noop,  ...props }) => {
    const [_, sendNoticeMutation] = useMutation(sendNoticeGql);
    
    const sendNotice = async () => {
        try {
            const res = await sendNoticeMutation({ id: leaseId });
            await onReload();
        } catch (e) {
            console.log(e)
        }
        finally {
            onHide()
        }
    }
    return (
        <BottomHalfModal
            closeIcon={false}
            onHide={onHide}
            {...microcopy}
            {...props}
        >
            <Box>
                <TabListSelect
                    values={tabs}
                    isRadio={true}
                    buttonWidth={'100%'}
                    flexDirection={'column'}
                />
            </Box>
            <Box style={styles.btnContainer}>
                <Button
                    shadow={false}
                    style={styles.sendBtn}
                    textStyle={{ color: "#fff", ...typography["buttons/large"], textTransform: 'uppercase' }}
                    onPress={()=> sendNotice()}
                >
                    Send Notice
                </Button>
            </Box>
        </BottomHalfModal>
    )
}
export default SendNoticeModal
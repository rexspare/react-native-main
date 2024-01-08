import React from "react";
import Box from "components/Box";
import AttachmentField from "components/Forms/Fields/AttachementField";
import SelectButtonInputValue from "components/SelectButtonInputValue/SelectButtonInputValue";
import { styles } from './styles'
import ButtonField from "components/Forms/Fields/ButtonField";
import { deleteBtnProps } from 'components/Button/const';
import { t } from "helpers/react";
import Text from "components/Text";
import Button from "components/Button";
import DocumentItem from 'components/DocumentItem';

const defaultCopy = { btn: "ADD FILE"};
const DocumentsTab = ({ setValue, watching, navigation, copy = defaultCopy }) => {

    const handleDeleteAttachment = (index) => {
        const value = watching?.attachments.slice()
        if (value.length == 1) {
            return setValue('attachments', null)
        }
        delete value[index]
        setValue('attachments', value)
    }

    return (
        <Box flex={1} px={15} py={15} justifyContent={"space-between"}>
            <Box flex={0.9}>
                <Box minHeight={10} style={styles.valueContainer}>
                    {
                        watching?.attachments?.map((item, index) => {
                            return (
                                <DocumentItem
                                    name={item.name}
                                    type={2}
                                    showMoreBtn={false}
                                    addBorder={false}
                                    my={1}
                                >
                                    <Box as={Button}
                                        flex={1}
                                        {...deleteBtnProps}
                                        style={styles.removeBtn}
                                        onPress={() => handleDeleteAttachment(index)}
                                    >
                                    </Box>
                                </DocumentItem>
                            )
                        })
                    }
                    {t(!watching?.attachments, <Text style={styles.label}>NO FILES</Text>)}
                </Box>
            </Box>
            <AttachmentField
                Component={ButtonField}
                triggerKey={"onPress"}
                setValue={(val) => setValue('attachments', [...(watching?.attachments) || [], val?.[0]])}
                renderValue={null}
                label={null}
                {...copy}
            />
            <Button textStyle={styles.saveButtonText} style={{...styles.saveButton, marginTop: 0}} children={"NEXT"} onPress={() => navigation.navigate("PermissionsTab")} />
        </Box>
    )
}

export default DocumentsTab
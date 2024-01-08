import React from "react";
import Box from "components/Box";
import PermissionSetInput from "components/PermissionSetInput";
import Button from "components/Button";
import { styles } from '../styles'
import { ScrollView } from "react-native";
import SwitchField from "components/Forms/Fields/SwitchField";

const PermissionsTab = ({ onSubmit, watching, setValue, }) => {
    return (
        <Box flex={1} px={15} >
            <ScrollView >
                <PermissionSetInput
                    setValue={setValue}
                    value={watching?.propertiesPermissions}
                    sectionKey={'propertiesPermissions'}
                    sectionLabel={'PROPERTIES'}
                />
                <PermissionSetInput
                    setValue={setValue}
                    value={watching?.tenantsPermissions}
                    sectionKey={'tenantsPermissions'}
                    sectionLabel={'TENANTS'}
                />
                <PermissionSetInput
                    setValue={setValue}
                    value={watching?.tasksPermissions}
                    sectionKey={'tasksPermissions'}
                    sectionLabel={'TASKS'}
                />
                <PermissionSetInput
                    setValue={setValue}
                    value={watching?.financialsPermissions}
                    sectionKey={'financialsPermissions'}
                    sectionLabel={'FINANCIALS'}
                />
                <PermissionSetInput
                    setValue={setValue}
                    value={watching?.profilePermissions}
                    sectionKey={'profilePermissions'}
                    sectionLabel={'PROFILE'}
                    addLabel={"Can add new team members"}
                    editLabel={"Can edit their own profile information"}
                    viewLabel={"Can view other team member's personal information"}
                />
                
                <PermissionSetInput
                    setValue={setValue}
                    value={watching?.filesPermissions}
                    sectionKey={'filesPermissions'}
                    sectionLabel={'FILES'}
                    editLabel={"Can utilise file actions"}
                />
                <PermissionSetInput sectionLabel={'Messaging'}>
                    <SwitchField
                        label={'TENANTS'}
                        status="primary"
                        checked={watching?.messagesPermissions?.tenants}
                        styles={{ container: { marginBottom: 2 } }}
                        containerStyle={{ height: 25, width: 44 }}
                        circleSize={21}
                        circleRadius={21}
                        onChange={val => setValue("messagesPermissions", { ...watching?.messagesPermissions, tenants: val })}
                    />
                    <SwitchField
                        label={'Team members'}
                        status="primary"
                        checked={watching?.messagesPermissions?.teamMembers}
                        styles={{ container: { marginBottom: 2 } }}
                        containerStyle={{ height: 25, width: 44 }}
                        circleSize={21}
                        circleRadius={21}
                        onChange={val => setValue("messagesPermissions", { ...watching?.messagesPermissions, teamMembers: val })}
                    />
                </PermissionSetInput>
            </ScrollView>
            <Box maxHeight={150} >
                <Button textStyle={styles.saveButtonText} style={styles.saveButton} onPress={onSubmit}>
                    SEND INVITE TO A NEW MEMBER
                </Button>
            </Box>
        </Box>
    )
}

export default PermissionsTab
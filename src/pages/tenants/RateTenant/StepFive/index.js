import React from 'react';
import { ScrollView } from 'react-native';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Text from 'components/Text';
import SelectInput from 'components/SelectInput';
import { styles } from "../styles";
import useTheme from 'hooks/useTheme';
import { TENANT_OPTION, formatEnumToSelectOptions, stringifyEnumValue } from 'constants/enums'

const StepFive = ({ errors, setValue, watching }) => {
    const theme = useTheme();
    const labelStyle = { fontWeight: '600', fontSize: 16, fontFamily: theme['text-subtitle-3-font-family'], lineHeight: 24 };
    const selectInputProps = { mb: 15, placeholder: "Select", labelStyle }
    return (
        <Box as={ScrollView} flex={1} px="2" mx="3">
            <Text style={styles.headingText} mt="3" category="h3" >{`5. Complaints & Violations`}</Text>
            <Divider mt={10} mb={30} />
            <SelectInput
                label="Does the tenant file formal complaints with city agencies before notifying management?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.filesFormalComplaints && 'danger'}
                caption={
                    errors.filesFormalComplaints && errors.filesFormalComplaints.message
                }
                isRequired
                onSelect={val => setValue('filesFormalComplaints', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.filesFormalComplaints)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant have a history of filing complaints?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.historyOfFiling && 'danger'}
                caption={
                    errors.historyOfFiling && errors.historyOfFiling.message
                }
                isRequired
                onSelect={val => setValue('historyOfFiling', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.historyOfFiling)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant file legitimate complaints?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.areComplaintsLegitimate && 'danger'}
                caption={
                    errors.areComplaintsLegitimate && errors.areComplaintsLegitimate.message
                }
                isRequired
                onSelect={val => setValue('areComplaintsLegitimate', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.areComplaintsLegitimate)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant provide access to make the necessary repairs?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.complainProvidesAccess && 'danger'}
                caption={
                    errors.complainProvidesAccess && errors.complainProvidesAccess.message
                }
                isRequired
                onSelect={val => setValue('complainProvidesAccess', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.complainProvidesAccess)}
                {...selectInputProps}
            />
        </Box>
    )
};

export default StepFive;
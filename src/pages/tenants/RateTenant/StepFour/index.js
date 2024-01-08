import React from 'react';
import { ScrollView } from 'react-native';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Text from 'components/Text';
import SelectInput from 'components/SelectInput';
import { styles } from "../styles";
import useTheme from 'hooks/useTheme';
import { TENANT_OPTION, formatEnumToSelectOptions, stringifyEnumValue } from 'constants/enums'

const StepFour = ({ errors, setValue, watching }) => {
    const theme = useTheme();
    const labelStyle = { fontWeight: '600', fontSize: 16, fontFamily: theme['text-subtitle-3-font-family'], lineHeight: 24 };
    const selectInputProps = { mb: 15, placeholder: "Select", labelStyle }
    return (
        <Box as={ScrollView} flex={1} px="2" mx="3">
            <Text style={styles.headingText} mt="3" category="h3" >{`4. Service & Maintenance Request`}</Text>
            <Divider mt={10} mb={30} />
            <SelectInput
                label="Does the tenant make legitimate maintence requests?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.makesLegitimateRequests && 'danger'}
                caption={
                    errors.makesLegitimateRequests && errors.makesLegitimateRequests.message
                }
                isRequired
                onSelect={val => setValue('makesLegitimateRequests', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.makesLegitimateRequests)}
                {...selectInputProps}
            />
        </Box>
    )
};

export default StepFour;
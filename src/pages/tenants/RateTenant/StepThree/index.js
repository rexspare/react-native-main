import React from 'react';
import { ScrollView } from 'react-native';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Text from 'components/Text';
import SelectInput from 'components/SelectInput';
import YesNoInput from 'components/YesNoInput';
import { styles } from "../styles";
import useTheme from 'hooks/useTheme';
import { formatEnumToSelectOptions, TENANT_OPTION, stringifyEnumValue } from 'constants/enums'

const StepThree = ({ errors, setValue, watching }) => {
    const theme = useTheme();
    const labelStyle = { fontWeight: '600', fontSize: 16, fontFamily: theme['text-subtitle-3-font-family'], lineHeight: 24 };
    const selectInputProps = { mb: 15, placeholder: "Select", labelStyle }
    return (
        <Box as={ScrollView} flex={1} px="2" mx="3">
            <Text style={styles.headingText} mt="3" category="h3" >3. LEASE TERM</Text>
            <Divider mt={10} mb={30} />
            <SelectInput
                label="Does the tenant comply with the lease terms?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.compliesToTerms && 'danger'}
                caption={
                    errors.compliesToTerms && errors.compliesToTerms.message
                }
                isRequired
                onSelect={val => setValue('compliesToTerms', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.compliesToTerms)}
                {...selectInputProps}
            />
        </Box>
    )
};

export default StepThree;
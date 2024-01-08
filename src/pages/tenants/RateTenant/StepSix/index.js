import React from 'react';
import { ScrollView } from 'react-native';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Text from 'components/Text';
import SelectInput from 'components/SelectInput';
import { styles } from "../styles";
import useTheme from 'hooks/useTheme';
import { TENANT_OPTION, formatEnumToSelectOptions, stringifyEnumValue } from 'constants/enums'

const StepSix = ({ errors, setValue, watching }) => {
    const theme = useTheme();
    const labelStyle = { fontWeight: '600', fontSize: 16, fontFamily: theme['text-subtitle-3-font-family'], lineHeight: 24 };
    const selectInputProps = { mb: 15, placeholder: "Select", labelStyle }
    return (
        <Box as={ScrollView} flex={1} px="2" mx="3">
            <Text style={styles.headingText} mt="3" category="h3" >6. tenant damages</Text>
            <Divider mt={10} mb={30} />
            <SelectInput
                label="Does the tenant damage the building/unit?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.damagesBuilding && 'danger'}
                caption={
                    errors.damagesBuilding && errors.damagesBuilding.message
                }
                isRequired
                onSelect={val => setValue('damagesBuilding', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.damagesBuilding)}
                {...selectInputProps}
            />
        </Box>
    )
};

export default StepSix;
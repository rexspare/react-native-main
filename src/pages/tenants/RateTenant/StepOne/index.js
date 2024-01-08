import React from 'react';
import { ScrollView } from 'react-native';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Text from 'components/Text';
import SelectInput from 'components/SelectInput';
import { styles } from "../styles";
import useTheme from 'hooks/useTheme';
import {TENANCY_DURATION_OPTIONS, formatEnumToSelectOptions, stringifyEnumValue} from 'constants/enums'

const StepOne = ({ errors, setValue, watching }) => {
    const theme = useTheme();
    const labelStyle = { fontWeight: '600', fontSize: 16, fontFamily: theme['text-subtitle-3-font-family'], lineHeight: 24 };
    return (
        <Box as={ScrollView} flex={1} px="2" mx="3">
            <Text style={styles.headingText} mt="3" category="h3" >1. TENANCY</Text>
            <Divider mt={10} mb={30} />
            <SelectInput
                labelStyle={labelStyle}
                label="How long was the tenant residing here?"
                placeholder={"Select"}
                mb={15}
                options={formatEnumToSelectOptions(TENANCY_DURATION_OPTIONS) }
                status={errors.tenancyYears && 'danger'}
                caption={errors?.tenancyYears?.message}
                onSelect={val => setValue('tenancyYears', val?.key)}
                value={stringifyEnumValue(TENANCY_DURATION_OPTIONS, watching?.tenancyYears)}
                isRequired
            />
          
        </Box>
    )
};

export default StepOne;
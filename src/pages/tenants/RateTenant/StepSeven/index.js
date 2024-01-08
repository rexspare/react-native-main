import React from 'react';
import { ScrollView } from 'react-native';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Text from 'components/Text';
import SelectInput from 'components/SelectInput';
import Input from 'components/Input';
import { styles } from "../styles";
import useTheme from 'hooks/useTheme';
import { TENANT_OPTION, formatEnumToSelectOptions, stringifyEnumValue } from 'constants/enums'

const StepSeven = ({ errors, setValue, watching }) => {
    const theme = useTheme();
    const labelStyle = { fontWeight: '600', fontSize: 16, fontFamily: theme['text-subtitle-3-font-family'], lineHeight: 24 };
    const selectInputProps = { mb: 15, placeholder: "Select", labelStyle }
    return (
        <Box as={ScrollView} flex={1} px="2" mx="3">
            <Text style={styles.headingText} mt="3" category="h3" >7. tenant behavior</Text>
            <Divider mt={10} mb={30} />
            {/* CHANGE SETVALUE */}
            <SelectInput
                label="Has the tenant been involved in any court proceedings/settlements with management or owner?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.courtProceedingsSettlements && 'danger'}
                caption={
                    errors.courtProceedingsSettlements && errors.courtProceedingsSettlements.message
                }
                isRequired
                onSelect={val => setValue('courtProceedingsSettlements', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.courtProceedingsSettlements)}
                {...selectInputProps}
            />
            <Input
                label="If you were to give the tenant a score from 0-100 with 100 being the best, what would you rate them?"
                labelStyle={labelStyle}
                keyboardType='numeric'
                onChangeText={val => setValue('score', val)}
                value={watching?.score}
                status={errors?.score ? 'danger' : null}
                caption={errors?.score?.message}
                placeholder="Enter a Number"
                mb={15}
            />
            <Input
                label="Additional Comments"
                labelStyle={labelStyle}
                multiline
                numberOfLines={6}
                onChangeText={val => setValue('comment', val)}
                value={watching?.comment}
                status={errors?.comment ? 'danger' : null}
                caption={errors?.comment?.message}
                placeholder="Leave some comments here"
                textStyle={{ minHeight: 120 }}
                mb={15}
                isRequired
            />
        </Box>
    )
};

export default StepSeven;
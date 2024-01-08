import DateField from "components/Forms/Fields/DateField";
import SwitchField from "components/Forms/Fields/SwitchField";
import { Container } from "components/Forms/Tasks/TaskForm";
import InputLabel from "components/InputLabel";
import { usaDateFormat } from "constants/dateFormat";
import { t } from "helpers/react";
import { useIsOpen } from "hooks/useIsOpen";
import React from "react";
import { input_label_16 } from "styles/reusable-classes";
import { styles as defaultStyles } from "./styles"

const now = new Date();
const min_select = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());
const max_select = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate());
const rangeProps = { min: min_select, max: max_select };


export const defaultDateFieldCopy = { label: "Date", fromLabel: "From", toLabel: "To", addLabel: usaDateFormat };
export const dateFieldDefaultProps = {
    inputProps: {
        activeColor: "#000",
        width: 144,
        styles: defaultStyles.fieldStyles,
        containerStyle: { marginTop: 7, marginBottom: -10 },
        icon: "calendar",
        overflow: "hidden",
        buttonProps: defaultStyles.fieldButtonStyles,
    },
    editable: true,
    ...rangeProps
};

const DateFilter = ({ copy = defaultDateFieldCopy, min, max, setMin, setMax, styles, switchFilter, isRange = true, fieldLabelStyle, ...props }) => {
    const { isOpen, toggle } = useIsOpen(!switchFilter)
    return (
        <Container {...defaultStyles?.container}  {...styles?.container} mt={0}>
            {t(switchFilter, <SwitchField checked={isOpen} onChange={toggle} label={copy.label} styles={defaultStyles.switch} />,
            t(copy?.label,<InputLabel label={copy?.label}  labelStyle={input_label_16}   />)
            )}

            {t(isOpen, <Container {...defaultStyles?.fieldsContainer}  {...styles?.fieldsContainer} marginRight={0} mt={0}>
                <DateField
                    copy={{ label: copy?.fromLabel, addLabel: copy?.addLabel }}
                    value={min}
                    onSelect={setMin}
                    boundingMonth={true}
                    {...dateFieldDefaultProps}
                    {...props?.dateField}
                />
                {t(isRange,
                    <>
                        <DateField
                            copy={{ label: copy?.toLabel, addLabel: copy?.addLabel }}
                            value={max}
                            boundingMonth={true}
                            onSelect={setMax}
                            {...dateFieldDefaultProps}
                            {...props?.dateField}

                        />
                    </>
                )}
            </Container>)}
        </Container>
    )
}


export default DateFilter
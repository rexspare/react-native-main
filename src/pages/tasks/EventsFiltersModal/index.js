import Box from "components/Box";
import DateFilter, { defaultDateFieldCopy } from "components/Filters/DateFilter";
import FiltersModal from "components/FiltersModal";
import SwitchField from "components/Forms/Fields/SwitchField";
import InputLabel from "components/InputLabel";
import { t } from "helpers/react";
import useFilter from "hooks/useFilter";
import { noop } from "lodash";
import React, { useState } from "react";
import { input_label_16 } from "styles/reusable-classes";
import { styles } from "../TaskFiltersPage/styles";


const dateKeys = {
    ALL_TIMES: "ALL_TIMES",
    CURRENT_WEEK: "CURRENT_WEEK",
    CUSTOM: "CUSTOM"
};

const EventsFiltersModal = ({setFilter: setParentFilter = noop, visible, onHide, ...props}) => {
    const [dateFilterField, setDateFilterField] = useState(dateKeys.ALL_TIMES)
    const [filter, _setFilter] = useFilter([
        "appointments",
        "tasks",
        "date",
    ])
    const setFilter = (field) => (val) => _setFilter(field, val);

    const getDateSwitchProps = (key) => ({
        onChange: () => setDateFilterField(key),
        checked: dateFilterField === key,
        styles: styles.switch
    });
    
    return (
        <FiltersModal visible={visible} onHide={onHide} setFilter={setParentFilter}>
            <Box {...styles.container}>
                <SwitchField checked={filter?.appointments} label={"Appointments"} onChange={setFilter("appointments")}  styles={styles.switch}/>
                <SwitchField checked={filter?.tasks} label={"Tasks"} onChange={setFilter("tasks")} styles={styles.switch} />
            </Box>
            <Box {...styles.container}>
                <InputLabel labelStyle={input_label_16} label={"By Date"} />
                <SwitchField label={"All times"}{...getDateSwitchProps(dateKeys.ALL_TIMES)} />
                <SwitchField label={"This week"} {...getDateSwitchProps(dateKeys.CURRENT_WEEK)} />
                <SwitchField label={"Custom date"}  {...getDateSwitchProps(dateKeys.CUSTOM)} />
                {t(dateFilterField === dateKeys.CUSTOM,
                    <DateFilter
                        copy={{...defaultDateFieldCopy, label: null}}
                        setMin={(min) => _setFilter("date", [min, filter?.date?.[1]])}
                        setMax={(max) => _setFilter("date", [filter?.date?.[0], max])}
                        min={filter?.date?.[0]}
                        max={filter?.date?.[1]}
                        styles={{fieldContainer:{ paddingRight: 18,  width: "100%"}}}
                    />
                )}
            </Box>
        </FiltersModal>
    )
}
export default EventsFiltersModal
import DateFilter from "components/Filters/DateFilter";
import BuildingField from "components/Forms/Fields/BuildingField";
import CategoryInputField from "components/Forms/Fields/CategoryInputField";
import MultiSelectBoxes from "components/Forms/Fields/MultiSelectBoxes";
import UnitField from "components/Forms/Fields/UnitField";
import { Container } from "components/Forms/Tasks/TaskForm";
import InputLabel from "components/InputLabel";
import { stringifyEnumValue, TASK_PRIORITY, TASK_TYPES } from "constants/enums";
import useFilter from "hooks/useFilter";
import FiltersPage, { getFilterProps as _getFilterProps } from "pages/FilterPage";
import React, { useMemo } from "react";
import { input_label_16 } from "styles/reusable-classes";
import { styles } from "./styles";



const TaskFiltersPage = ({ navigation }) => {
    const [filter, _setFilter] = useFilter([
        "building",
        "unit",
        "taskType",
        "priority",
        "due"
    ])

    const setFilter = (field) => (val) => _setFilter(field, val);
    const getFilterProps = useMemo(() => _getFilterProps({ filter, setFilter }), [filter, setFilter])

    return (
        <FiltersPage navigation={navigation}>
            <Container {...styles.container}>
                <BuildingField value={filter?.building?.id} {...getFilterProps("building")} />
                <UnitField value={filter?.unit?.id} {...getFilterProps("unit")} />
            </Container>
            <Container {...styles.container}>
                <CategoryInputField
                    navigation={navigation}
                    options={Object.values(TASK_TYPES)}
                    label={(filter?.taskType && stringifyEnumValue(TASK_TYPES, filter?.taskType)) || "Task Category"}
                    {...getFilterProps("taskType")}
                    mb={0}
                />
            </Container>
            <Container {...styles.container}>
                <MultiSelectBoxes
                    label={"Task Priority"}
                    value={filter?.priority}
                    values={TASK_PRIORITY}
                    onPress={setFilter("priority")}
                    {...styles.priority}
                />
            </Container>
            <DateFilter
                setMin={(min) => _setFilter("due", [min, filter?.due?.[1]])}
                setMax={(max) => _setFilter("due", [filter?.due?.[0], max])}
                min={filter?.due?.[0]}
                max={filter?.due?.[1]}
            />
        </FiltersPage>
    )
}

export default TaskFiltersPage

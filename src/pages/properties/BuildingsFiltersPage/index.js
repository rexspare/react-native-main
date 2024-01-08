import { Container } from "components/Forms/Tasks/TaskForm";
import useFilter from "hooks/useFilter";
import FiltersPage, { getFilterProps as _getFilterProps } from "pages/FilterPage";
import React, { useMemo } from "react";
import { styles } from "pages/tasks/TaskFiltersPage/styles";
import SelectInput from "components/SelectInput"
import MultiSelectBoxes from "components/Forms/Fields/MultiSelectBoxes";
import BuildingField from "components/Forms/Fields/BuildingField";
import { PROPERTY_TYPES, RENT_TYPES, formatEnumToSelectOptions, stringifyEnumValue, UNIT_STATUS } from "constants/enums";
import NumericRangeField from "components/Forms/Fields/NumericRangeField";
import {styles as _styles} from "./styles"
import InputLabel from "components/InputLabel";
import { input_label_16 } from "styles/reusable-classes";
import Box from "components/Box";

const BuildingsFiltersPage = ({ navigation }) => {
    const [filter, _setFilter] = useFilter([
        "buildings",
        "propertyType",
        "unitCountRange",
        "unitRegulationStatus",
        "unitStatus",
        "buildingFeed"
    ]);

    const setFilter = (field) => (val) => _setFilter(field, val);
    const getFilterProps = useMemo(() => _getFilterProps({ filter, setFilter }), [filter, setFilter])
    
    const handleApplyFilters = () => _setFilter("buildingFeed", {
        minUnits: filter?.unitCountRange?.[0],
        maxUnits: filter?.unitCountRange?.[1],
        buildingsIn: filter?.buildings && filter?.buildings.map(building => building?.pk).join(","),
        propertyType: filter?.propertyType,
        unitStatus: filter?.unitStatus,
        unitRegulationStatus: filter?.unitRegulationStatus
    });

    return (
        <FiltersPage navigation={navigation} onApply={handleApplyFilters}>
            <Box style={{marginTop: 18, paddingHorizontal: 18}}>
            <BuildingField 
                    value={filter?.buildings} 
                    label={filter?.buildings?.address || "Building"} 
                    {...getFilterProps("buildings")} 
                    limit={null} 
                />
            </Box>
            <Container  {...styles.container} {..._styles.container}>
                <SelectInput 
                    options={formatEnumToSelectOptions(PROPERTY_TYPES)} 
                    placeholder={"Property Type"}
                    label={"Property type"}
                    onSelect={(val) => _setFilter("propertyType", val?.key)} 
                    value={stringifyEnumValue(PROPERTY_TYPES,filter?.propertyType)}
                    styles={_styles.dropdown} 
                />

                <NumericRangeField
                    label={'Units[#]'}
                    setMin={val => _setFilter('unitCountRange', [val, filter?.unitCountRange?.[1]])}
                    setMax={val => _setFilter('unitCountRange', [filter?.unitCountRange?.[0], val])}
                    min={filter?.unitCountRange?.[0]}
                    max={filter?.unitCountRange?.[1]}
                />
                <SelectInput 
                    label={"Regulation Status"}
                    options={formatEnumToSelectOptions(RENT_TYPES)} 
                    placeholder={"Regulation Status"}
                    onSelect={(val) => _setFilter("unitRegulationStatus", val?.key)} 
                    value={stringifyEnumValue(RENT_TYPES,filter?.unitRegulationStatus)}  
                    styles={_styles.dropdown} 
                />
                
                <MultiSelectBoxes 
                    values={UNIT_STATUS} 
                    value={filter?.unitStatus} 
                    label={"status"} 
                    containerStyle={_styles.multiSelectContainer}
                    onPress={setFilter("unitStatus")} 
                    style={_styles.multiSelectItemStyle}
                    styles={{optionsContainer: {justifyContent: "space-evenly"}}}
                />
            </Container>
        </FiltersPage>
    )
}
export default BuildingsFiltersPage
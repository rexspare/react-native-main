import React, { useEffect, useState } from "react";
import FiltersModal from "components/FiltersModal";
import useFilter from "hooks/useFilter";
import DateField from 'components/Forms/Fields/DateField';
import Box from 'components/Box';
import TouchableText from 'components/TouchableText';
import Button from 'components/Button';
import SelectListItem from 'components/SelectListItem/SelectListItem';
import Text from 'components/Text';
import { chain } from 'helpers/func';
import { getFilterProps as _getFilterProps } from "pages/FilterPage";
import { typography } from 'styles/typography';
import { styles } from "./styles";

const filters = [
    "date",
    "type"
];

const ProfileFiltersModal = ({ navigation, setFilter: setParentFilter, visible, onHide, ...props }) => {
    const [filter, _setFilter] = useFilter(filters);
    const [appliedFilter, setAppliedFilter] = useState(0);
    const types = [{ name: "Messages", isSelected: false }, { name: "Actions", isSelected: false }];

    useEffect(() => {
        let applyFilter = 0;
        for (const key in filter) {
            if (filter.hasOwnProperty(key)) {
                filter[key] != undefined && ++applyFilter
                setAppliedFilter(applyFilter);
            }
        }
    }, [filter]);

    const handleApplyFilters = () => {
        _setFilter("profilefilter", {
            ...(filter?.date && { dueMax: filter?.date, }),
        })
    };

    const clearFilters = chain([
        () => filters.map(field => _setFilter(field, null)),
        () => _setFilter("profilefilter", {}),
        onHide,
    ]);
    const headerRight = (
        <TouchableText style={{ ...typography['body/small – medium'], textTransform: "uppercase" }} onPress={clearFilters}>Clear</TouchableText>
    );

    return (
        <FiltersModal displayDone={false} headerRight={headerRight} visible={visible} onHide={onHide} setFilter={handleApplyFilters} >
            <Box
                mt="7%"
                justifyContent="space-between">
                <DateField
                    value={filter?.date}
                    onSelect={val => _setFilter('date', val)}
                    editable={true}
                    copy={{
                        label: 'Date',
                    }}
                    labelStyle={styles.labelStyle}
                    isScrollCalendar
                />
            </Box>
            <Box mt={3}>
                <Text style={styles.labelStyle}>TYPE</Text>
                {types?.map((item) => {
                    let isSelected = filter?.type?.name == item?.name;
                    return <SelectListItem
                        text={item?.name}
                        item={item}
                        isSelected={isSelected}
                        onPress={() => (isSelected || !filter?.type || filter?.type?.name != item?.name) ? _setFilter('type', { ...item, isSelected: !item?.isSelected }) : _setFilter('type', null)}
                    />
                })}

            </Box>
            <Button
                style={styles.filterButton}
                textStyle={{ ...typography['buttons/large'] }}
                onPress={chain([handleApplyFilters, onHide])}>
                {`APPLY FILTER (${appliedFilter})`}
            </Button>
        </FiltersModal>
    )
}

export default ProfileFiltersModal

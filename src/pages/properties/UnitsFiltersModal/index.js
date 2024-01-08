import React, { useState, useEffect } from "react";
import useFilter from "hooks/useFilter";
import { format } from 'date-fns';
import { capitalize } from 'lodash';
import { getFilterProps as _getFilterProps } from "pages/FilterPage";
import { UNIT_STATUS } from "constants/enums";
import NumericRangeField from "components/Forms/Fields/NumericRangeField";
import { styles as _styles } from "../BuildingsFiltersPage/styles";
import SwitchField from "components/Forms/Fields/SwitchField";
import Box from "components/Box";
import FiltersModal from "components/FiltersModal";
import SliderInput from "components/Slider/SliderInput";
import Divider from "components/Divider";
import NumberInput from "components/NumberInput";
import Text from "components/Text";
import AmountInput from "components/Forms/Fields/AmountInput";
import TouchableText from 'components/TouchableText';
import Button from 'components/Button';
import SelectListItem from 'components/SelectListItem/SelectListItem';
import InputLabel from 'components/InputLabel';
import DateField from "components/Forms/Fields/DateField";
import { usaDateFormat } from 'constants/dateFormat';
import { Icon } from "@ui-kitten/components";
import Icons from 'components/Icon';
import { chain } from 'helpers/func';
import { colors } from "styles/theme";
import { typography } from "styles/typography";
import { input_label_14 } from 'styles/reusable-classes';
import { styles } from './styles';

const filters = [
    "price",
    "bedroomCount",
    "status",
    "unitsFeed",
    "isFurnished",
    "roomCount",
    "availableDate"
];

const UnitsFiltersModal = ({ visible, onHide }) => {
    const [filter, _setFilter] = useFilter(filters);
    const [appliedFilter, setAppliedFilter] = useState(0);
    const setFilter = (field) => (val) => _setFilter(field, val);
    const toggleStatusFilter = item => {
        _setFilter('status', filter?.status?.value === item ? {} : item);
    }

    useEffect(() => {
        let applyFilter = 0;
        for (const key in filter) {
            if (filter.hasOwnProperty(key)) {
                filter[key] != undefined && ++applyFilter;
                setAppliedFilter(applyFilter);
            }
        }
    }, [filter]);


    const handleApplyFilters = () => _setFilter("unitsFeed", {
        priceMin: filter?.price?.[0],
        priceMax: filter?.price?.[1],
        status: filter?.status?.value,
        isFurnished: filter?.isFurnished,
        bedroomCount: filter?.bedroomCount
    });

    const clearFilters = chain([
        () => filters.map(field => {
            let value = field == 'price' ? {} : null
            _setFilter(field, value)
        }),
        () => _setFilter('unitsFeed', {}),
        onHide,
    ]);

    const headerRight = (
        <TouchableText
            style={{
                ...typography['body/small – medium'],
                textTransform: 'uppercase',
            }}
            onPress={clearFilters}>
            Clear
        </TouchableText>
    );

    return (
        <FiltersModal
            displayDone={false}
            headerRight={headerRight}
            visible={visible}
            onHide={onHide}
            setFilter={handleApplyFilters}
        >
            <Box mt={10}>
                <NumericRangeField
                    styles={{ container: { mt: 3 }, labelStyle: { fontWeight: "500", textTransform: "uppercase", color: colors['gray scale/40'] } }}
                    label={'Price'}
                    setMin={val => _setFilter('price', [val, filter?.price?.[1]])}
                    setMax={val => _setFilter('price', [filter?.price?.[0], !!val ? val : null])}
                    min={filter?.price?.[0] && `${filter?.price?.[0]}`}
                    max={filter?.price?.[1] && `${filter?.price?.[1]}`}
                    InputComponent={AmountInput}
                    inputProps={{
                        icon: (style) =>
                            <Box position={"absolute"} justifyContent={"center"} alignItems={"center"} height={18} width={18}>
                                <Icon
                                    {...style}
                                    name={"dollar"}
                                    pack={"pm"}
                                    height={36}
                                    width={36}
                                />
                            </Box>,
                        textStyle: { paddingLeft: 18 }
                    }}
                />
            </Box>
            
            <SliderInput
                min={0}
                max={20000}
                value={filter?.price}
                label=""
                hideLabels={true}
                py={0}
                rangeDisabled={false}
                onChange={val => {
                    const min = !!val[0] ? parseFloat(val[0]).toFixed(2) : val[0];
                    const max = !!val[1] ? parseFloat(val[1]).toFixed(2) : val[1];
                    const value = [min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')]
                    _setFilter('price', value)
                }}
            />
            <Divider my={4} />
            <Box flexDirection="row" justifyContent="space-between" alignItems={"center"}>
                <Text style={{ ...typography['body/medium – regular'], color: colors['gray scale/90'] }}>Bedroom</Text>
                <NumberInput
                    value={filter?.bedroomCount}
                    onChange={(val) => _setFilter("bedroomCount", val)}
                />
            </Box>

            <Box flexDirection="row" justifyContent="space-between" alignItems={"center"}>
                <Text style={{ ...typography['body/medium – regular'], color: colors['gray scale/90'] }}>Total Room Count</Text>
                <NumberInput
                    value={filter?.roomCount}
                    onChange={(val) => _setFilter("roomCount", val)}
                />
            </Box>
            <SwitchField
                label={"IS FURNISHED"}
                checked={filter?.isFurnished}
                onChange={setFilter("isFurnished")}
                styles={{ container: { alignItems: "flex-start", marginLeft: 0, marginTop: 0 } }}
                containerStyle={{ height: 25, width: 44 }}
                circleSize={21}
                circleRadius={21}
            />

            <Divider mt={4} mb={4} />
            <DateField
                copy={{ label: 'Available Date', addLabel: usaDateFormat }}
                value={filter?.availableDate}
                onSelect={val => _setFilter('availableDate', val)}
                editable={true}
                labelStyle={{ textTransform: 'capitalize' }}
                isRequired
                isScrollCalendar
            />
            <Box alignSelf="center" mt={4}>
                <InputLabel label={'Status'} labelStyle={styles.statusLabel} />
                {Object.entries(UNIT_STATUS).map(([text, value]) => (
                    <SelectListItem
                        isSelected={value === filter?.status?.value}
                        onPress={() => {
                            toggleStatusFilter({ value: value, text: text })
                        }}
                        text={capitalize(text)}
                    />
                ))}
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

export default UnitsFiltersModal
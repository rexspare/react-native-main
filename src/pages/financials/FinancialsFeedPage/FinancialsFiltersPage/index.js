import React, { useState, useEffect } from 'react';
import useFilter from 'hooks/useFilter';
import { gqlDateFmt } from 'pages/financials/const';
import DateField from 'components/Forms/Fields/DateField';
import BuildingField from 'components/Forms/Fields/BuildingField';
import PaymentMethodField from 'components/Forms/Fields/PaymentMethodField';
import TenantField from 'components/Forms/Fields/TenantField';
import UnitField from 'components/Forms/Fields/UnitField';
import { Container } from 'components/Forms/Tasks/TaskForm';
import FiltersModal from 'components/FiltersModal';
import TouchableText from 'components/TouchableText';
import Button from 'components/Button';
import ActionBar from './ActionBar';
import { removeFilterObjectFromArray } from "helpers/array"
import { chain } from 'helpers/func';
import { format } from 'helpers/date';
import { usaDateFormat } from 'constants/dateFormat';
import { typography } from 'styles/typography';
import { styles } from './styles';

const filters = [
  'building',
  'unit',
  'tenant',
  'paymentMethod',
  'dateRange',
];
const FinancialsFiltersPage = ({ setFilter, visible, onHide, ...props }) => {
  const [filter, _setFilter] = useFilter(filters);
  const [appliedFilter, setAppliedFilter] = useState(0);

  useEffect(() => {
    let applyFilter = 0;
    for (const key in filter) {
      if (filter.hasOwnProperty(key)) {
        filter[key] != undefined && ++applyFilter
        setAppliedFilter(applyFilter);
      }
    }
  }, [filter]);

  const handleApplyFilters = () => _setFilter("financialsFeed", {
    building: filter?.building ? filter?.building[0]?.pk : undefined,
    unit: filter?.unit ? filter?.unit[0]?.pk : undefined ,
    payer: filter?.tenant?.pk,
    paymentMethod: filter?.paymentMethod,
    dateMin: format(filter?.dateRange?.[0], gqlDateFmt),
    dateMax: format(filter?.dateRange?.[1], gqlDateFmt),
  });

  const clearFilters = chain([
    () => filters.map(field => _setFilter(field, null)),
    () => _setFilter("financialsFeed", { building: undefined, unit: undefined, payer: undefined, paymentMethod: undefined, dateMin: undefined, dateMax: undefined }),
  ]);

  const headerRight = (
    <TouchableText style={{ ...typography['body/small – medium'], textTransform: "uppercase" }} onPress={clearFilters}>Clear</TouchableText>
  );

  return (
    <FiltersModal headerRight={headerRight} displayDone={false} visible={visible} onHide={onHide} setFilter={handleApplyFilters}>
      <Container {...styles.container} {...styles.filterContainer}>
        <BuildingField
          setValue={val => _setFilter('building', val)}
          value={filter?.building ? filter?.building : filter?.building}
          Component={ActionBar}
          removeItem={(building) => {
            _setFilter("building", removeFilterObjectFromArray(filter?.building, building?.id))
          }}
          openSelectOnValuePress={true}
          limit={null}
          isCheckBox={true}
        />
        <UnitField
          setValue={val => _setFilter('unit', val)}
          value={filter?.unit}
          Component={ActionBar}
          openSelectOnValuePress={true}
          buildingId={filter?.building ? filter?.building[0]?.pk : null}
          removeItem={(unit) => {
            _setFilter("unit", removeFilterObjectFromArray(filter?.unit, unit?.id))
          }}
          limit={null}
          isCheckBox={true}
        />
        <TenantField
          setValue={val => _setFilter('tenant', val)}
          value={filter?.tenant}
          limit={1}
          openSelectOnValuePress={true}
          isChange={!!filter?.tenant?.pk}
          removeItem={() => _setFilter('tenant', '')}
        />
        <PaymentMethodField
          setValue={val => _setFilter('paymentMethod', val)}
          value={filter?.paymentMethod}
          Component={ActionBar}
          openSelectOnValuePress={true}
        />
        <DateField
          copy={{ label: 'Date', addLabel: usaDateFormat }}
          value={filter?.dateRange?.[0]}
          onSelect={min =>
            _setFilter('dateRange', [min, filter?.dateRange?.[0]])
          }
          editable={true}
          labelStyle={styles.labelStyle}
          isScrollCalendar
        />
      </Container>
      <Button
        style={styles.filterButton}
        textStyle={{ ...typography['buttons/large'] }}
        onPress={chain([handleApplyFilters, onHide])}>
        {`APPLY FILTER (${appliedFilter})`}
      </Button>
    </FiltersModal>
  );
};

export default FinancialsFiltersPage;

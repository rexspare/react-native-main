import React, { useState, useEffect } from 'react';
import useFilter from 'hooks/useFilter';
import BuildingField from 'components/Forms/Fields/BuildingField';
import UnitField from 'components/Forms/Fields/UnitField';
import FiltersModal from 'components/FiltersModal';
import TouchableText from 'components/TouchableText';
import TimePeriod from 'components/Forms/Fields/TimePeriod';
import Button from 'components/Button';
import { Container } from 'components/Forms/Tasks/TaskForm';
import { usaDateFormat } from 'constants/dateFormat';
import ActionBar from '../../FinancialsFiltersPage/ActionBar';
import { removeFilterObjectFromArray } from 'helpers/array';
import { chain } from 'helpers/func';
import { typography } from 'styles/typography';
import { styles } from './styles';

const filters = ['building', 'unit', 'dateRange'];

const GraphFilters = ({ navigation, route, visible, onHide, ...props }) => {
  const [filter, _setFilter] = useFilter(filters);
  const [appliedFilter, setAppliedFilter] = useState(0);

  useEffect(() => {
    let applyFilter = 0;
    for (const key in filter) {
      if (filter.hasOwnProperty(key)) {
        filter[key] != undefined && ++applyFilter;
        setAppliedFilter(applyFilter);
      }
    }
  }, [filter]);

  const handleApplyFilters = () =>
    _setFilter('financialsFeed', {
      building: filter?.building ? filter?.building[0]?.pk : undefined,
      unit: filter?.unit ? filter?.unit[0]?.pk : undefined ,
      dateMin: filter?.dateRange?.startDate,
      dateMax: filter?.dateRange?.endDate,
    });

  const clearFilters = chain([
    () => filters.map(field => _setFilter(field, null)),
    () => _setFilter('financialsFeed', {building: undefined, unit: undefined, dateMin: undefined, dateMax: undefined}),
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
      headerRight={headerRight}
      displayDone={false}
      visible={visible}
      onHide={onHide}
      setFilter={handleApplyFilters}>
      <Container {...styles.container} {...styles.filterContainer}>
        <BuildingField
          setValue={val => _setFilter('building', val)}
          value={filter?.building ? filter?.building : filter?.building}
          Component={ActionBar}
          openSelectOnValuePress={true}
          removeItem={building => {
            _setFilter(
              'building',
              removeFilterObjectFromArray(filter?.building, building?.id),
            );
          }}
          limit={null}
          isCheckBox={true}
        />
        <UnitField
          setValue={val => _setFilter('unit', val)}
          value={filter?.unit}
          Component={ActionBar}
          openSelectOnValuePress={true}
          buildingId={filter?.building ? filter?.building[0]?.pk : null}
          removeItem={unit => {
            _setFilter(
              'unit',
              removeFilterObjectFromArray(filter?.unit, unit?.id),
            );
          }}
          limit={null}
          isCheckBox={true}
        />
        <TimePeriod
          copy={{ label: 'Date', addLabel: usaDateFormat }}
          value={filter?.dateRange}
          onSelect={min => _setFilter('dateRange', min)}
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

export default GraphFilters;

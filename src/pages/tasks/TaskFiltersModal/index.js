import React, { useEffect, useMemo, useState } from 'react';
import useFilter from 'hooks/useFilter';
import { getFilterProps as _getFilterProps } from 'pages/FilterPage';
import FiltersModal from 'components/FiltersModal';
import BuildingField from 'components/Forms/Fields/BuildingField';
import MultiSelectBoxes from 'components/Forms/Fields/MultiSelectBoxes';
import UnitField from 'components/Forms/Fields/UnitField';
import DateTimeRange from 'components/Forms/Fields/DateTimeRange';
import Box from 'components/Box';
import { renderSelectInputbuttonValues } from 'components/Forms/Fields/PopoverField';
import TouchableText from 'components/TouchableText';
import Button from 'components/Button';
import { chain } from 'helpers/func';
import { removeFilterObjectFromArray } from 'helpers/array';
import { TASK_PRIORITY } from 'constants/enums';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import { styles } from './styles';

const filters = [
  'buildings',
  'units',
  'taskType',
  'priority',
  'startDate',
  'endDate',
];

const TaskFiltersModal = ({
  navigation,
  setFilter: setParentFilter,
  visible,
  onHide,
  ...props
}) => {
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

  const selectedBuildingIds = useMemo(
    () =>
      filter?.buildings &&
      filter?.buildings.map(building => building?.pk).join(','),
    [filter.buildings],
  );

  const handleApplyFilters = () =>
    _setFilter('tasksFeed', {
      buildingIds: selectedBuildingIds,
      unitIds: filter?.units && filter?.units.map(unit => unit?.pk).join(','),
      priority: filter?.priority,
      // Only pass if exists to not override recent/overdue filter functionality.
      ...(filter?.startDate && { dueMin: filter?.startDate }),
      ...(filter?.endDate && { dueMax: filter?.endDate }),
    });

  const clearFilters = chain([
    () => filters.map(field => _setFilter(field, null)),
    () => _setFilter('tasksFeed', {}),
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
      setFilter={handleApplyFilters}>
      <BuildingField
        showClearField={true}
        limit={null}
        setValue={val => _setFilter('buildings', val)}
        value={filter?.buildings}
        renderValue={(buildings, props) => {
          return (
            <Box flexDirection="column">
              {renderSelectInputbuttonValues(
                buildings,
                'displayName',
                'photos',
                props,
              )}
            </Box>
          );
        }}
        removeItem={building => {
          _setFilter(
            'buildings',
            removeFilterObjectFromArray(filter?.buildings, building?.id),
          );
        }}
      />
      <UnitField
        showClearField={true}
        limit={null}
        setValue={val => _setFilter('units', val)}
        value={filter?.units}
        variables={{ buildingIds: selectedBuildingIds }}
        renderValue={(units, props) => {
          return (
            <Box flexDirection="column">
              {renderSelectInputbuttonValues(
                units,
                'unitNumber',
                'photos',
                props,
              )}
            </Box>
          );
        }}
        removeItem={unit => {
          _setFilter(
            'units',
            removeFilterObjectFromArray(filter?.units, unit?.id),
          );
        }}
      />
      <MultiSelectBoxes
        label={'Task Priority'}
        value={filter?.priority}
        values={TASK_PRIORITY}
        onPress={value =>
          value == filter?.priority
            ? _setFilter('priority', null)
            : _setFilter('priority', value)
        }
        styles={styles.priority}
      />
      <Box mt="7%" justifyContent="space-between">
        <DateTimeRange
          copy={{ label: 'Due Date' }}
          borderColor={colors['gray scale/10']}
          onSelect={({ startDate, endDate }) => {
            _setFilter('startDate', startDate);
            _setFilter('endDate', endDate);
          }}
          clearDate={() => {
            _setFilter('startDate', null);
            _setFilter('endDate', null);
          }}
          value={
            filter?.startDate && {
              startDate: filter?.startDate,
              endDate: filter?.endDate,
            }
          }
          labelStyle={typography['body/medium – regular']}
          isDateRange={true}
          displayAllDay={true}
        />
      </Box>
      <Button
        style={styles.filterButton}
        textStyle={{ ...typography['buttons/large'] }}
        onPress={chain([handleApplyFilters, onHide])}>
        {`APPLY FILTER (${appliedFilter})`}
      </Button>
    </FiltersModal>
  );
};

export default TaskFiltersModal;

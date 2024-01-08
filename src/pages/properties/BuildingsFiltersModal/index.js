import React, { useEffect, useState, useMemo } from 'react';
import { capitalize } from 'lodash';
import useFilter from 'hooks/useFilter';
import { getFilterProps as _getFilterProps } from 'pages/FilterPage';
import BuildingField from 'components/Forms/Fields/BuildingField';
import PropertiesType from 'components/Forms/Fields/PropertyTypeField';
import InputLabel from 'components/InputLabel';
import NumericRangeField from 'components/Forms/Fields/NumericRangeField';
import Box from 'components/Box';
import FiltersModal from 'components/FiltersModal';
import RegulationStatus from 'components/Forms/Fields/RegulationStatusField';
import { renderSelectInputbuttonValues } from 'components/Forms/Fields/PopoverField';
import SelectListItem from 'components/SelectListItem/SelectListItem';
import TouchableText from 'components/TouchableText';
import { removeFilterObjectFromArray } from 'helpers/array';
import { chain } from 'helpers/func';
import Button from 'components/Button';
import UnitField from 'components/Forms/Fields/UnitField';
import { UNIT_STATUS } from 'constants/enums';
import { typography } from 'styles/typography';
import { styles as _styles } from './styles';

const filters = [
  'buildings',
  'propertyType',
  'unitRegulationStatus',
  'unitStatus',
  'unit',
  'unitCountRange',
];

const BuildingsFiltersModal = ({ visible, onHide }) => {
  const [appliedFilter, setAppliedFilter] = useState(0);
  const [filter, _setFilter] = useFilter([...filters]);

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

  const handleApplyFilters = () => {
    _setFilter('buildingFeed', {
      unit: filter?.units,
      buildingsIn: selectedBuildingIds,
      propertyType: filter?.propertyType,
      unitStatus: filter?.unitStatus?.value,
      unitRegulationStatus: filter?.unitRegulationStatus,
      units: filter?.units,
    });
  };

  const clearFilters = chain([
    () => filters?.map(field => _setFilter(field, null)),
    () => _setFilter('buildingFeed', {}),
    () => setAppliedFilter(0),
  ]);

  const headerRight = !!appliedFilter ? (
    <TouchableText
      style={{
        ...typography['body/small – medium'],
        textTransform: 'uppercase',
      }}
      onPress={clearFilters}>
      Clear
    </TouchableText>
  ) : null;

  const toggleStatusFilter = item =>
    _setFilter('unitStatus', filter?.unitStatus?.value === item ? {} : item);

  return (
    <FiltersModal
      displayDone={true}
      headerRight={headerRight}
      visible={visible}
      onHide={onHide}
      setFilter={handleApplyFilters}>
      <Box>
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
                  (styles = { text: _styles.buildingText }),
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
      </Box>
      <UnitField
        showClearField={true}
        limit={null}
        setValue={val => _setFilter('unit', val)}
        value={filter?.unit}
        variables={{ buildingIds: selectedBuildingIds }}
        renderValue={(unit, props) => {
          return (
            <Box flexDirection="column">
              {renderSelectInputbuttonValues(
                unit,
                'unitNumber',
                'photos',
                props,
              )}
            </Box>
          );
        }}
        removeItem={unit => {
          _setFilter(
            'unit',
            removeFilterObjectFromArray(filter?.unit, unit?.id),
          );
        }}
      />
      <PropertiesType
        setValue={val => _setFilter('propertyType', val.length ? val[0] : null)}
        value={filter?.propertyType && [filter?.propertyType]}
        limit={1}
        chooseBtnText="SELECT"
      />
      <RegulationStatus
        setValue={val =>
          _setFilter('unitRegulationStatus', val.length && val[0])
        }
        value={filter?.unitRegulationStatus && [filter?.unitRegulationStatus]}
        limit={1}
        chooseBtnText="SELECT"
      />
      <Box alignSelf="center" marginTop="5%">
        <InputLabel label={'Status'} labelStyle={_styles.statusLabel} />
        {Object.entries(UNIT_STATUS).map(([text, value]) => (
          <SelectListItem
            isSelected={value === filter?.unitStatus?.value}
            onPress={() => toggleStatusFilter({ value: value, text: text })}
            text={capitalize(text)}
          />
        ))}
      </Box>
      {!!appliedFilter && (
        <Button
          style={_styles.filterButton}
          textStyle={{ ...typography['buttons/large'] }}
          onPress={chain([handleApplyFilters, onHide])}>
          {`APPLY FILTER (${appliedFilter})`}
        </Button>
      )}
    </FiltersModal>
  );
};
export default BuildingsFiltersModal;

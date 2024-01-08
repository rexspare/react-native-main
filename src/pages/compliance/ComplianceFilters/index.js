import React, { useEffect, useState } from 'react';
import useFilter from 'hooks/useFilter';
import Box from 'components/Box';
import { gqlDateFmt } from 'pages/financials/const';
import FiltersModal from 'components/FiltersModal';
import BuildingField from 'components/Forms/Fields/BuildingField';
import DateTimeRange from 'components/Forms/Fields/DateTimeRange';
import MultiSelectBoxes from 'components/Forms/Fields/MultiSelectBoxes';
import SelectButtonFilterInput from 'components/SelectButtonInput/SelectButtonFilterInput';
import TouchableText from 'components/TouchableText';
import Button from 'components/Button';
import { complianceColors } from '../ComplianceDetailsPage/helpers';
import { removeFilterObjectFromArray } from 'helpers/array';
import { format } from 'helpers/date';
import { chain } from 'helpers/func';
import { COMPLIANCE_SOURCES } from '../const';
import styles from './styles';

const ComplianceFiltersModal = ({ visible, onHide }) => {
  const [filter, setFilter] = useState({});
  const [_, setGlobalFilter] = useFilter();
  const [applyCount, setApplyCount] = useState(0);

  useEffect(() => {
    const obj = {
      ...filter,
    };
    delete obj?.startDate;
    for (const key of Object.keys(obj)) {
      if (obj[key] === null) {
        delete obj[key];
      }
    }
    setApplyCount(Object.keys(obj).length);
  }, [filter]);

  const handleSetFilter = (field, value) =>
    setFilter({ ...filter, [field]: value });

  const handleApplyFilters = () => {
    setGlobalFilter('compliance', {
      buildingIds: filter?.buildings?.map(building => building?.pk).join(','),
      unitIds: filter?.units?.map(unit => unit?.pk).join(','),
      source: filter?.source,
      dateMin: format(filter?.startDate, gqlDateFmt),
      dateMax: format(filter?.endDate, gqlDateFmt),
    });
    onHide();
  };

  const clearFilters = chain([
    () => setFilter({}),
    () => setGlobalFilter('compliance', {}),
    onHide,
  ]);

  const headerRight = (
    <TouchableText style={styles.headerRight} onPress={clearFilters}>
      CLEAR
    </TouchableText>
  );

  return (
    <FiltersModal
      visible={visible}
      headerRight={headerRight}
      onHide={onHide}
      modalHeight={450}
      button={
        !!applyCount && (
          <Button
            marginTop={30}
            onPress={handleApplyFilters}
            size="large"
            textStyle={styles.applyButton}>
            Apply Filter ({applyCount})
          </Button>
        )
      }
      displayDone={false}>
      <BuildingField
        showClearField={true}
        limit={null}
        value={filter?.buildings}
        removeItem={building =>
          handleSetFilter(
            'buildings',
            removeFilterObjectFromArray(filter?.buildings, building?.id),
          )
        }
        setValue={buildings => handleSetFilter('buildings', buildings)}
      />
      <Box justifyContent="space-between">
        <DateTimeRange
          copy={{ label: 'Date' }}
          borderColor={styles.dateBorderColor}
          onSelect={({ startDate, endDate }) =>
            setFilter({ ...filter, startDate, endDate })
          }
          clearDate={() =>
            setFilter({ ...filter, startDate: null, endDate: null })
          }
          value={
            filter?.startDate && {
              startDate: filter?.startDate,
              endDate: filter?.endDate,
            }
          }
          labelStyle={styles.labelStyle}
          isDateRange={true}
          displayAllDay={false}
        />
      </Box>
      <MultiSelectBoxes
        label={'Source'}
        value={filter?.source}
        values={COMPLIANCE_SOURCES}
        styles={{
          ...styles.multiselect,
          active: {
            backgroundColor: complianceColors[filter?.source],
          },
        }}
        onPress={value =>
          handleSetFilter('source', value == filter?.source ? null : value)
        }
      />
    </FiltersModal>
  );
};

export default ComplianceFiltersModal;

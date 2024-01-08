import React from 'react';
import Box from 'components/Box';
import { useIsOpen } from 'hooks/useIsOpen';
import { FINANCIAL_REPORT_TYPES } from 'pages/financials/const';
import HeadedScreen from 'components/HeadedScreen';
import MultiTextSwitch from 'components/MultiTextSwitch';
import FinancialsExportModal from '../FinancialsExportModal';
import GraphFilters from '../FinancialsGraph/GraphFilters';
import FinancialsFiltersPage from '../FinancialsFiltersPage';
import { stringifyEnumKey } from 'constants/enums';
import { getActions } from 'constants/actions';
import { colors } from "styles/theme";
import { styles } from '../styles';
import { Divider } from '@ui-kitten/components';

export const FinancialsPageHead = ({
  navigation,
  setFilterTab,
  feedType,
  tabs,
  header,
  filters,
  permissions,
  displayGraph,
}) => {
  const {
    isOpen: displayExportModal,
    close: closeExportModal,
    open: openExportModal,
  } = useIsOpen();
  const {
    isOpen: filterOpenModal,
    close: closeFilterModal,
    open: openFilterModal,
  } = useIsOpen();

  return (
    <>
      <HeadedScreen
        header={header}
        style={{ title: { fontSIze: 18, fontWeight: '700', color: colors['gray scale/90'] } }}
        actions={getActions(
          ['back', { onPress: () => navigation.goBack() }],
          ['filterBlack', { onPress: openFilterModal }],
          ['export', { onPress: openExportModal }],
        )}>
        <MultiTextSwitch
          shape="circle"
          size="small"
          onSelect={({ value }) => setFilterTab(value)}
          options={tabs}
          key={feedType}
          style={{
            width: '91%',
            marginHorizontal: '4.5%',
          }}
        />
        <FinancialsExportModal
          reportType={FINANCIAL_REPORT_TYPES.FEED}
          variables={filters}
          visible={displayExportModal}
          onHide={closeExportModal}
          fileName={stringifyEnumKey(feedType)}
        />
      </HeadedScreen>
      <Box mt="1">
        <Divider />
      </Box>
      {displayGraph ? (
        <GraphFilters
          visible={filterOpenModal}
          onHide={closeFilterModal}
        />
      ) : (
        <FinancialsFiltersPage
          visible={filterOpenModal}
          onHide={closeFilterModal}
        />
      )}
    </>
  );
};

export default FinancialsPageHead;

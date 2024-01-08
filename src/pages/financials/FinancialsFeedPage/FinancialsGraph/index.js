import React, { useState, useMemo } from 'react';
import { ScrollView } from 'react-native';
import financialsGraphData from 'queries/financials/getGraphData.gql';
import { useQuery } from 'urql';
import formatDate from 'date-fns/format';
import Box from 'components/Box';
import TotalValues from './TotalValues';
import { format } from 'helpers/date';
import { standardShortDateFormat } from 'constants/dateFormat';
import { colors } from 'styles/theme';
import { styles } from './styles';

const FinancialsGraph = ({ activeTab, companyName, userType, filters }) => {
  const [data1, setData1] = useState([0]);
  const [data2, setData2] = useState([0]);
  const [cashIn, setCashIn] = useState();
  const [cashOut, setCashOut] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const monthNames = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const currentMonth = new Date().getMonth();
  const nextMonth = currentMonth == 11 ? 0 : currentMonth;
  const currentYear = new Date().getFullYear();
  const lastYear = new Date().getFullYear() - 1;
  const day = formatDate(new Date(), 'dd');

  const [graphRes, executeQuery] = useQuery(
    {
      query: financialsGraphData,
      variables: {
        isPaid: activeTab == 'CASH_FLOW' ? true : false,
        start: filters?.dateMin,
        end: filters?.dateMax,
        ...filters,
      },
    },
    [filters],
  );

  const getData = () => {
    setData1(
      graphRes.data?.financialsGraphData?.summary?.months.map((item, index) => {
        return item?.incoming;
      }) ?? [0],
    );
    setData2(
      graphRes.data?.financialsGraphData?.summary?.months.map((item, index) => {
        return item?.outgoing;
      }) ?? [0],
    );

    setCashIn(graphRes.data?.financialsGraphData?.summary?.totals?.incoming);
    setCashOut(graphRes.data?.financialsGraphData?.summary?.totals?.outgoing);
  };

  useMemo(() => {
    getData();
    if (filters.dateMin && filters?.dateMax) {
      setSelectedDate(
        format(new Date(filters.dateMin), standardShortDateFormat) +
          ' - ' +
          format(new Date(filters.dateMax), standardShortDateFormat),
      );
    } else {
      setSelectedDate(
        monthNames[nextMonth] +
          ' 01 ' +
          lastYear +
          ' - ' +
          monthNames[currentMonth] +
          ' ' +
          day +
          ' ' +
          currentYear,
      );
    }
  }, [graphRes, filters]);

  const data = [
    {
      data: data2,
      svg: { stroke: colors['graph/out'], strokeWidth: 2.5 },
    },
    {
      data: data1,
      svg: { stroke: colors['graph/in'], strokeWidth: 2.5 },
    },
  ];

  return userType === 3 ? (
    <Box style={styles.mainContainer}>
      <TotalValues
        date={selectedDate}
        cashIn={cashIn}
        cashOut={cashOut}
        title={activeTab == 'CASH_FLOW' ? 'NET CASH FLOW' : 'PROFIT'}
        title1={activeTab == 'CASH_FLOW' ? 'INCOMING' : 'REVENUE'}
        title2={activeTab == 'CASH_FLOW' ? 'OUTGOING' : 'EXPENSES'}
        companyName={companyName}
        style={{ height: '15%' }}
      />
    </Box>
  ) : (
    <Box style={styles.mainContainer} as={ScrollView}>
      {graphRes?.data?.financialsGraphData?.financialData.map((e, i) => {
        return (
          <Box>
            <TotalValues
              date={selectedDate}
              cashIn={e?.totals?.incoming}
              cashOut={e?.totals?.outgoing}
              title={activeTab == 'CASH_FLOW' ? 'NET CASH FLOW' : 'PROFIT'}
              title1={activeTab == 'CASH_FLOW' ? 'INCOMING' : 'REVENUE'}
              title2={activeTab == 'CASH_FLOW' ? 'OUTGOING' : 'EXPENSES'}
              companyName={e?.building}
              mb={
                i ===
                graphRes?.data?.financialsGraphData?.financialData.length - 1
                  ? 5
                  : 3
              }
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default FinancialsGraph;

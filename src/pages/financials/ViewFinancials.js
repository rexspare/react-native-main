import React from 'react';
import Box from 'components/Box';
import SafeAreaView from 'components/SafeAreaView';
import Button from 'components/Button';
import {Layout, Spinner} from '@ui-kitten/components';
import {LineChart, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import useTheme from 'hooks/useTheme';
import ThemedGradient from 'components/ThemedGradient';
import Text from 'components/Text';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScrollView, RefreshControl} from 'react-native';
import SelectInputForward from 'components/SelectInput';
import buildingSelectQuery from 'queries/properties/listPropertiesSelect.gql';
import unitSelectQuery from 'queries/properties/listUnitsSelect.gql';
import monthGraphQuery from 'queries/financials/getMonthGraph.gql';
import yearGraphQuery from 'queries/financials/getYearGraph.gql';
import {useQuery} from 'urql';
import {TRANSACTION_TYPE} from 'constants/enums';
import Icon from 'components/Icon';
import {useFocusEffect} from '@react-navigation/core';
import format from 'date-fns/format';

const PickButton = styled(Button)`
  min-width: 60;
  min-height: 30;
  padding-top: 0;
  padding-bottom: 0;
  margin-horizontal: 2;
`;

const ViewFinancials = ({route, navigation}) => {
  const theme = useTheme();
  const type = route.params?.type;
  const [isMonth, setIsMonth] = React.useState(!!type);
  const now = new Date();
  const [refreshing, setRefreshing] = React.useState(false);
  const [month, setMonth] = React.useState(now.getMonth() + 1);
  const [year, setYear] = React.useState(now.getFullYear());
  const [building, setBuilding] = React.useState();
  const [unit, setUnit] = React.useState();

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.building) {
        setBuilding(route.params.building);
      }
    }, [route.params]),
  );

  const queryVariables = React.useCallback(
    (queryType = type) => ({
      month,
      year,
      type: queryType,
      building: building?.id,
      unit: unit?.id,
    }),
    [building, month, type, unit, year],
  );

  const [monthRes, getMonthGraph] = useQuery({
    query: monthGraphQuery,
    variables: queryVariables(),
    pause: !isMonth,
  });
  const [yearRes, getYearGraph] = useQuery({
    query: yearGraphQuery,
    variables: queryVariables(),
    pause: isMonth,
  });
  const [yearExpenseRes, getYearExpenseGraph] = useQuery({
    query: yearGraphQuery,
    variables: queryVariables(TRANSACTION_TYPE.EXPENSE),
    pause: isMonth || !!type,
  });
  const [yearIncomeRes, getYearIncomeGraph] = useQuery({
    query: yearGraphQuery,
    variables: queryVariables(TRANSACTION_TYPE.INCOME),
    pause: isMonth || !!type,
  });

  const onRefresh = React.useCallback(() => {
    const refresh = async () => {
      setRefreshing(true);
      const promises = [];
      if (isMonth) {
        promises.push(getMonthGraph({requestPolicy: 'network-only'}));
      } else {
        promises.push(getYearGraph({requestPolicy: 'network-only'}));
        if (!type) {
          promises.push(getYearExpenseGraph({requestPolicy: 'network-only'}));
          promises.push(getYearIncomeGraph({requestPolicy: 'network-only'}));
        }
      }
      await Promise.all(promises);
      setRefreshing(false);
    };
    refresh();
  }, [
    getMonthGraph,
    getYearExpenseGraph,
    getYearGraph,
    getYearIncomeGraph,
    isMonth,
    type,
  ]);

  const transformedYearData = React.useMemo(() => {
    const data = yearRes.data?.transactionYearGraph ?? [];
    const transformedData = [...Array(12).keys()].map(month => {
      const existingRow = data.find(d => d.month === month + 1);
      const transformVal = !type ? val => val : Math.abs;

      return {
        month: month + 1,
        year,
        id: `${year}/${month + 1}`,
        value: transformVal(existingRow?.accValue ?? 0),
      };
    });
    transformedData.forEach((d, i) => {
      if (i === 0) {
        d.accValue = d.value;
      } else {
        d.accValue = transformedData[i - 1].accValue + (d.value || 0);
      }
    });
    return transformedData;
  }, [type, year, yearRes.data]);

  const transformedMonthData = React.useMemo(() => {
    const data = monthRes.data?.transactionMonthGraph ?? [];
    const transformedData = [...Array(31).keys()].map(day => {
      const existingRow = data.find(d => d.day === day + 1);
      const transformVal = !type ? val => val : Math.abs;

      return {
        month: month + 1,
        year,
        id: `${year}/${month}/${day + 1}`,
        value: transformVal(existingRow?.accValue ?? 0),
      };
    });
    transformedData.forEach((d, i) => {
      if (i === 0) {
        d.accValue = d.value;
      } else {
        d.accValue = transformedData[i - 1].accValue + (d.value || 0);
      }
    });
    return transformedData;
  }, [month, monthRes.data, type, year]);

  const graphData = React.useMemo(() => {
    if (isMonth) {
      const baseData = (monthRes.data?.transactionMonthGraph ?? []).map(d =>
        Math.abs(d.accValue),
      );
      if (!baseData.length) {
        return [0, 0];
      } else {
        return [0, ...baseData, baseData[baseData.length - 1]];
      }
    } else {
      return [0, ...transformedYearData.map(d => d.accValue)];
    }
  }, [isMonth, monthRes.data, transformedYearData]);

  const buildingListProps = React.useMemo(
    () => ({
      dataExtractor: data => data.buildings,
      labelExtractor: item => item.displayName,
      keyExtractor: item => item.id,
    }),
    [],
  );
  const unitListProps = React.useMemo(
    () => ({
      variables: {
        buildingId: building?.id,
      },
      dataExtractor: data => data.units,
      labelExtractor: item => item.unitNumber,
      keyExtractor: item => item.id,
    }),
    [building],
  );

  const bottomOptions = React.useMemo(() => {
    if (isMonth && type) {
      return [
        {
          title: 'JAN',
          value: 1,
        },
        {
          title: 'FEB',
          value: 2,
        },
        {
          title: 'MAR',
          value: 3,
        },
        {
          title: 'APR',
          value: 4,
        },
        {
          title: 'MAY',
          value: 5,
        },
        {
          title: 'JUN',
          value: 6,
        },
        {
          title: 'JUL',
          value: 7,
        },
        {
          title: 'AUG',
          value: 8,
        },
        {
          title: 'SEP',
          value: 9,
        },
        {
          title: 'OCT',
          value: 10,
        },
        {
          title: 'NOV',
          value: 11,
        },
        {
          title: 'DEC',
          value: 12,
        },
      ];
    }
    const year = new Date().getFullYear();
    const years = [];
    for (let i = year - 9; i <= year; i++) {
      years.unshift({
        title: `${i}`,
        value: i,
      });
    }
    return years;
  }, [isMonth, type]);

  const renderSummary = React.useCallback(() => {
    return (
      <Box>
        {[...Array(12).keys()].map(month => (
          <Box my="2" key={month}>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center">
              <Text category="s1" fontSize={14} color={theme['grey-100']}>
                {format(new Date(year, month), 'MMMM')}
                {/* {new Date(year, month).toLocaleDateString(undefined, {
                  month: 'long',
                })} */}
              </Text>
              <Text status="primary">
                {(
                  (yearRes.data?.transactionYearGraph ?? []).find(
                    d => d.month === month + 1,
                  )?.accValue ?? 0
                ).toLocaleString(undefined, {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Text>
            </Box>
            <Box borderLeftWidth={1} borderLeftColor={theme['grey-0']} pl="3">
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                my="1">
                <Text category="p2" color={theme['grey-400']}>
                  Income
                </Text>
                <Text category="p2" color={theme['grey-400']}>
                  {(
                    (yearIncomeRes.data?.transactionYearGraph ?? []).find(
                      d => d.month === month + 1,
                    )?.accValue ?? 0
                  ).toLocaleString(undefined, {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </Text>
              </Box>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                my="1">
                <Text category="p2" color={theme['grey-400']}>
                  Expenses
                </Text>
                <Text category="p2" color={theme['grey-400']}>
                  {(
                    (yearExpenseRes.data?.transactionYearGraph ?? []).find(
                      d => d.month === month + 1,
                    )?.accValue ?? 0
                  ).toLocaleString(undefined, {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }, [theme, year, yearExpenseRes.data, yearIncomeRes.data, yearRes.data]);

  const renderMonthLedger = React.useCallback(
    () =>
      [...Array(31).keys()]
        .map(d => d + 1)
        .filter(
          day =>
            (monthRes.data?.transactionMonthGraph ?? []).findIndex(
              d => d.day === day,
            ) !== -1,
        )
        .map(day => {
          const records = (monthRes.data?.transactionMonthGraph ?? []).filter(
            d => d.day === day,
          );
          const daySum = records.reduce(
            (sum, curr) => sum + Math.abs(curr.value),
            0,
          );
          return (
            <React.Fragment key={day}>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mb="2">
                <Text category="s1" fontSize={14} color={theme['grey-100']}>
                  {format(new Date(year, month - 1, day), 'MM/dd')}
                  {/* {new Date(year, month - 1, day).toLocaleDateString(
                    undefined,
                    {
                      month: 'short',
                      day: 'numeric',
                    },
                  )} */}
                </Text>
                <Text status="primary">
                  {daySum.toLocaleString(undefined, {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </Text>
              </Box>
              <Box borderLeftWidth={1} borderLeftColor={theme['grey-0']} pl="3">
                {records.map(record => (
                  <Box
                    key={record.id}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    my="1">
                    <Text category="p2" color={theme['grey-400']}>
                      {record.name}
                    </Text>
                    <Text category="p2" status="primary">
                      {Math.abs(record.value).toLocaleString(undefined, {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </Text>
                  </Box>
                ))}
              </Box>
            </React.Fragment>
          );
        }),
    [month, monthRes.data, theme, year],
  );

  const loading =
    !refreshing && (isMonth ? monthRes.fetching : yearRes.fetching);

  const renderYearLedger = React.useCallback(
    () => (
      <>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mb="2">
          <Text category="s1" fontSize={14} color={theme['grey-100']}>
            {year}
          </Text>
          <Text status="primary">
            {(graphData?.length
              ? graphData[graphData.length - 1]
              : 0
            ).toLocaleString(undefined, {
              style: 'currency',
              currency: 'USD',
            })}
          </Text>
        </Box>
        <Box borderLeftWidth={1} borderLeftColor={theme['grey-0']} pl="3">
          {[...Array(12).keys()].map(month => (
            <Box
              key={month}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              my="1">
              <Text category="p2" color={theme['grey-400']}>
                {format(new Date(year, month), 'MMMM')}
                {/* {new Date(year, month).toLocaleDateString(undefined, {
                  month: 'long',
                })} */}
              </Text>
              <Text category="p2" status="primary">
                {(
                  (yearRes.data?.transactionYearGraph ?? []).find(
                    d => d.month === month + 1,
                  )?.accValue ?? 0
                ).toLocaleString(undefined, {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Text>
            </Box>
          ))}
        </Box>
      </>
    ),
    [graphData, theme, year, yearRes.data],
  );

  return (
    <Box flex={1} as={Layout}>
      {loading ? (
        <Box
          as={Layout}
          opacity={0.6}
          position="absolute"
          zIndex={1}
          left={0}
          top={0}
          right={0}
          bottom={0}
          pt={16}
          alignItems="center"
          justifyContent="center"
          pointerEvents="box-none">
          <Spinner size="giant" />
        </Box>
      ) : null}
      <Box flex={1}>
        <Box
          as={ScrollView}
          flex={1}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme['color-primary-500']}
              colors={[theme['color-primary-500']]}
            />
          }>
          <Box flexDirection="row" mx={1} mb="2px">
            <SelectInputForward
              options={buildingSelectQuery}
              textStyle={{
                color: theme['grey-400'],
                fontSize: 12,
                borderBottomWidth: 1,
                borderBottomColor: theme['grey-100'],
              }}
              listProps={buildingListProps}
              appearance="transparent"
              status="primary"
              onSelect={setBuilding}
              value={building?.displayName?.toUpperCase()}
              emptyOption="All Buildings"
              initiallyEmpty={!route.params?.building}
            />
            {building?.id ? (
              <SelectInputForward
                options={unitSelectQuery}
                textStyle={{
                  color: theme['grey-400'],
                  fontSize: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: theme['grey-100'],
                }}
                listProps={unitListProps}
                appearance="transparent"
                status="primary"
                onSelect={setUnit}
                value={unit?.unitNumber ? `Unit ${unit.unitNumber}` : null}
                emptyOption="All Units"
                initiallyEmpty
              />
            ) : null}
          </Box>
          <Box px="3">
            <Box
              flexDirection="row"
              opacity={type ? 1 : 0}
              pointerEvents={type ? null : 'none'}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsMonth(true)}>
                <PickButton
                  size="small"
                  shape="circle"
                  status="basic"
                  disabled={!isMonth}>
                  MONTH
                </PickButton>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsMonth(false)}>
                <PickButton
                  size="small"
                  shape="circle"
                  status="basic"
                  disabled={isMonth}>
                  YEAR
                </PickButton>
              </TouchableOpacity>
            </Box>
            <LineChart
              style={{height: 200, marginLeft: -16, marginRight: -16}}
              data={graphData}
              contentInset={{top: 30, bottom: 30}}
              curve={shape.curveNatural}
              svg={{stroke: theme['color-primary-500'], strokeWidth: 3}}
              animate
            />
            {isMonth ? (
              <Box alignItems="flex-start" mt={-32}>
                <PickButton size="small" shape="circle" status="basic" disabled>
                  {`${year}`}
                </PickButton>
              </Box>
            ) : null}
            <Box as={ScrollView} horizontal pb="2">
              {bottomOptions.map(o => (
                <TouchableOpacity
                  key={o.value}
                  activeOpacity={0.8}
                  onPress={() => (isMonth ? setMonth : setYear)(o.value)}>
                  <PickButton
                    size="small"
                    shape="circle"
                    status="basic"
                    disabled={(isMonth ? month : year) !== o.value}>
                    {o.title}
                  </PickButton>
                </TouchableOpacity>
              ))}
            </Box>
            <Box
              as={ThemedGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              flexDirection="row"
              py="2"
              px="3"
              my="3"
              borderRadius={10}
              height={75}
              justifyContent="space-between">
              <Text status="control" category="p2" transform="uppercase">
                Total
              </Text>
              <Text status="control" category="h1" alignSelf="flex-end">
                {(graphData?.length
                  ? graphData[graphData.length - 1]
                  : 0
                ).toLocaleString(undefined, {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Text>
            </Box>
            {!loading ? (
              <Box py="2">
                {!type ? (
                  <>
                    <Box
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                      my="1">
                      <Text category="s1" color={theme['grey-200']}>
                        Income
                      </Text>
                      <Text status="primary">
                        {Math.abs(
                          (
                            yearIncomeRes.data?.transactionYearGraph ?? []
                          ).reduce((sum, curr) => sum + curr.accValue, 0),
                        ).toLocaleString(undefined, {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </Text>
                    </Box>
                    <Box
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                      my="1">
                      <Text category="s1" color={theme['grey-200']}>
                        Expenses
                      </Text>
                      <Text status="primary">
                        {Math.abs(
                          (
                            yearExpenseRes.data?.transactionYearGraph ?? []
                          ).reduce((sum, curr) => sum + curr.accValue, 0),
                        ).toLocaleString(undefined, {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </Text>
                    </Box>
                  </>
                ) : (
                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    my="1">
                    <Text category="s1" color={theme['grey-200']}>
                      {type === TRANSACTION_TYPE.INCOME ? 'Income' : 'Expenses'}
                    </Text>
                    <Button
                      appearance="outline"
                      icon={s => Icon('plus')({...s, width: 30, height: 30})}
                      shape="circle"
                      activeOpacity={0.7}
                      onPress={() =>null
                        // navigation.navigate('EditTransaction', {
                        //   type,
                        //   onUpdate: onRefresh,
                        // })
                      }
                      style={{
                        borderWidth: 3,
                        paddingVertical: 0,
                        paddingHorizontal: 0,
                        width: 25,
                        transform: [{scale: 0.65}],
                        backgroundColor: 'transparent',
                      }}
                    />
                  </Box>
                )}
                {!type
                  ? renderSummary()
                  : isMonth
                  ? renderMonthLedger()
                  : renderYearLedger()}
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewFinancials;

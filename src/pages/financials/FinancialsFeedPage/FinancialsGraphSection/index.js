import React, { useMemo } from "react";

import Box from "components/Box";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { labels } from "pages/financials/const";
import useTheme from "hooks/useTheme";
import { FieldLabel } from "components/Forms/Tasks/TaskForm/styles";
import { t } from "helpers/react";
import TotalLabel from "./TotalLabel";
import { styles } from "./styles";
import Labels from "./GraphLabels";
import NoDataPlaceHolder from "./NoDataPlaceholder";
import Text from "components/Text";

export const formatVal = (val) => val < 1000 ? val : `${Math.round(val / 100) / 10}k`;

const FinancialsGraphSection = ({ variables, activeTab, colorMap, data: unparsedData = {} }) => {
    const totals = unparsedData?.financials?.totals;
    const theme = useTheme();
    const data = useMemo(() => getFormattedGraphData(colorMap, totals, theme, activeTab), [variables, unparsedData, colorMap, activeTab]);
    const hasData = useMemo(() => data?.some(({ value }) => !!value), [data]);

    return (
        <Box>
            {t(
                hasData, (
                <>
                    <Box {...styles.graphContainer}>
                        <YAxis
                            data={data}
                            formatLabel={(item, index) => item}
                            yAccessor={({ item }) => formatVal(item.value)}
                            {...styles.yAxis}
                        />
                        <BarChart
                            data={data}
                            yAccessor={({ item }) => item.value}
                            {...styles.barChart}
                        >
                            <Grid direction={Grid.Direction.HORIZONTAL} />
                            <XAxis formatLabel={() => ""} {...styles.xAxis} />
                            <Labels formatVal={formatVal} />
                        </BarChart>
                    </Box>
                    <Box {...styles.totalsContainer}>
                        <FieldLabel {...styles.totalsTitle} >Total:</FieldLabel>
                        <Box flexDirection={"row"} width={"90%"}>
                            {Object.values(data).map(({ label, value, svg: { fill: color } = {} }) => t(value,
                                <TotalLabel value={value} themeColor={color} label={label} />
                            ))}
                        </Box>
                    </Box>
                </>
            ), <NoDataPlaceHolder />)}


        </Box>
    )
}

const getFormattedGraphData = (colorMap, totals = {}, theme, activeTab) => {
    const map = {}
    const displayAll = colorMap[activeTab]?.displayAll

    Object.values(colorMap).map(({ totalKey, themeColor, text, value }) => {
        if (activeTab === value || displayAll) {
            map[totalKey] = { svg: { fill: theme[themeColor] }, value: totals[totalKey], label: labels[value] || text }
        }
    });

    const filteredValue = colorMap?.[activeTab]?.totalKey
    const graphData = filteredValue && !displayAll ? [{ value: 0 }, map[filteredValue], { value: 0 }] : Object.values(map)

    return graphData
}

export default FinancialsGraphSection;
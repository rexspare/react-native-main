export const styles = {
    graphContainer: {
        padding: 20, 
        flexDirection: "row",
        width: 360,
        height: 240,
        margin: "auto",
        paddingTop: 36
    },
    yAxis: {
        style: {},
        contentInset: { top: 18, bottom: 7 },
        spacing: 1,
        svg: { fontSize: 10, fill: 'grey' }
    },
    barChart: {
        style: { width: "100%", flex: 1,  overflow: "visible", borderWidth: 1, borderTopWidth: 0, borderRightWidth: 0,},
        contentInset: {top: 18, bottom: 0,},
        spacingInner: 0,
        spacing: 0.2,
        gridMin:0
    },
    xAxis: {
        style: {  bottom: 0, height: 200 },   
    },
    totalsContainer: {
        mt:12, px: 3
    },
    totalsTitle: {
        fontSize: 24
    }
}
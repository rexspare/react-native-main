import {styles as _styles } from "pages/tasks/TaskFiltersPage/styles"
import { colors } from "styles/theme";

export const styles = {
    container: {
        margin: 0,
        padding: 0,
        paddingLeft: 0,
        marginTop: 10,
        paddingBottom: 36,
        height: 108,
        borderBottomWidth: 0,
        marginBottom: 10,
        justifyContent: "flex-start",
        width: "100%",
    },
    fieldsContainer: {
        margin: 0,
        marginLeft: 0,
        padding: 0,
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        borderBottomWidth: 0,
        justifyContent: "space-between"
    },
    fieldStyles: {
        label: { style: { fontSize: 14 } }
    },
    fieldButtonStyles: {
        paddingLeft: 0, textStyle: { marginLeft: -7 }
    },
    divider: {
        height: 1,
        width: 10,
        marginTop: 21,
        top: 0,
        right: 0,
        borderWidth: 1,
        position: "relative",
        height: 0,
    },
    switch: _styles.switch,
    chooseBtn: {
        borderColor: colors['primary/80'],
        borderWidth: 1.5,
        borderRadius: 10,
        alignSelf: 'flex-end',
        backgroundColor: 'transparent',
    },
    chooseBtnText: {
        color: colors['primary/80'],
        fontWeight: 'bold',
    }
}
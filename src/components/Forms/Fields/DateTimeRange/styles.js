import { colors } from "styles/theme";

export const defaultCopy = {
    label: "Due",
    addLabel: "Set a due date"
}

export const styles = {

    close: {
        height: 18, 
        width: 18,
    },
    changeBtn: {containerStyle: {position: "absolute",  width: "100%", height: "100%",top: 0, right: 0}, textStyle: {display: "none"} },
    dateTimeRangeContent: {
        backgroundColor: "#fff",
        width: "100%",
        marginTop: 2,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors['gray scale/10']
    },
    timeContent: {
        backgroundColor: "#fff",
        width: "100%",
        marginTop: 2,
    }
}

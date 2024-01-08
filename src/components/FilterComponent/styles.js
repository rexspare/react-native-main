import { shadowedCard } from "pages/financials/FinancialsHome/styles";

export const styles = {
    container: {
        backgroundColor: "#fff", 
        borderRadius: 12, 
        justifyContent: "center",
        alignItems: "center",
        position: "absolute", 
        bottom: 24, height: 40, 
        borderWidth: 1, left: "50%", 
        marginLeft: -60, width: 120,
        flexDirection: "row",
        borderColor: "#D0D2D2",
        zIndex: 100, 
        ...shadowedCard,
        shadowOpacity: 0.18
    },
    text: {
        fontSize: 14, 
        fontWeight: "400"
    },
    icon: { height: 18, width: 18, marginHorizontal: 9}
}


import { colors } from "styles/theme";
import { typography } from "styles/typography";

export const styles = { 
    container: {
        borderRadius: 12,
        width: '91%',
        marginHorizontal: '4.5%',
        flexDirection: "row",
        alignItems: "center",
        marginTop: "3px",
        padding: 2,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: '#E7E9E9',
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        height: 54
    },
    slashSeparator: {
        color: "#D0D2D2",
        fontSize: 16,
        fontWeight: "400",
        marginHorizontal: 2,
        ...typography.textFontFamily
    }, 
    header: {
        justifyContent: "flex-end",
        alignItems: "flex-start"
    },
    content: {
        height: "100%",
        paddingLeft: 16,
        alignItems: "flex-start"
    },
    tenantText: {
        color: colors['gray scale/40'],
        fontSize: 16,
        lineHeight: 16,
        fontWeight: 400,
        ...typography.textFontFamily
    }, 
    buildingTextContainer : {
        flexDirection: "row"
    },
    buildingText: {
        color: colors['gray scale/90'],
        fontSize: 16,
        fontWeight: '400',
        textTransform: 'uppercase',
        ...typography.textFontFamily
    },
    amountContainer: {
        flex: 2,
        alignItems: "flex-end",
        paddingRight: 3,
    },
    amountText: {
        fontSize: 22,
        color: "#131F1E",
        fontSize: 16,
        fontWeight: 700,
        ...typography.textFontFamily
    },
    altAmountText: {
        ...typography["body/x-small – regular"],
        color: colors["gray scale/90"],
        fontSize: 16, 
        fontWeight: '700'
    },
    overdue: {
        ...typography["body/small – regular"]
    },
}
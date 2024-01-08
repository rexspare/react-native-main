import { colors } from "styles/theme";
import { typography } from "styles/typography";

const btn = { borderRadius: 12, minWidth: '45%'}

export const styles = {
    filetypeBtn: { marginTop: 7, backgroundColor: "#fff", justifyContent: "flex-start", borderColor: "grey" },
    filetypeTxt: { color: "#000", textAlign: "left" },
    styledLine: { position: "relative", width: "27%", height: 1, top: undefined, borderBottomWidth: 0, borderColor: colors['gray scale/10'] },
    midContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop: 7
    },
    midText: { color: colors["gray scale/40"], fontWeight: "400", fontSize: 14, ...typography.textFontFamily, margin: 30},
    btnContainer: {
        marginTop: 7,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    externalBtn: {
        ...btn,
        backgroundColor: "#fff", borderColor: colors['primary/50'],
    },
    internalBtn: {
        ...btn,
        backgroundColor: colors["primary/50"], 
    },
    text: {
        fontSize: 18, 
    }

}
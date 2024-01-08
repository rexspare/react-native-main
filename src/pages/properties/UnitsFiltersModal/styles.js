import { colors } from "styles/theme";
import { typography } from "styles/typography";

export const styles = {
    filterButton: {
        height: 50,
        alignSelf: 'center',
        marginTop: '15%',
        borderRadius: 10,
        borderWidth: 1,
        width: '100%',
        backgroundColor: colors['primary/50'],
        borderColor: colors['primary/50'],
        textStyle: { color: "red" }
    },
    statusLabel: {
        ...typography['body/medium – medium'],
        fontFamily: "Roboto",
        color: colors['gray scale/40'],
        textTransform: 'uppercase',
    },
    dateField: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        backgroundColor: colors['gray scale/5'],
        borderColor: 'transparent',
        borderRadius: 12,
        height: 48,
    },
    dateFieldText: { color: colors['gray scale/20'] },
};
import { colors } from "styles/theme";
import { typography } from "styles/typography";

export const styles = {
    labelStyle: {
        marginTop: 3,
        textTransform: 'uppercase',
        marginBottom: 0,
        ...typography['body/small – regular'],
        position: 'relative',
        color: colors['gray scale/40'],
    },
    filterButton: {
        height: 50,
        alignSelf: 'center',
        marginTop: '70%',
        borderRadius: 10,
        borderWidth: 1,
        width: '100%',
        backgroundColor: colors['primary/50'],
        borderColor: colors['primary/50'],
        textStyle: { color: "red" }
    }
};
import { colors } from "styles/theme";
import { typography } from "styles/typography";

const button = {
    height: 50,
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: 10,
    borderWidth: 1,
}

export const styles = {
    dateField: (theme) => ({
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        backgroundColor: theme['grey-0'],
        borderColor: "transparent",
        borderRadius: 12,
        height: 43
    }),
    saveButton: {
        ...button,
        width: '100%',
        backgroundColor: colors['primary/50'],
        borderColor: colors['primary/50'],
        marginBottom: 15,
    },
    disableButton: {
        backgroundColor: colors['gray scale/10'],
        borderColor: colors['gray scale/10'],
        marginBottom: 15
    },
    saveButtonText: {
        ...typography['body/medium – regular'],
        fontWeight: "500",
    },
    dateFieldText: { color: colors['gray scale/20'], ...typography['body/medium – regular'] },
    asteriks: { color: colors['additional/danger'] },
}

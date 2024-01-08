import { IS_SMALLER } from "styles/responsive";
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
    valueContainer: {
        width: '100%',
    },
    selectButtonInputValue: {
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: "100%",
            alignItems: "center"
        },
        text: {
            maxWidth: IS_SMALLER ? "50%" : "60%",
            ...typography.textFontFamily
        }
    },
    removeBtn: {
        borderWidth: 0,
        backgroundColor: "#fff",
        minHeight: 18,
        minWidth: 18
    },
    label: {
        ...typography["body/large – medium"], 
        color: colors["gray scale/40"], 
        alignSelf: "center" 
    },
    saveButton: {
        ...button,
        width: '100%',
        backgroundColor: colors['primary/50'],
        borderColor: colors['primary/50'],

    },
    saveButtonText: {
        ...typography['body/medium – regular'],
        fontWeight: "500",
    },
}
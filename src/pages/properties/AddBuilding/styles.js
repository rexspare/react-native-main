import { getStatusBarHeight } from "react-native-status-bar-height";
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
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#CFD8DC",
        width: "100%",
        title: { ...typography['body/large – Bold'] }
    },
    textInputFieldsContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: '1%',
        paddingBottom: '3%',
        borderBottomWidth: 1,
        borderBottomColor: colors['gray scale/10']
    },
    inputFieldsContainer: {
        width: '100%',
        alignSelf: 'center',
        paddingTop: '5%',
        paddingBottom: '5%',
    },
    inputField: {
        width: '100%',
        backgroundColor: colors['gray scale/10'],
        height: 50,
        marginTop: '5%',
        borderRadius: 10,
        paddingLeft: 10,
        alignSelf: 'center',
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    fieldButton: {
        ...button,
        width: '100%',
        backgroundColor: '#fff',
        borderColor: colors['primary/50']
    },
    fieldButtonText: {
        color: colors['primary/50'],
        ...typography.textFontFamily
    },
    saveButton: {
        ...button,
        width: '90%',
        backgroundColor: colors['primary/50'],
        borderColor: colors['primary/50'],
        marginBottom: 18
    },
    disableSaveButton: {
        ...button,
        width: '90%',
        backgroundColor: colors['gray scale/10'],
        borderColor: 'transparent',
        marginBottom: 18
    },
    textTitle: {
        ...typography['body/medium – bold']
    }
}
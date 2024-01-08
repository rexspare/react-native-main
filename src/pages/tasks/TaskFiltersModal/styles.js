import { colors } from "styles/theme";

export const styles = {
    container: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 3,
        paddingHorizontal: 7,
    },
    box: {
        width: '100%',
        marginTop: '5%'
    },
    priority: {
        optionText: {
            textTransform: "uppercase",
        },
        label: { marginBottom: 10, marginTop: "5%" }
    },
    filterButton: {
        height: 50,
        alignSelf: 'center',
        marginTop: '25%',
        borderRadius: 10,
        borderWidth: 1,
        width: '100%',
        backgroundColor: colors['primary/50'],
        borderColor: colors['primary/50'],
        textStyle: {color: "red"}
    }
};
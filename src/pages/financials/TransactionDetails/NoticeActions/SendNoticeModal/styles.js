import { colors } from "styles/theme";

const btn = { borderRadius: 12, width: '100%'}

export const styles = {
    btnContainer: {
        marginTop: 7,
        marginTop: '10%',
        paddingBottom: 10,
        width: '100%',
    },
    sendBtn: {
        ...btn,
        backgroundColor: colors['primary/50'], 
        borderColor: colors['primary/50'],
        textTransform: 'uppercase'
    },
}
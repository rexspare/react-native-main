import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const styles = {
    labelStyle: {
        marginTop: 3,
        textTransform: 'capitalize', marginBottom: 0, ...typography["body/small – regular"],position: "relative"
    },
    input: {
        width: '100%',
        backgroundColor: colors['gray scale/5'],
        borderRadius: 10,
        marginLeft: 0,
        marginBottom: 0,
        position: "relative",
        flex: 1,
    }
}
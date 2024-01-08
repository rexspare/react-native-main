import { colors } from "styles/theme";
import { typography } from "styles/typography";

export const style = {
    cardHeader: {
        paddingHorizontal: 7,
        borderWidth: 1,
    },
    features: {
        container: {
            justifyContent: 'center',
            width: "100%",
        },
        row: {
            height: 54,
            alignItems: "center",
            borderTopWidth: 0,
            borderColor: colors['gray scale/10'],
            paddingHorizontal: 7,
            width: "100%",
        },
        label: {
            ...typography["body/small – regular"],
            color: colors['gray scale/40'],
        },
        content: {
            ...typography["body/medium – regular"]

        }
    }
}

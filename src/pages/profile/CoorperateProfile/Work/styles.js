import { colors } from "styles/theme";
import { typography } from "styles/typography";

export const styles = {
    addButton: { 
        alignSelf: 'flex-end', marginTop: '-10%' 
    },
    headingStyle: {
        paddingHorizontal:7,
        marginLeft:8,
        marginRight:8,
        marginVertical:20,
        ...typography["body/medium – regular"],
        color: colors['gray scale/40'],
    },
    headingType: {
        ...typography["body/medium – regular"],
        color: colors['gray scale/40'],
    }
};
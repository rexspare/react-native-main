import { colors } from "styles/theme";
import { typography } from "styles/typography";

export const styles = {
    mainContainer:{
        marginTop: '5%'
    },
    inputField:{
        width: '100%',
        backgroundColor: colors['gray scale/5'],
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        textTransform: "capitalize", marginBottom: 0, ...typography["body/small – regular"],position: "relative"
    },
    asteriks:{
        color: colors ['additional/danger']
    }

}
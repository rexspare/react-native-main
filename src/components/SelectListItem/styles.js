import { colors } from "styles/theme"

export const styles = {
    mainContainer:{
        width: '100%',
        flexDirection: 'row',
        flexWrap: "wrap",
        marginTop: '5%',
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors['gray scale/10'],
        alignContent: 'space-between',
        alignItems: 'center',
    },
    textIconContainer:{
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: "5%",
    },
    checkboxContainer:{
        width: '20%',
    },
    checkbox:{
        width: 20, 
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        right: '25%'
    }
}

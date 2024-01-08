import { colors } from "styles/theme";
const btn = {
    width: "90%", 
    borderRadius: 12,
    marginTop: '5%',
    alignSelf: 'center',
}
export const styles = {
    openModalBtn:{
        ...btn,
        backgroundColor:colors['primary/50'],
        borderColor: colors['primary/50'],
    },
    contactLawyerBtn:{
        ...btn,
        backgroundColor:colors['white'],
        borderColor: colors['primary/50'],
        color: colors['primary/50']
    },
    lawyerBtnText:{
        color: colors['primary/50'],
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: "500",
        fontFamily: "Roboto"
    }
}
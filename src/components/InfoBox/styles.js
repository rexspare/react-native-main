import { colors } from "styles/theme";
import { typography } from "styles/typography";

export default styles = {
    container: {
        width:'95%',
        borderRadius:20,
        alignSelf:'center',
        paddingVertical:40,
        borderWidth:1,
        borderColor:colors["gray scale/10"],
        alignItems:'center'
    },
    heading:{ 
        ...typography["body/large – medium"],
        color:colors["gray scale/60"],
        textAlign:'center',
        marginBottom: 6
    },
    text: {
        ...typography["body/small – regular"],
        color: colors["gray scale/60"],
        textAlign:'center'
    }
}
import { typography } from "styles/typography";

export const styles = {
   touchableContainer:{
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: '5%',
      paddingTop: '5%',
   },
   text:{

      marginLeft: '5%',
      ...typography['body/medium – regular']
   }
}
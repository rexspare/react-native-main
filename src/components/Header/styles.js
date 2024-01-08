import { colors } from "styles/theme";
import {typography} from 'styles/typography'

export const styles = {
    title: {
      fontWeight: "700",
      fontSize: 18,
      marginTop: 4,
      lineHeight: 24,
      maxWidth:"75%",
      ...typography.textFontFamily
    },
    actionIconContainer : {
      height: 44, 
      justifyContent: "center", 
      alignItems: "center"
    },
    leftText: {
      fontWeight: 'bold',
      fontSize: 14,
      color: colors['primary/50'],
      ...typography.textFontFamily,
    },
  }
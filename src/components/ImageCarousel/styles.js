import { colors } from "styles/theme";
import { typography } from "styles/typography";

export const styles = {

  imageBox: {
    position:'relative'
  },
  pager: {
    position:'absolute',
    bottom:10,
    right:30,
    backgroundColor:colors["primary/50 – brand"],
    borderRadius:10,
    color:'#fff'
  },
  pagerText: {
    ...typography["body/x-small – regular"],
    color: colors["gray scale/0"],
    ...typography.textFontFamily
  }
}

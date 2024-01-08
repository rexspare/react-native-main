import { getStatusBarHeight } from "react-native-status-bar-height";
import { colors } from "styles/theme";

export const styles = {
  mainBox: {
    backgroundColor: colors['white'],
  },
  header: {
    backgroundColor: colors['white'],
    borderBottomColor: colors['gray scale/10'],
    borderBottomWidth: 1,
    marginTop: getStatusBarHeight() +  10,
  },
}
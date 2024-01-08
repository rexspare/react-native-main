import { colors } from "styles/theme";

export const styles = {
  categoryItem: {
    borderColor: colors['gray scale/5'],
    borderWidth:1,
    marginHorizontal: 16,
    marginTop: 20,
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    height:60
  },
  categoryItemText: {
    textTransform:'uppercase',
    color: colors['gray scale/90']
  },
  categoryItemIcon: {
    width:50
  }
};

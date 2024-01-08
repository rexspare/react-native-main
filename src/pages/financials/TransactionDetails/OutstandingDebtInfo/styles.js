import { colors } from "styles/theme";

export const styles = {
  rentPaymentRow: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 6,
  },
  rentAndDebtItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rentAndDebtItemIcon: {
    width: 40,
    height: 40,
  },
  rentAndDebtItemText: {
    color: colors['gray scale/90'],
    fontSize: 16,
    marginLeft: 12
  },
  rentAndDebtItemPrice: {
    color: colors['gray scale/90'],
    fontSize: 16
  },
  outstandingDebtRow: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
};

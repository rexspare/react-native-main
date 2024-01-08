import {Dimensions, StyleSheet} from 'react-native';
import { colors } from "styles/theme";
import { typography } from 'styles/typography';

const windowWidth = Dimensions.get('window').width;

export const styles = {
  bankAccountContainer: {
    marginTop: 32,
  },
  bankAccountLine: {
    width: windowWidth * 0.85,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors['gray scale/10'],
  },
  bankAccountButtonContainer: {
    alignSelf: 'center',
    paddingHorizontal: 8,
    marginTop: -15,
    backgroundColor: '#fff',
  },
  bankAccountButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
    paddingLeft: 4,
    borderRadius: 10,
  },
  bankAccountButtonIcon: {
    width: 30,
    height: 30,
  },
  bankAccountButtonText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
    textTransform: "capitalize",
  },
  dateText: {
    color: colors['gray scale/90'],
    fontSize: 12,
    marginTop: 16
  },
  amountText: {
    color: colors['gray scale/90'],
    fontSize: 32,
    marginTop: 18,
    ...typography.textFontFamily,
    fontWeight: "400",
  },
  rentPaymentRow: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: "5%",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    minWidth: "100%"
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
    fontWeight: '400',
    fontSize: 16,
    marginLeft: 12
  },
  rentAndDebtItemPrice: {
    color: colors['gray scale/90'],
    fontSize: 16,
    ...typography.textFontFamily,
    fontWeight: "500",
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
  featuresIconContainer: {borderRadius: 25, height: 40, width: 40, backgroundColor: colors['gray scale/5'], justifyContent: "center", alignItems: "center"}
};

import { colors } from "styles/theme";
import { typography } from "styles/typography"

export const style = {
  imageStyle: {
    width: '100%',
    height: 300
  },
  titleBold: {
    fontSize: 20,
    color: '#131F1E',
    fontWeight: "400",
    ...typography.textFontFamily
  },
  semiBoldTitle: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '500',
    color: colors['gray scale/40'],
    ...typography.textFontFamily
  },
  titleThinner: {
    fontWeight: '400',
    fontSize: 14,
    ...typography["body/small – regular"],
    color: colors['gray scale/30'],
  },
  subTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginRight: 10,
    ...typography["body/small – regular"],
    textTransform: "uppercase"
  },
  roundImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 20
  },
  ownerTitle: {
    marginTop: 10,
    marginLeft: 30,
    fintSize: 16,
    ...typography["body/small – regular"]
  },
  arrowRightIcon: {
    marginTop: 4,
    marginRight: 8,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors['gray scale/10'],
    borderRadius: 12,
    padding: 10,
  },
  separatorDot: {
    width: 5,
    height: 5,
    borderRadius: 100,
    backgroundColor: colors['gray scale/30'],
  },
  personaContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
  }
}
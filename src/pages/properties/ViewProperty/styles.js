import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const styles = {
  labelStyle: {
    color: '#727978',
    marginTop: 10, 
    ...typography.textFontFamily,
    ...typography.textUppercase,
  },
  titleTextStyle: {
    textTransform: 'uppercase',
    fontSize: 28,
    color: '#131F1E',
    marginBottom: 20,
  },
  unitAddress: {
    borderWidth: 1,
    paddingVertical: 5,
    borderColor: '#E7E9E9',
    borderRadius: 12,
    alignItems: 'center',
  },
  unitAddressText: {
    fontSize: 14,
    textAlign: 'center',
    marginRight: 10,
    ...typography.textFontFamily,
  },
  circle: {
    fontSize: 9,
    color: colors['gray scale/30'],
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  textTitle: {
    fontSize: 32,
    color: colors['gray scale/90'],
    lineHeight: 40,
  },
  image: {},
  textStyle: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 8,
    color: colors['gray scale/90'],
    fontSize: 16,
    fontWeight: '500',
  },
  imageStyle: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginTop: 10,
    borderColor: '#fff',
    borderWidth: 1,
    marginRight: 0,
  },
  textAddress: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: '#36796F',
  },
  whiteCardLabel: {
    ...typography['body/small – regular'],
    color: colors['gray scale/40'],
  },
  statusBox: {
    listed: {
      backgroundColor: colors['primary/50 – brand'],
      borderWidth: 1,
      borderColor: colors['grey scale/10'],
      borderRadius: 12,
      borderColor: '#fff',
    },
    vacant: {
      backgroundColor: colors['primary/brand'],
      borderWidth: 1,
      borderColor: colors['grey scale/10'],
      borderRadius: 12,
      borderColor: '#fff',
    },
    occupied: {
      backgroundColor: colors['additional/success'],
      borderWidth: 1,
      borderColor: colors['grey scale/10'],
      borderRadius: 12,
      borderColor: '#fff',
    },
    box: {
      borderWidth: 1,
      borderColor: colors['grey scale/10'],
      borderRadius: 10,
      borderColor: '#fff',
    },
    name: {
      ...typography['body/x-small – regular'],
      color: colors['gray scale/0'],
      textTransform: 'uppercase',
    },
    count: {
      fontSize: 22,
      lineHeight: 35,
      fontFamily: 'Roboto',
      color: colors['gray scale/0'],
    },
  },
  buildingManager: {
    width: '85%',
  },
  viewButton: {
    borderColor: '#83ACA6',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginVertical: '3%',
    borderRadius: 8,
    marginLeft: 10
  },
  deleteButton: {
    width: 25,
  },
  back: {
    height: 18,
    width: 18,
    position: 'absolute',
    top: 17,
    left: 14,
  },
  viewText: {
    fontSize: 12,
    color: '#36796F',
  },
  div: {
    maxWidth: '100%',
    height: 10,
    borderTop: '1px solid red',
    borderTopWidth: 1,
    borderColor: '#E7E9E9',
    minHeight: 1,
    paddingTop: 20,
  },
  searchInput: {
    paddingLeft: 25,
    fontSize: 14,
    width: '80%',
    height: 50,
  },
  managementText:{
    ...typography["body/medium – regular"],
    color: colors['gray scale/40'],
    marginTop: 10,
    marginBottom: 10,
  },
  searchContainer: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  searchImage: {
    height: 18,
    width: 18,
    position: 'absolute',
    top: 21,
    left: 14,
  },
  arrow: {
    height: 18,
    width: 18,
  },
  editImage: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 0,
    top: 26,
  },
};

import { Dimensions } from "react-native";
export const copy = {
    permissions: {
      title: 'Permission to use camera',
      message: 'We need your permission to use your camera',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancel',
    }
  }
  
  const {width, height} = Dimensions.get('window')
  export const styles={
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
      position: "absolute",
      height,
      width,
      zIndex: 100,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden'
    },
    preview: {
      flex: 1,
      minHeight: "100%",
      maxWidth: "100%",
      position: "relative",
      justifyContent: 'flex-end',
      alignItems: 'center',
      bottom: 0
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
      zIndex: 101,
      bottom: 100
    },
    btnContainer: {
     flex: 0, 
     flexDirection: 'row', 
     justifyContent: 'center' 
    }
  };
import Toast from 'react-native-toast-message';

export const comingSoon = () => Toast.show({ type: "success", text1: 'Feature Coming Soon.' })
export const formError = () => Toast.show({ type: "error", text1: 'Fill fields correctly.' })
import { Alert, Platform } from 'react-native';
import RNFS from 'react-native-fs';

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export var base64String = (arrayBuffer) => window.btoa(
  new Uint8Array(arrayBuffer)
    .reduce((data, byte) => data + String.fromCharCode(byte), '')
);

var path = Platform.OS === 'android' ?  RNFS.DocumentDirectoryPath: RNFS.TemporaryDirectoryPath;
export const writeBase64 = async (base64, filename = "sample.pdf") =>  {
  try {
      const dir =  path + filename
      const res = await RNFS.writeFile(dir, base64, 'base64')
      return Platform.OS === 'android' ? 'file://' + dir : dir
  }catch(e) {
      console.log(e)
  }

}


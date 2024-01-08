import React from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import * as mime from 'react-native-mime-types';
import Share from 'react-native-share';
import {Platform} from 'react-native';

function useShareRemoteFile() {
  const share = React.useCallback((fileUrl, headers = {}, options = {}) => {
    const type = mime.lookup(fileUrl);
    const segs = fileUrl.split('/');
    const fileName = options.fileName || segs.length && segs[segs.length - 1];
    return new Promise(async (resolve, reject) => {
      let filePath;
      let shareResp;
      try {
        const configOptions = {
          fileCache: true,
        };
        const shareOptions = {
          type,
        };
        if (Platform.OS === 'ios' && fileName) {
          configOptions.path = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
        }
        const resp = await RNFetchBlob.config(configOptions).fetch(
          'GET',
          fileUrl,
          headers
        );
        filePath = resp.path();
        if (Platform.OS === 'ios') {
          shareOptions.url = filePath;
        } else {
          const base64Data = await resp.readFile('base64');
          shareOptions.url = `data:${type};base64,${base64Data};`;
        }
        shareResp = await Share.open(shareOptions);
        resolve(shareResp);
      } catch (err) {
        reject(err);
      }
      if (filePath) {
        // remove the file from device's storage
        await RNFS.unlink(filePath);
      }
    });
  }, []);

  return share;
}

export default useShareRemoteFile;

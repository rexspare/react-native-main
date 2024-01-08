import React, { useCallback, useEffect } from 'react';
import DocumentPicker from 'react-native-document-picker';


const FileInput = ({ onSubmit, displayPicker = true, close, type =DocumentPicker.types.allFiles  }) => {

  const handleAdd = useCallback(
    async () => {
      try {
        const files = await DocumentPicker.pickMultiple({ type });
        onSubmit(files)
      } catch (e) {
        if (!DocumentPicker.isCancel(e)) {
          console.log(e);
        }
      }
      finally {
        close()
      }

    }, [onSubmit, close]
  );

  useEffect(() => {
    if(displayPicker){
      handleAdd()
    }
  }, [displayPicker]);

  return <></>
};

export default FileInput
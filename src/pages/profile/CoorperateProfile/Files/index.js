import React from 'react';
import { Dimensions } from 'react-native';
import { usePermissions, PERMISSION_SECTIONS } from 'hooks/usePermissions';
import { ReactNativeFile } from 'extract-files';
import { useFocusEffect } from '@react-navigation/core';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import { useMutation } from 'urql';
import Box from 'components/Box';
import listDocumentsQuery from 'queries/documents/documentsListQuery.gql';
import ObjectDocumentList from 'components/ObjectDocumentList';
import uploadDocumentMutation from 'queries/documents/documentUploadMutation.gql';
import useFab from 'hooks/useFab';
import FAB from 'components/FAB';

const maxHeight = Math.max(0, Dimensions.get('window').height * 0.4);
const Files = ({ data, userId, navigation }) => {
  const listRef = React.useRef();
  const [_, uploadDocument] = useMutation(uploadDocumentMutation);
  const permissions = usePermissions(PERMISSION_SECTIONS.DOCUMENTS);

  const listProps = React.useMemo(
    () => ({
      variables: { 
        userId: data?.pk, 
        isPersonal: true
      },
      query: listDocumentsQuery,
      dataExtractor: data => data?.documents,
      pause: !userId,
    }),
    [data],
  );

  const onUploadFile = React.useCallback(() => {
    const upload = async () => {
      let file;
      try {
        file = await DocumentPicker.pick({
          type: DocumentPicker.types.pdf,
        });
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('canceled');
        } else {
          console.log(err);
        }
      }
      if (!file) {
        return;
      }

      const uri =
        Platform.OS === 'android' ? file.uri : file.uri.replace('file://', '');
      const data = await RNFetchBlob.fs.readFile(uri, 'base64');
      const rnFile = {
        ...file,
        uri: uri,
        data: data,
      };
      const res = await uploadDocument({ document: rnFile, isPersonal: true });
      if (res.data?.uploadDocument?.document?.id) {
        setShowAddModal(false);
      } else {
        setDialogError(
          (res.error?.message || '').replace(
            /\[(Network Error|GraphQL)\]\s*/g,
            '',
          ),
        );
      }
    };
    upload();
  }, [uploadDocument]);

  const canAdd = true;
  const fabContext = useFab();
  const { props: fabProps } = fabContext;

  useFocusEffect(
    React.useCallback(() => {
      fabContext.setProps({
        onPress: canAdd ? onUploadFile : null,
      });
      fabContext.setVisible(canAdd);
    }, []),
  );

  return (
    <>
      <Box minHeight={Dimensions.get('window').height - maxHeight}>
        <ObjectDocumentList
          {...listProps}
          ref={listRef}
          contentContainerStyle={{ paddingBottom: 50 }}
          addBorder={true}
          marginItems={2}
          permissions={permissions}
          navigation={navigation}
        />
      </Box>
      <FAB {...fabProps} />
    </>
  );
};

export default Files;
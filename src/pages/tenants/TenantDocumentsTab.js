import React, { useMemo, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/core';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { Layout } from '@ui-kitten/components';
import { useMutation } from 'urql';
import listLeaseDocumentsQuery from 'queries/tenants/listLeaseDocuments.gql';
import uploadLeaseDocumentMutation from 'queries/tenants/uploadLeaseDocument.gql';
import useFab from 'hooks/useFab';
import ObjectDocumentList from 'components/ObjectDocumentList';
import Box from 'components/Box';
import Dialog from 'components/Dialog';
import FAB from 'components/FAB';
import { button_styles } from 'styles/button';

const TenantDocumentsTab = ({ route, navigation, ...props }) => {
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const listProps = useMemo(
    () => ({
      variables: {
        id: props?.leaseId,
      },
      query: listLeaseDocumentsQuery,
      dataExtractor: data => data?.lease?.documents,
    }),
    [props?.leaseId],
  );
  const listRef = React.useRef();

  const [uploadRes, uploadDocument] = useMutation(uploadLeaseDocumentMutation);

  const onUpload = React.useCallback(() => {
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

      if (props.isSelf) {
        return handleUploadFile(file, false);
      }
      return setUploadedFile(file);
    };
    upload();
  }, [route, uploadDocument]);

  const isFocused = useIsFocused();

  const handleUploadFile = async (file, isPrivate) => {
    try {
      const uri =
        Platform.OS === 'android' ? file.uri : file.uri.replace('file://', '');
      const data = await RNFetchBlob.fs.readFile(uri, 'base64');
      const rnFile = {
        ...file,
        uri: uri,
        data: data,
      };
      
      const res = await uploadDocument({ document: rnFile , id: props?.leaseId, isPrivate: isPrivate });

      if (res.data?.uploadLeaseDocument?.document) {
        listRef.current?.refresh?.();
      } else {
        setError(
          (res.error?.message || '').replace(
            /\[(Network Error|GraphQL)\]\s*/g,
            '',
          ),
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      setUploadedFile(null);
    }
  };

  const canAdd = true;
  const fabContext = useFab();
  const { props: fabProps } = fabContext;

  useFocusEffect(
    React.useCallback(() => {
      fabContext.setProps({
        onPress: canAdd ? onUpload : null,
      });
      fabContext.setVisible(canAdd);
    }, []),
  );

  return (
    <Box as={Layout} flex={1} pb="3" px="3" height={isFocused ? null : 0}>
      <Box flex={3}>
        <ObjectDocumentList
          {...listProps}
          ref={listRef}
          contentContainerStyle={{ paddingBottom: 60 }}
          navigation={navigation}
        />
      </Box>
      <FAB {...fabProps} disabled={uploadRes?.fetching} />
      <Dialog
        visible={!!error}
        onHide={() => setError(null)}
        title="Failed to upload document."
        content={error}
        buttons={[
          {
            children: 'OK',
            gradient: true,
            shape: 'circle',
            onPress: () => setError(null),
            hide: true,
          },
        ]}
      />
      <Dialog
        visible={!!uploadedFile && !uploadRes.fetching && !error}
        onHide={() => setUploadedFile(null)}
        styles={{ view: { padding: 18 } }}
        title="Would you like to share this document with your tenant."
        buttonsContainerStyle={style.modalButtonsContainerStyle}
        buttons={[
          {
            children: 'Yes',
            gradient: true,
            onPress: () => handleUploadFile(uploadedFile, false),
            hide: true,
            ...style.modalButtonStyleProps,
          },
          {
            children: 'No',
            gradient: true,
            onPress: () => handleUploadFile(uploadedFile, true),
            hide: true,
            ...style.modalButtonStyleProps,
            ...button_styles['bordered_clear'],
          },
        ]}
      />
    </Box>
  );
};

const style = {
  modalButtonsContainerStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 10,
    alignItems: 'center',
    padding: 0,
  },
  modalButtonStyleProps: {
    style: { marginHorizontal: 7, borderRadius: 12 },
    containerStyle: { flex: 0.72 },
  },
};

export default TenantDocumentsTab;

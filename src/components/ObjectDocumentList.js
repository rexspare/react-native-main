import React, { useState } from 'react';
import { Layout } from '@ui-kitten/components';
import Box from './Box';
import { Linking } from 'react-native';
import InfiniteFlatList from './InfiniteFlatList';
import renameDocumentMutation from 'queries/documents/renameDocument.gql';
import removeDocumentMutation from 'queries/documents/removeDocument.gql';
import { useMutation } from 'urql';
import Text from './Text';
import DocumentItem from './DocumentItem';
import { DOCUMENT_TYPE } from 'constants/enums';
import Dialog from './Dialog';
import Input from './Input';
import BottomHalfContextMenu from 'components/ContextMenu/BottomHalfContextMenu';
import { useFocusEffect } from '@react-navigation/native';
import useShareRemoteFile from 'hooks/useShareRemoteFile';
import { _getSections, renderSectionHeader } from 'helpers/list';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

let ObjectDocumentList = (props, ref) => {
  const [showNameDialog, setShowNameDialog] = React.useState(false);
  const [dialogError, setDialogError] = React.useState(null);
  const [sections, setSections] = useState([]);
  const [newName, setNewName] = React.useState('');
  const [moreDialog, setMoreDialog] = React.useState(null);
  const shareRemoteFile = useShareRemoteFile();
  const backupRef = React.useRef();
  const listRef = ref || backupRef;

  React.useEffect(() => {
    if (showNameDialog?.type !== 'move') {
      setNewName(showNameDialog?.name ?? '');
    } else {
      setNewName(null);
    }
    setDialogError(null);
  }, [showNameDialog]);

  const [renameDocumentRes, renameDocument] = useMutation(
    renameDocumentMutation,
  );
  const [removeDocumentRes, removeDocument] = useMutation(
    removeDocumentMutation,
  );

  const onRefresh = React.useCallback(() => {
    listRef.current?.refresh?.();
  }, [listRef]);

  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const navigateFolder = React.useCallback(
    (folderId, folderName) =>
      props?.navigation.navigate({
        name: 'ListDocuments',
        params: {
          ...({}),
          folderId,
          folderName,
          onRefresh,
        },
        key: `Folder${folderId}`,
      }),
    [props?.navigation, onRefresh],
  );

  const onOpenFile = React.useCallback(
    item => {
      if (item.itemType === DOCUMENT_TYPE.FOLDER) {
        navigateFolder(item.id, item.name);
      } else {
        Linking.openURL(item.url);
      }
    },
    [navigateFolder],
  );

  const onNameDialogSubmit = React.useCallback(() => {
    const submit = async () => {
      let success = true;
      const setError = error => {
        setDialogError(
          (error?.message || '').replace(/\[(Network Error|GraphQL)\]\s*/g, ''),
        );
        success = false;
      };
      if (showNameDialog?.type === 'rename') {
        const res = await renameDocument({
          id: showNameDialog?.id,
          name: newName,
        });
        if (res.data?.renameDocument?.document?.id) {
          onRefresh();
        } else {
          setError(res.error);
        }
      } else if (showNameDialog?.type === 'remove') {
        const res = await removeDocument({
          id: showNameDialog?.id,
          ignoreFullFolder: dialogError === 'Folder contains items',
        });
        if (res.data?.removeDocument?.success) {
          onRefresh();
        } else {
          setError(res.error);
        }
      }
      if (success) {
        setShowNameDialog(null);
      }
    };
    submit();
  }, [
    dialogError,
    newName,
    onRefresh,
    removeDocument,
    renameDocument,
    showNameDialog,
  ]);

  const onShare = React.useCallback(
    file => {
      const share = async () => {
        const shareResp = await shareRemoteFile(file.url);
        // console.log(shareResp);
      };
      share();
    },
    [shareRemoteFile],
  );

  const dialogObjectName =
    showNameDialog?.itemType === DOCUMENT_TYPE.FOLDER ? 'Folder' : 'Document';

  const moreOptions = React.useMemo(() => {
    return [
      {
        label: 'Open',
        key: 'open',
        icon: 'add_archive',
        onPress: () => {
          onOpenFile(moreDialog);
          setMoreDialog(false);
        },
      },
      moreDialog?.itemType === DOCUMENT_TYPE.FILE
        ? {
          label: 'Share',
          key: 'share',
          onPress: () => onShare(moreDialog),
          icon: 'share',
        }
        : null,
      moreDialog?.itemType === DOCUMENT_TYPE.FILE
        ? {
          label: 'Send via DocuSign',
          key: 'send',
          icon: 'send',
        }
        : null,
      {
        label: 'Rename',
        key: 'rename',
        icon: 'edit_icon',
        onPress: () => {
          const item = { ...moreDialog };
          setMoreDialog(false);
          setTimeout(() => setShowNameDialog({ ...item, type: 'rename' }), 500);
        },
      },
      {
        label: 'Remove',
        key: 'remove',
        icon: 'remove',
        onPress: () => {
          const item = { ...moreDialog };
          setMoreDialog(false);
          setTimeout(() => setShowNameDialog({ ...item, type: 'remove' }), 500);
        },
      },
    ].filter(o => !!o);
  }, [moreDialog, onOpenFile, onShare]);

  const _getSections = data => {
    const documents = {};
    data?.map(({ node: { ['itemType']: itemType } }) => {
      documents[itemType] = itemType;
    });
    return Object.keys(documents).sort((a, b) => a.localeCompare(b));
  };

  const getSections = _data => {
    const sections = _getSections(_data?.documents?.edges);
    return setSections((prevState) => {
      if (prevState.some(r => sections.indexOf(r) >= 0)) {
        return prevState;
      } else {
        return [...prevState, ...sections];
      }
    });
  };

  return (
    <Box as={Layout} flex={1} position="relative">
      <InfiniteFlatList
        ref={listRef}
        ListEmptyComponent={
          <Box style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: '10%',
            borderWidth: 1,
            borderRadius: 20,
            borderColor: colors['gray scale/10'],

          }}>
            <Text py={3} textAlign="center" style={[typography['body/large – medium']]}>
              No Files Added
            </Text>
            <Text py={3} px={'20%'} textAlign="center" style={[{ color: colors['gray scale/60'] }, typography['body/small – normal']]}>
              Please use the + button below
              to add your personal files
            </Text>
          </Box>
        }
        dataExtractor={data => data.documents}
        keyExtractor={item => item.id}
        onResCallback={res => getSections(res?.data)}
        refresh
        renderItem={({ item }) => (
          <Box style={{ paddingHorizontal: 5 }}>
            <DocumentItem
              name={item?.name}
              type={item.itemType}
              isPrivate={item.isPrivate}
              addBorder={props?.addBorder}
              isTenant={props?.variables?.isTenant}
              onMore={() => setMoreDialog(item)}
              onPress={() => onOpenFile(item)}
              permissions={props?.permissions}
              my={props?.marginItems}
            />
          </Box>
        )}
        {...props}
      />
      <Dialog
        visible={!!showNameDialog}
        onHide={() => setShowNameDialog(false)}
        title={
          showNameDialog?.type === 'rename'
            ? `Rename ${dialogObjectName}`
            : `Remove ${dialogObjectName}`
        }
        buttons={[
          {
            shape: 'circle',
            gradient: true,
            children: showNameDialog?.type === 'remove' ? 'Remove' : 'Save',
            disabled:
              (!newName?.length &&
                (showNameDialog?.type === 'create' ||
                  showNameDialog?.type === 'rename')) ||
              renameDocumentRes.fetching ||
              removeDocumentRes.fetching,
            onPress: onNameDialogSubmit,
          },
        ]}>
        {dialogError ? (
          <Text status="danger" category="c1" mb="2">
            {dialogError}
            {dialogError === 'Folder contains items'
              ? '.\nEnsure you want to remove the folder and all of its content, and press Remove again.'
              : null}
          </Text>
        ) : null}
        {showNameDialog?.type === 'remove' ? (
          <Text>
            This {dialogObjectName.toLowerCase()} will be removed from the
            system.
          </Text>
        ) : (
          <Input
            placeholder="Enter Name"
            value={newName}
            onChangeText={setNewName}
            textStyle={{ width: 200 }}
            autoFocus
            selectTextOnFocus
            onSubmitEditing={newName?.length ? onNameDialogSubmit : null}
          />
        )}
      </Dialog>
      <BottomHalfContextMenu
        menuItems={moreOptions}
        visible={!!moreDialog}
        onHide={() => setMoreDialog(null)}
        title="CHOOSE AN OPTION"
      />
    </Box>
  );
};

ObjectDocumentList = React.forwardRef(ObjectDocumentList);

export default ObjectDocumentList;
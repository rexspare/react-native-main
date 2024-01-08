import React, { useState, useEffect } from 'react';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import { Layout } from '@ui-kitten/components';
import Box from 'components/Box';
import DocumentList from 'components/DocumentList';
import MultiTextSwitch from 'components/MultiTextSwitch';
import { useTabs } from 'hooks/useTabs';
import Divider from 'components/Divider';
import { colors } from 'styles/theme';

const tabs = [{ DocumentsList: DocumentList }, { DocumentsList: DocumentList }];

const ListDocuments = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [template, setTemplate] = useState('documents');
  const { DocumentsList, setActiveTabIndex } = useTabs(tabs);

  useEffect(() => {
    const route = activeTab === 0 ? 'documents' : 'templates';
    setTemplate(route);
    setActiveTabIndex(activeTab);
  }, [activeTab]);


  return (
    <Box as={Layout} flex={1}>
      <Box as={SafeAreaView} flex={1} forceInset={{ top: 'always' }}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
          ]}
          alignment="center"
          title={route.params?.folderName}
        />
        <MultiTextSwitch
          shape="circle"
          size="small"
          options={[
            { text: 'MY DOCUMENTS', value: 'active', flex: 1 },
            { text: 'TEMPLATES', value: 'archived', flex: 1 },
          ]}
          onSelect={(_, i) => setActiveTab(i)}
          style={{
            width: '91%',
            marginHorizontal: '4.5%',
          }}
        />
        <Divider
          height={'1px'}
          backgroundColor={colors['gray scale/10']}
          mt={10}
        />
        {activeTab == 0 ?
          <DocumentsList
            type={template} />
          :
          <DocumentsList
            type={template} />
        }
      </Box>
    </Box>
  );
};

export default ListDocuments;

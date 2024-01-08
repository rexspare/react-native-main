import React, { useEffect, useState } from 'react';
import DocumentList from 'components/DocumentList';
import { PERMISSION_SECTIONS, usePermissions } from 'hooks/usePermissions';
import { useTabs } from 'hooks/useTabs';

const tabs = [{ DocumentsList: DocumentList }, { DocumentsList: DocumentList }];

const DocumentsTabs = ({ navigation, activeTab = 0 }) => {
  const [refreshOnFocus, setRefreshOnFocus] = useState(null);
  const [template, setTemplate] = useState('documents');
  const { DocumentsList, setActiveTabIndex } = useTabs(tabs);
  const permissions = usePermissions(PERMISSION_SECTIONS.DOCUMENTS);

  useEffect(() => {
    const route = activeTab === 0 ? 'documents' : 'templates';
    setTemplate(route);
    setActiveTabIndex(activeTab);
  }, [activeTab]);

  return (
    <>
      <DocumentsList
        navigation={navigation}
        refreshOnFocus={refreshOnFocus}
        setRefreshOnFocus={setRefreshOnFocus}
        permissions={permissions}
        type={template}
      />
    </>
  );
};

export default DocumentsTabs;

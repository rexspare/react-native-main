import React, { useState } from 'react';
import useNotifications from 'hooks/useNotifications';
import Header from 'components/Header';
import MultiTextSwitch from 'components/MultiTextSwitch';
import ScrollHeader from 'components/ScrollHeader';
import DocumentsTabs from './DocumentsTabs';

const RootDocumentList = ({ navigation }) => {
  const { unreadCount } = useNotifications();
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = React.useState(null);

  const changeActiveTab = i => {
    setActiveTab(i);
  };

  const onSearch = React.useCallback(val => {
    setSearch(val);
  }, []);

  const navBarProps = React.useMemo(
    () => ({
      alignment: 'center',
      actions: [
        {
          icon: 'menu',
          left: true,
          onPress: () => navigation.openDrawer(),
        },
        {
          icon: 'filter',
          pack: 'pm',
        },
        {
          icon: 'bell',
          pack: 'pm',
          onPress: () => navigation.navigate('Notifications'),
          badge: Math.min(unreadCount ?? 0, 99),
        },
      ],
      headerIcon: true,
      divider: true,
    }),
    [unreadCount],
  );

  const renderContent = React.useCallback(() => {
    return <DocumentsTabs activeTab={activeTab} />;
  }, [activeTab]);

  return (
    <ScrollHeader
      navBarProps={navBarProps}
      renderContent={renderContent}
      backgroundImage={require('img/documents-bg.png')}
      contentContainerStyle={{ paddingTop: 40 }}
      innerContainerStyle={{ marginTop: 240 }}
      imageContent={
        <>
          <Header
            width={0.95}
            alignSelf="center"
            alignment="center"
            transparent
            search="Search"
            onSearch={onSearch}
            searchValue={search}
            style={{ martinTop: 8 }}
          />
          <MultiTextSwitch
            shape="circle"
            size="small"
            options={[
              { text: 'MY DOCUMENTS', value: 'active', flex: 1 },
              { text: 'TEMPLATES', value: 'archived', flex: 1 },
            ]}
            onSelect={(_, i) => changeActiveTab(i)}
            style={{
              width: '91%',
              marginHorizontal: '4.5%',
              marginVertical: 15,
            }}
          />
        </>
      }
    />
  );
};

export default RootDocumentList;

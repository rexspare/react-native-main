import React, { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components';
import Box from 'components/Box';
import Text from 'components/Text';
import listNotificationsQuery from 'queries/notifications/listNotifications.gql';
import InfiniteFlatList from 'components/InfiniteFlatList';
import NotificationCard from 'components/NotificationCard';
import useNotifications from 'hooks/useNotifications';
import { useGetListProps } from 'hooks/useGetListProps';
import {
  _getSections,
  renderSectionHeader,
  sectionExtractor,
} from 'helpers/list';
import { styles } from 'components/ActivityFeed/styles';

const Notifications = () => {
  const { unreadCount, readNotifications } = useNotifications();
  const [sections, setSections] = useState([]);
  const listRef = React.useRef();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      const refreshAndRead = async () => {
        await listRef.current.refresh();
        if (unreadCount) {
          readNotifications();
        }
      };
      refreshAndRead();
    }
  }, [isFocused, readNotifications, unreadCount]);

  const getSections = _data => {
    const sections = _getSections(
      _data?.notifications?.edges,
      'createdAt',
      'dd MMMM yyyy',
    );
    return setSections(sections);
  };

  const listProps = useGetListProps(
    {
      keyExtractor: item => item.id,
      dataExtractor: data => data.notifications,
      onResCallback: res => getSections(res?.data),
      sections,
      renderItem: ({ item }) => <NotificationCard {...item} />,
      sectionExtractor: item =>
        sectionExtractor({ date: item?.createdAt, df: 'dd MMMM yyyy' }),
      renderSectionHeader: section =>
        renderSectionHeader(section, styles.sectionHeaderText),
    },
    [sections, sections.length],
  );

  return (
    <Box flex={1} as={Layout}>
      <InfiniteFlatList
        query={listNotificationsQuery}
        ref={listRef}
        {...listProps}
        ListEmptyComponent={
          <Text category="h6" py={3} textAlign="center" appearance="hint">
            No Notifications
          </Text>
        }
      />
    </Box>
  );
};

export default Notifications;

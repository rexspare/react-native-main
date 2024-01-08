import React, { useRef, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import activityFeedQuery from 'queries/activity/ActivityFeed.gql';
import { useGetListProps } from 'hooks/useGetListProps';
import { useIsOpen } from 'hooks/useIsOpen';
import { useKeyboardEffect } from 'hooks/useKeyboardEffect';
import { renderSectionHeader as _renderSectionHeader } from 'pages/tasks/TaskList';
import Box from 'components/Box';
import InfiniteFlatList from 'components/InfiniteFlatList';
import Text from 'components/Text';
import ActivityFeedItem from './ActivityFeedItem';
import CommentBox from './CommentBox';
import { t } from 'helpers/react';
import {
  sectionExtractor,
  _getSections,
  renderSectionHeader,
} from '../../helpers/list';
import { styles } from './styles';

const ActivityFeed = ({
  feedId,
  listProps: _listProps,
  onLinkPress,
  keyboardPadding = true,
  comments = true,
  limit = 18,
  contentContainerStyle = { justifyContent: 'space-between', height: '100%' },
}) => {
  const [scrollRef, setScrollRef] = useState(null);
  const [sections, setSections] = useState([]);
  const nav = useNavigation();
  const listRef = useRef();

  const {
    isOpen: keyboardIsOpen,
    open: setKeyboardIsOpen,
    close: setKeyboardIsClosed,
  } = useIsOpen();

  useKeyboardEffect({
    onIsOpen: setKeyboardIsOpen,
    onIsClosed: setKeyboardIsClosed,
  });

  const listProps = useGetListProps(
    {
      dataKey: 'activities',
      renderItem: ({ item }) => (
        <ActivityFeedItem item={item} nav={nav} onLinkPress={onLinkPress} />
      ),
      variables: { feedId },
      limit: limit,
      onResCallback: res => getSections(res?.data),
      sections,
      sectionExtractor: item =>
        sectionExtractor({ date: item?.createdAt, df: 'MMMM dd yyyy' }),
      renderSectionHeader: section =>
        renderSectionHeader(section, styles.sectionHeaderText),
      ..._listProps,
    },
    [sections, sections.length, _listProps],
  );

  const getSections = _data => {
    const sections = _getSections(
      _data?.activities?.edges,
      'createdAt',
      'MMMM dd yyyy',
    );
    return setSections(sections);
  };

  return (
    <>
      <KeyboardAwareScrollView
        innerRef={ref => setScrollRef(ref)}
        behavior="position"
        onContentSizeChange={() =>
          keyboardIsOpen && scrollRef.scrollToEnd({ animated: true })
        }
        contentContainerStyle={contentContainerStyle}>
        <Box flex={1}>
          <InfiniteFlatList
            query={activityFeedQuery}
            ref={listRef}
            {...listProps}
            ListEmptyComponent={
              <Text category="h6" textAlign="center" appearance="hint">
                NO ACTIVITY
              </Text>
            }
          />
        </Box>
        {t(
          comments,
          <Box
            height={60}
            marginBottom={keyboardPadding && keyboardIsOpen ? 36 : 0}
            alignSelf={'flex-end'}>
            <CommentBox
              feedId={feedId}
              refreshFeed={() => listRef?.current?.refresh()}
            />
          </Box>,
        )}
      </KeyboardAwareScrollView>
    </>
  );
};

export default ActivityFeed;

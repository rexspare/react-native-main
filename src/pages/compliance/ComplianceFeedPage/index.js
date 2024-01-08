import React, { useCallback, useEffect, useState } from 'react';
import { isToday, isYesterday } from 'date-fns';
import useFilter from 'hooks/useFilter';
import ComplianceFeedCard from 'pages/compliance/ComplianceFeedCard';
import Box from 'components/Box';
import InfiniteFlatList from 'components/InfiniteFlatList';
import Text from 'components/Text';
import MultiTextSwitch from 'components/MultiTextSwitch';
import Divider from 'components/Divider';
import {
  _getSections,
  renderSectionHeader,
  sectionExtractor,
} from 'helpers/list';
import { COMPLIANCE_FEED_SWITCH_OPTIONS } from '../const';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const ComplianceFeedPage = ({ query, navigation, route, ...props }) => {
  const [filter] = useFilter('compliance');
  const [textWidth, setTextWidth] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const [sections, setSections] = useState([]);

  const { dataExtractor, keyExtractor } = React.useMemo(() => {
    return {
      dataExtractor: data => data.feed,
      keyExtractor: data => data.id,
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTextWidth({
        maxWidth: '15%',
        width: '100%',
        marginLeft: '15%',
      });
    } else {
      setTextWidth({
        maxWidth: '17%',
        width: '100%',
        marginLeft: '17%',
      });
    }
  }, [isOpen]);

  const renderComplianceFeedCard = useCallback(
    ({
      item: {
        issueDate,
        idInSupplier,
        building: { displayName, photos, ...a },
        unit,
        source,
        ...item
      },
    }) => (
      <Box flex={1}>
        <ComplianceFeedCard
          {...item}
          type={source}
          navigation={navigation}
          buildingPhoto={photos[0]}
          location={displayName}
          issueDate={issueDate}
          supplierId={idInSupplier}
          id={item.id}
          unit={unit}
        />
      </Box>
    ),
    [navigation],
  );

  const getSections = _data => {
    const sections = _getSections(
      _data?.feed?.edges,
      'issueDate',
      'MMMM dd yyyy',
    );
    return setSections(sections);
  };

  return (
    <Box flex={1} backgroundColor={'#fff'}>
      <Box pb={20} width={'60%'} alignSelf={'center'} justifyContent='center'>
        <MultiTextSwitch
          options={COMPLIANCE_FEED_SWITCH_OPTIONS}
          onSelect={({ value }) => setIsOpen(value)}
          value={isOpen ? 0 : 1}
          style={{
            marginTop: 10,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            borderWidth: 0,
            switchBackground: {
              elevation: 0,
              shadowColor: 'transparent',
              backgroundColor: 'transparent',
              borderBottomWidth: 2,
              borderRadius: 0,
              borderBottomColor: colors['primary/50 – brand'],
              ...textWidth,
            },
            activeTextColor: colors['gray scale/90'],
          }}
          textColor={{ color: colors['primary/50 – brand'] }}
        />
      </Box>
      <Divider mb={0} />
      <Box flex={1} backgroundColor={'#fff'}>
        <InfiniteFlatList
          added={true}
          query={query}
          variables={{ isOpen, ...filter.compliance }}
          dataExtractor={dataExtractor}
          keyExtractor={keyExtractor}
          renderItem={renderComplianceFeedCard}
          sections={sections}
          sectionExtractor={item =>
            sectionExtractor({
              date: item?.issueDate,
              df: 'MMMM dd yyyy',
            })
          }
          onResCallback={res => getSections(res?.data)}
          renderSectionHeader={section => {
            const renderSection = {
              section: {
                ...section?.section,
                title: isToday(new Date(section?.section.title))
                  ? 'Today'
                  : isYesterday(new Date(section?.section.title))
                  ? 'Yesterday'
                  : section?.section?.title,
              },
            };
            return renderSectionHeader(renderSection, {
              textTransform: 'uppercase',
              color: colors['gray scale/40'],
              ...typography['body/medium – medium'],
              paddingLeft: 10,
            });
          }}
          contentContainerStyle={{ backgroundColor: '#fff' }}
          ListEmptyComponent={
            <Text category="h6" py={3} textAlign="center" appearance="hint">
              No {route?.name} Found
            </Text>
          }
        />
      </Box>
    </Box>
  );
};

export default ComplianceFeedPage;

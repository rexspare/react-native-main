import React from 'react';
import { FlatList } from 'react-native';
import Box from './Box';
import Text from './Text';
import TouchableText from './TouchableText';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const ScrollableYearCalendar = ({ onSelect, markedDates, minDate = 30 }) => {
  const currentYear = new Date().getFullYear();
  const lastYears = [];

  for (let i = currentYear; i > currentYear - minDate; i--) {
    lastYears.push(i);
  }

  const renderYear = (year, stringDate, isFirst, isLast) => {
    return (
      <Box
        width={64}
        minHeight={64}
        justifyContent="center"
        style={{
          flexDirection: 'column',
          backgroundColor:
            isFirst || isLast ? colors['primary/50 – brand'] : 'transparent',
          borderRadius: isFirst || isLast ? 100 : 0,
        }}>
        <Text
          as={TouchableText}
          onPress={() => onSelect(stringDate)}
          style={{
            textAlign: 'center',
            ...typography['body/x-small – regular'],
            color:
              isFirst || isLast
                ? colors['gray scale/0']
                : colors['gray scale/90'],
          }}>
          {year}
        </Text>
      </Box>
    );
  };

  return (
    <FlatList
      contentContainerStyle={{
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'row-reverse',
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={lastYears}
      inverted={true}
      keyExtractor={item => item}
      renderItem={({ item }) => {
        const yearString = `${item}`;
        const isSelected = !!markedDates?.[yearString];
        const isFirst = !!markedDates?.[yearString]?.startingDay;
        const isLast = !!markedDates?.[yearString]?.endingDay;

        return (
          <Box
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between">
            <Box
              mt={'8px'}
              style={{
                borderTopLeftRadius: isFirst ? 100 : 0,
                borderBottomLeftRadius: isFirst ? 100 : 0,
                borderBottomRightRadius: isLast ? 100 : 0,
                borderTopRightRadius: isLast ? 100 : 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isSelected
                  ? colors['primary/5']
                  : 'transparent',
              }}>
              {isFirst || isLast || isSelected ? (
                <Box
                  style={{
                    borderRadius: 100,
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  colors={[
                    Object.keys(markedDates).length > 1
                      ? colors['primary/5']
                      : colors['gray scale/0'],
                    colors['gray scale/0'],
                  ]}>
                  {renderYear(item, yearString, isFirst, isLast)}
                </Box>
              ) : (
                renderYear(item, yearString, isFirst, isLast)
              )}
            </Box>
          </Box>
        );
      }}
    />
  );
};

export default ScrollableYearCalendar;

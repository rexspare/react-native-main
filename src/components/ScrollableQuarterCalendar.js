import React from 'react';
import { FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Box from './Box';
import Text from './Text';
import TouchableText from './TouchableText';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const quarter = [
  {
    name: 'Quarter 1',
    number: '01',
    key: 1,
  },
  {
    name: 'Quarter 2',
    number: '02',
    key: 2,
  },
  {
    name: 'Quarter 3',
    number: '03',
    key: 3,
  },
  {
    name: 'Quarter 4',
    number: '04',
    key: 4,
  },
];

const ScrollableQuarterCalendar = ({
  onSelect,
  markedDates,
  minDate = 10,
  isSeparate,
}) => {
  const currentYear = new Date().getFullYear();
  const lastYears = [];

  for (let i = currentYear; i > currentYear - minDate; i--) {
    lastYears.push(i);
  }

  const renderQuarter = (i, stringDate, isFirst, isLast) => {
    return (
      <Box
        width={64}
        minHeight={64}
        justifyContent="center"
        style={{
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
          {i.name}
        </Text>
      </Box>
    );
  };

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={lastYears}
      inverted={true}
      keyExtractor={item => item}
      renderItem={({ item }) => {
        return (
          <Box mt={30}>
            <Text
              style={{
                ...typography['heading-medium'],
                color: colors['gray scale/40'],
              }}>
              {item}
            </Text>
            <Box
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-between">
              {quarter.map(i => {
                const stringDate = `${item}-${i.number}`;
                const isSelected = !!markedDates?.[stringDate];
                const isFirst = !!markedDates?.[stringDate]?.startingDay;
                const isLast = !!markedDates?.[stringDate]?.endingDay;

                return (
                  <Box
                    key={i.number}
                    mt={'8px'}
                    style={{
                      minWidth: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: isSelected
                        ? colors['primary/5']
                        : 'transparent',
                    }}>
                    {isFirst ||
                    isLast ||
                    (isSelected && (i.key % 4 === 0 || i.key % 4 === 1)) ? (
                      <LinearGradient
                        style={{
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
                        ]}
                        start={{
                          x: isSeparate
                            ? 0
                            : isFirst || i.key % 4 === 1
                            ? 1
                            : isLast
                            ? 0
                            : 0,
                          y: 0,
                        }}
                        end={{
                          x: isSeparate
                            ? 0
                            : isFirst
                            ? 0
                            : isLast || i.key % 4 === 0
                            ? 1
                            : 0,
                          y: 0,
                        }}>
                        {renderQuarter(i, stringDate, isFirst, isLast)}
                      </LinearGradient>
                    ) : (
                      renderQuarter(i, stringDate, isFirst, isLast)
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      }}></FlatList>
  );
};

export default ScrollableQuarterCalendar;

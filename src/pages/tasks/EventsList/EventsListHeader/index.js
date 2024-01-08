import React from 'react';
import Button from 'components/Button';
import Calendar from 'components/Calendar';
import Icon from 'components/Icon';
import Box from 'components/Box';
import Text from 'components/Text';

import format from 'date-fns/format';
import useTheme from 'hooks/useTheme';

const EventsListHeader = ({ date, setDate, setVisibleRange, occupiedRes, onRefresh, navigation }) => {
  const [showWeek, setShowWeek] = React.useState(false);

  const theme = useTheme();

  const header = React.useMemo(() => {
    return (
      <Box flexDirection="row">
        <Text category="h6" color={theme['grey-400']}>
          {format(date, 'EEEE')}
        </Text>
        <Text category="h6" color={theme['grey-100']} mx="2">
          {format(date, 'MM/dd')}
        </Text>
      </Box>
    );
  }, [date, theme]);

  const calButton = React.useMemo(
    () => (
      <Button
        key={0}
        appearance="ghost"
        shape="circle"
        status={showWeek ? 'basic' : 'primary'}
        onPress={() => setShowWeek(show => !show)}
        icon={s =>
          Icon(showWeek ? 'calendar_primary' : 'calendar', "pm")({
            ...s,
            style: {
              marginHorizontal: 0,
              paddingHorizontal: 12,
            },
          })
        }
      />
    ),
    [showWeek],
  );

  return (
    <>
      <Box mx= {3} mb="2">
        <Box>
          <Calendar
            date={date}
            onSelect={setDate}
            extraActions={[calButton]}
            boundingMonth={false}
            showWeek={showWeek}
            onViewChanged={dates =>
              setVisibleRange([dates[0], dates[dates.length - 1]])
            }
            occupied={(occupiedRes.data?.occupiedDates ?? []).map(
              d => new Date(d),
            )}
          />
        </Box>
      </Box>
    </>

  )
}

export default EventsListHeader
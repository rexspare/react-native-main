import React from 'react';

import getOccupiedDatesQuery from 'queries/tasks/getOccupiedDates.gql';
import listEventsQuery from 'queries/tasks/listEvents.gql';

import { useQuery } from 'urql';
import InfiniteFlatList from 'components/InfiniteFlatList';
import EventsListHeader from './EventsListHeader';
import EventsListItem from './EventsListItem';
import { useGetListProps } from 'hooks/useGetListProps';
import useTheme from 'hooks/useTheme';
import { stringifyEnumValue, TASK_TYPES } from 'constants/enums';
import { floorDate } from 'helpers/date';

const EventsList = ({ navigation }) => {
    const [date, setDate] = React.useState(new Date());
    const [visibleRange, setVisibleRange] = React.useState(null);
    const listRef = React.useRef();
    const theme = useTheme();

    const onRefreshOccupied = React.useCallback(() => {
        return getOccupiedDates({ requestPolicy: 'network-only' });
    }, [getOccupiedDates]);

    const onRefresh = React.useCallback(() => {
        onRefreshOccupied();
        listRef.current?.refresh?.();
    }, [onRefreshOccupied]);

    const listVariables = React.useMemo(() => {
        const start = new Date(date);
        floorDate(start)
        const end = new Date(start);
        end.setDate(end.getDate() + 1);
        end.setMilliseconds(-1);
        return {
            start,
            end,
        };
    }, [date]);

    const listProps = useGetListProps({
        dataKey: 'eventOccurrences', 
        variables: listVariables, 
        renderItem: ({ item: { event, taskEvent } }) => (
            <EventsListItem 
                event={event || taskEvent} 
                onRefresh={onRefresh} 
                navigation={navigation}  
                subject={event ? event?.title : taskEvent?.taskType && stringifyEnumValue(TASK_TYPES, taskEvent?.taskType)?.toUpperCase()}
                themeColor={theme[event ? 'color-primary-500' : "color-primary2-500"]}
                onPress={() => event ? navigation.navigate("ViewEvent", { id: event.id, onRefresh }) : navigation.navigate("ViewTask", { id: taskEvent.id, onUpdate: onRefresh })} />)
    })
    
    const [occupiedRes, getOccupiedDates] = useQuery(
        React.useMemo(
            () => ({
                query: getOccupiedDatesQuery,
                variables: {
                    start: visibleRange?.[0],
                    end: visibleRange?.[1],
                },
                pause: !visibleRange?.length,
            }),
            [visibleRange],
        ),
    );

    return (

        <InfiniteFlatList
            contentContainerStyle={{ paddingBottom: 80 }}
            ListHeaderComponent={<EventsListHeader date={date} setDate={setDate} setVisibleRange={setVisibleRange} occupiedRes={occupiedRes} onRefresh={onRefresh} navigation={navigation} />}
            query={listEventsQuery}
            variables={listVariables}
            {...listProps}
            onRefresh={onRefreshOccupied}
            ref={listRef}
        />
    )
}

export default EventsList
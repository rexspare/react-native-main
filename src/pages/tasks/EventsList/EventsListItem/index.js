import React, { useMemo } from 'react'
import {TouchableOpacity} from "react-native";
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import Box from 'components/Box';
import { format } from 'helpers/date';
import { styles } from './styles';
import StyledLine from 'components/StyledLine';
import { colors } from 'styles/theme';
import { View } from 'react-native';
import { typography } from 'styles/typography';

const timeFormat = 'KK:mm a';
const EventsListItem = ({ event, subject = "Task 6 category", themeColor, onPress }) => {
    const theme = useTheme();
    const [startString, endString] = useGetTimes(event);
    return (
        <Box as={TouchableOpacity} onPress={onPress} alignSelf={"center"} marginTop={1} width={"90%"} alignItems={"center"}>
            <Box
                flexDirection="row"
                alignItems="center"
                my="2"
                mx="3"
                px="3"
                py="3"
                width={"100%"}
                maxWidth={"100%"}
                style={{ borderWidth: 1, borderRadius: 10, borderColor: colors["gray scale/10"] }}>
                <Box
                    as={View}
                    width={4}
                    height="80%"
                    style={{ backgroundColor: themeColor, borderRadius: 8 }}
                />
                <Box mx={3}>
                    <Text style={{ ...typography['body/medium – medium'], color: colors['gray scale/90'], textTransform: "uppercase" }}>
                        {event.title}
                    </Text>
                    <Text style={{ ...typography['body/small – regular'], color: colors['gray scale/40'], textTransform: "uppercase" }}>
                        {event.location || (event.building
                            ? `${event.building.displayName}${event.unit ? ` / UNIT ${event.unit.unitNumber}` : ''
                            }`
                            : null)}
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}

export const calcDate = (date, time = '') => {
    const d = new Date(`${date}T${time}Z`);
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
    return d;
};


const useGetTimes = ({ date, allDay, startTime, endTime, due }) => useMemo(() => {
    const startString = allDay ? "All Day" : format(date ? calcDate(date, startTime) : due, timeFormat, "", { toDate: true });
    const endString = (allDay || due) ? "" : format(calcDate(date, endTime), timeFormat);
    return [startString, endString]
}, [date, allDay, startTime, endTime, due])

export default EventsListItem;
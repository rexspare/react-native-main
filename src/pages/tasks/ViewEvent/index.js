
import React, { useCallback, useMemo } from "react";
import { getActions } from "constants/actions";
import viewEventQuery from 'queries/tasks/viewEvent.gql';

import { useMutation, useQuery } from "urql";
import Text from "components/Text";
import Features from "components/Features";
import useTheme from "hooks/useTheme";
import Box from "components/Box";
import { TEXT } from "../ViewTask/ViewTaskHeaderSection";
import Button from "components/Button";
import { styles } from "./styles";
import { format } from "helpers/date";
import { EVENT_ALERTS, EVENT_REPEATS, stringifyEnumValue } from "constants/enums";
import { useIsOpen } from "hooks/useIsOpen";
import deleteEventMutation from 'queries/tasks/deleteEvent.gql';
import DeleteModal from "components/DeleteModal";
import { usaDateFormat } from "constants/dateFormat";
import { colors } from "styles/theme";
import { typography } from 'styles/typography';
import Divider from "components/Divider";
import HeadedScreen from 'components/HeadedScreen';
import FeaturesTab from 'components/ProfilePage/FeaturesTab';

const ViewEvent = ({ navigation, route }) => {
    const { isOpen, open, close } = useIsOpen()
    const eventId = route.params?.id;
    const theme = useTheme()
    const [__, deleteEvent] = useMutation(deleteEventMutation);

    const [res, executeQuery] = useQuery({
        query: viewEventQuery,
        variables: {
            id: eventId,
            pause: !eventId,
        },
        requestPolicy: 'network-only',
    });
    const event = res.data?.event;

    const handleDeleteSubtask = useCallback(async (id) => {

        const params = { input: { id } }
        return new Promise(async (resolve, rej) => {
            const res = await deleteEvent(params);
            const success = res?.data?.deleteEvent?.success

            if (res.error || !success) {
                rej(res.error || "failed to delete the subtask")
            };

            resolve(success)
            return success

        })
    })

    const features = useGetFeatures(event)

    const handleDelete = async () => {
        const success = await handleDeleteSubtask(eventId)
        close()
        if (success) return navigation.navigate("Calendar");
    }

    return (
        <HeadedScreen
            title={"Appointment Details"}
            actions={getActions(["back", { onPress: () => navigation.goBack() }], ["edit", { onPress: () => navigation.navigate("EditEvent", { id: eventId, onEdit: executeQuery }) }])}
            headerStyle={{ title: { ...typography['body/large – Bold'] } }}
            contentContainerProps={{
                backgroundColor: colors['gray scale/5'],
            }}
            divider>
            <Box justifyContent="space-between" height={"100%"}>
                <Box>
                    <Box px="4%" bg={"white"}>
                        <Box mt={3} pb={3}>
                            <TEXT style={{ ...typography['body/large – Bold'] }} color={colors['gray scale/90']}>{event?.title}</TEXT>
                            <Divider mt={3} />
                            <Features
                                theme={theme}
                                features={features}
                                styles={styles.features(theme)}
                            />
                            <Box px={1}>
                                <Text style={{ ...typography['buttons/large'], color: colors['gray scale/40'], textTransform: "uppercase" }}>Notes</Text>
                                <Text style={{ ...typography['body/medium – regular'], color: colors['gray scale/90'], marginTop: 5 }}>{event?.content}</Text>
                            </Box>
                        </Box>
                    </Box>
                    <Box mt={3} bg={"white"}>
                        <Box px={1}>
                            <FeaturesTab
                                features={[
                                    {
                                        label: 'Reminder',
                                        content: event?.endRepeat
                                    },
                                    {
                                        label: 'Building',
                                        content: event?.building?.displayName
                                    },
                                    {
                                        label: 'Unit',
                                        content: event?.unit?.unitNumber
                                    },
                                    {
                                        label: 'Address',
                                        content: event?.location
                                    },
                                ]}
                                styles={{
                                    features: {
                                        label: {
                                            ...typography["body/medium – regular"],
                                            color: colors['gray scale/40']
                                        },
                                        content: {
                                            ...typography["body/medium – regular"],
                                            color: colors['gray scale/90']
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box pt="10%" bg="white" pb={"36px"}>
                    <Button
                        size="large"
                        onPress={open}
                        style={styles.deleteButton}
                        textStyle={{ ...typography['buttons/large'], color: colors['gray scale/60'], textTransform: "uppercase" }}
                        containerStyle={styles.buttonContainer}>
                        Delete Appointment
                    </Button>
                </Box>
            </Box>
            <DeleteModal title={"Are you sure you want to delete this appointment? "} onDelete={handleDelete} visible={isOpen} onHide={close} styles={{ view: { padding: 18 }, title: { marginTop: 20, borderWidth: 1, paddingBottom: 7 } }} />
        </HeadedScreen>
    )
};

const formatTime = (time) => time.split(":").slice(0, -1).join(":");

const useGetFeatures = (event) => useMemo(() => ([
    event?.date && { label: "Date", content: format(event?.date, `EEEE, ${usaDateFormat}`, "", { toDate: true }), pack: "pm" },
    event?.startTime && { label: "Time", content: `${formatTime(event?.startTime)} - ${formatTime(event?.endTime || "")}`, pack: "pm" },
    event?.repeat && { icon: "repeat", label: "Repeats", content: stringifyEnumValue(EVENT_REPEATS, event?.repeat), pack: "pm" },
    (event?.alert && { icon: "alert", label: "Alert", content: stringifyEnumValue(EVENT_ALERTS, Math.abs(event?.alert)), pack: "pm", })
]), [event])

export default ViewEvent
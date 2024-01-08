
import * as yup from 'yup';
import {
  EVENT_REPEATS,
  EVENT_ALERTS,
  TASK_PRIORITY,
  TASK_STATUSES,
} from 'constants/enums';

export const EVENT_FORM_SCHEMA = yup.object().shape({
  title: yup
    .string()
    .label('Title'),
  location: yup
    .string()
    .label("Location"),
  content: yup.string().label('Content'),
  building: yup
    .object()
    .shape({
      id: yup.string().required(),
      displayName: yup.string(),
    })
    .nullable(true)
    .label('Building')
    .default(null),
  unit: yup
    .object()
    .shape({
      id: yup.string().required(),
      unitNumber: yup.string().max(5),
    })
    .nullable(true)
    .label('Unit').default(null),
  date: yup
    .date()
    .label('Date'),
  allDay: yup
    .boolean()
    .label('All Day')
    .default(false),
  startTime: yup
    .date()
    .label('Start Time')
    .when('allDay', (allDay, schema) => (allDay ? schema : schema))
    .when('endTime', {
      is: v => v != null,
      then: s =>
        s.max(yup.ref('endTime'), 'Start Time must be before End Time')
    }).nullable(true).default(null),
  endTime: yup
    .date()
    .label('End Time')
    .when('allDay', (allDay, schema) => (allDay ? schema : schema))
    .nullable(true).default(null),
  repeat: yup
    .number()
    .nullable()
    .label('Repeats')
    .oneOf(Object.values(EVENT_REPEATS)),
  endRepeat: yup
    .date()
    .label('Repeat End Date')
    .nullable(true),
  alert: yup
    .number()
    .label('Alert')
    .nullable()
    .oneOf(Object.values(EVENT_ALERTS)),
  assignees: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
      }),
    )
    .ensure()
    .default([])
    .label('Assignees'),
});


export const TASK_FORM_SCHEMA = yup.object().shape({
  title: yup
    .string()
    .required()
    .label('Title'),
  content: yup.string().label('Content').default(""),
  building: yup
    .object()
    .shape({
      id: yup.string().required(),
      displayName: yup.string(),
    })
    .nullable()
    .label('Building'),
  unit: yup
    .object()
    .shape({
      id: yup.string(),
      unitNumber: yup.string().max(5),
    })
    .nullable()
    .label('Unit'),
  subTasks: yup
    .array()
    .of(yup.string())
    .ensure()
    .default([])
    .label('Subtasks'),
  priority: yup
    .number()
    .oneOf(Object.values(TASK_PRIORITY))
    .label('Priority'),
  status: yup
    .number()
    .oneOf(Object.values(TASK_STATUSES))
    .label('Status'),
  reminder: yup
    .number()
    .nullable()
    .label('Reminder')
    .default(EVENT_REPEATS.NEVER)
    .oneOf(Object.values(EVENT_REPEATS)),
  endReminder: yup
    .date()
    .label('Reminder End Date')
    .nullable(),
  due: yup
    .date()
    .label('Due Date'),
  files: yup
    .array()
    .of(
      yup.object().shape({
        uri: yup.string().required(),
        type: yup.string(),
      }),
    )
    .ensure()
    .default([])
    .label('Files'),
  assignees: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
      }),
    )
    .ensure()
    .default([])
    .label('Assignees'),
  sendNotificationOnCompletion: yup.boolean().default(false).label('Notiify On Completion')
});
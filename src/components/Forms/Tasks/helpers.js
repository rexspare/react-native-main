import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { EVENT_REPEATS } from 'constants/enums';

export const taskFormRequiredFields = [
  'building',
  'title',
  'due',
  'status',
  'priority',
];

export const taskFormHelpers = {
  setInitialValues: (data, category, initialValuesSet) => {
    if (data) {
      initialValuesSet.current = false;
    }
    return data
      ? {
          ...data,
          createdAt: data.createdAt && new Date(data.createdAt),
          due: data.due && new Date(data.due),
          assignees: (data?.assignees?.edges ?? []).map(e => e.node),
          files: (data?.files ?? []).map(f => ({
            id: f.id,
            uri: f.url,
            type: f.fileType,
          })),
          reminder: data.reminder?.repeat,
          endReminder: data.reminder?.endRepeat
            ? new Date(data.reminder.endRepeat)
            : null,
          subTasks: (data?.subTasks ?? []).map(s => s.text),
        }
      : {
          reminder: EVENT_REPEATS.NEVER,
          category,
          subTasks: [],
          files: [],
          assignees: [],
        };
  },

  parseFormData: form => {
    const task = {
      ...form,
      subTasks: form.subTasks?.filter(s => s !== ''),
      assignees: form.assignees?.map(u => u.id) ?? [],
      due: form.due.toISOString(),
      category: form.category?.id,
      unit: form.unit?.id,
      building: form.building?.id,
    };
    task.files = (form.files || []).map(f => {
      if (f.id) {
        return {
          file: f.uri,
          fileType: f.type,
        };
      } else return formatImageToFileInput(f);
    });
    return task;
  },

  isSubmitSuccessful: res => !!res?.data?.upsertTask?.task?.id,
};

export const formatFileToFileInput = async f =>
  f && f.type
    ? {
        file: {
          data:
            f.data ||
            (await RNFetchBlob.fs.readFile(
              Platform.OS === 'android' ? f.uri : f.uri.replace('file://', ''),
              'base64',
            )),

          name: f.name || f?.fileName || 'file',
          type: f.type,
          data: f.data,
        },
        fileType: f.type,
      }
    : f?.uri;

export const formatImageToFileInput = f =>
  f && f.type
    ? {
        file: {
          data: f.data,
          name: f.name || f?.fileName || 'file',
          type: f.type,
          data: f.data,
        },
        fileType: f.type,
      }
    : f?.uri;

export const formatFileToBase64Input = async file => {
  if (file) {
    const uri =
      Platform.OS === 'android' ? file?.uri : file?.uri.replace('file://', '');
    const data = await RNFetchBlob.fs.readFile(uri, 'base64');
    const rnFile = {
      ...file,
      uri: uri,
      data: data,
    };

    return rnFile;
  }
};

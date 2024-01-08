import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useForm from 'react-hook-form';
import { useMutation } from 'urql';
import mutation from 'queries/manager/addManager.gql';
import { useLoader } from 'hooks/useLoader';
import { useRegisterFields } from 'hooks/useRegisterFields';
import InfoTab from 'pages/AddManagerForm/InfoTab/infoTab';
import WorkTab from 'pages/AddManagerForm/WorkTab/workTab';
import DocumentsTab from 'pages/AddManagerForm/DocumentsTab/documentsTab';
import PermissionsTab from 'pages/AddManagerForm/PermissionsTab/permissionsTab';
import {
  defaultPermissions,
  formatUserFormDataToMutation,
  schema,
} from 'pages/AddManagerForm/schema';
import HeadedScreen from 'components/HeadedScreen';
import { formatImageToFileInput } from 'components/Forms/Tasks/helpers';
import TopTab from './TopTab';
import { getActions } from 'constants/actions';
import { ADD_MEMBERS_TAB } from 'constants/enums';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const navBarProps = {
  wrapperProps: {
    as: ScrollView,
    horizontal: true,
    alignItems: null,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { alignItems: 'center' },
  },
};
const Tab = createMaterialTopTabNavigator();
const AddManagerTabs = ({ navigation, route }) => {
  const { setValue, handleSubmit, watch, register, unregister } = useForm({
    validationSchema: schema,
    defaultValues: { ...defaultPermissions },
  });
  const { loader, startLoading, stopLoading } = useLoader();
  const [res, addManagerMutation] = useMutation(mutation);
  const [activeTabIndex, setActiveTabIndex] = useState(false);
  useRegisterFields(Object.keys(schema.fields), register, unregister);
  const watching = watch([
    'picture',
    'firstName',
    'lastName',
    'emailPersonal',
    'email',
    'phoneNumberCell',
    'homeAddress',
    'docNumber',
    'docType',
    'dateOfBirth',
    'title',
    'email',
    'phoneNumberOffice',
    'officeAddress',
    'managementCompany',
    'attachments',
    'propertiesPermissions',
    'tenantsPermissions',
    'tasksPermissions',
    'profilePermissions',
    'filesPermissions',
    'messagesPermissions',
    'financialsPermissions',
  ]);

  useEffect(() => {
    const backAction = () => {
      if (activeTabIndex > 0) {
        const tab = Object.keys(ADD_MEMBERS_TAB).find(
          k => ADD_MEMBERS_TAB[k] === activeTabIndex,
        );
        navigation.navigate(tab);
        return true;
      } else {
        navigation.goBack();
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [activeTabIndex]);

  const onSubmit = useCallback(async ({ ...form }) => {
    startLoading();
    try {
      const { data, permissions } = formatUserFormDataToMutation(form);
      const attachments = form?.attachments?.map(formatImageToFileInput) || [];
      const res = await addManagerMutation({ data, attachments, permissions });

      if (res?.data?.addTeamMember?.manager?.pk) {
        Toast.show({
          type: 'success1',
          text1: 'Email sent',
          text2:
            'Once the new member completes their profile, you can find them on your unassigned team list.',
          autoHide: true,
          position: 'top',
          props: {
            buttons: [{ children: 'OK', onPress: () => Toast.hide() }],
            styles: { text1: { textTransform: 'uppercase' } },
          },
        });
        navigation.goBack();
        route?.params.onSuccess();
      } else {
        const message = res?.error?.message?.replace('[GraphQL]', '');
        Toast.show({
          type: 'error',
          text1:
            message ||
            'Something went wrong, please make sure fields are filled correctly',
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      stopLoading();
    }
  });

  return (
    <HeadedScreen
      style={{ title: { ...typography['body/large – Bold'] } }}
      title={`Add A Member`}
      actions={getActions(['back', { onPress: () => navigation.goBack() }])}
      headerStyle={{
        backgroundColor: colors['white'],
        title: { ...typography['body/large – Bold'] },
      }}>
      {loader}
      <Tab.Navigator
        swipeEnabled={activeTabIndex > 0 ? true : false}
        pager={pagerProps => <ViewPagerAdapter {...pagerProps} />}
        tabBar={tabBarProps => {
          setActiveTabIndex(tabBarProps?.state?.index);
          return (
            <TopTab
              disableOnPress={true}
              isPointTab
              {...tabBarProps}
              {...navBarProps}
            />
          );
        }}>
        <Tab.Screen
          name="InfoTab"
          key="Info"
          options={{ tabBarLabel: 'Info', index: 1 }}>
          {() => <InfoTab setValue={setValue} watching={watching} />}
        </Tab.Screen>
        <Tab.Screen
          name="WorkTab"
          key="Work"
          options={{ tabBarLabel: 'Work', index: 2 }}>
          {() => <WorkTab setValue={setValue} watching={watching} />}
        </Tab.Screen>
        <Tab.Screen
          name="DocumentsTab"
          key="Documents"
          initialParams={{ type: 'Documents' }}
          options={{ tabBarLabel: 'Documents', index: 3 }}>
          {props => (
            <DocumentsTab setValue={setValue} watching={watching} {...props} />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="PermissionsTab"
          key="Permissions"
          initialParams={{ type: 'Permissions' }}
          options={{ tabBarLabel: 'Permissions', index: 4 }}>
          {() => (
            <PermissionsTab
              setValue={setValue}
              watching={watching}
              onSubmit={handleSubmit(onSubmit)}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </HeadedScreen>
  );
};

export default AddManagerTabs;

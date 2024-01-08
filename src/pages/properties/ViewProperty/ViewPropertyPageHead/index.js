import React, { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from '@ui-kitten/components';
import { useMutation, useQuery } from 'urql';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useLoader } from 'hooks/useLoader';
import getManagementCompanyEmployees from 'queries/properties/getAllManagementUsers.gql';
import getManagementTeamByBuilding from 'queries/manager/getManagementTeamByBuildingId.gql';
import updateManagementTeam from 'queries/manager/updateManagementTeam.gql';
import removeManagerFromManagementTeam from 'queries/manager/removeManagerFromTeam.gql';
import Box from 'components/Box';
import Text from 'components/Text';
import Persona from 'components/Persona';
import CarouselCard from 'components/Cards/CarouselCard';
import Typography from 'components/Text/ThemedText';
import Dot from 'components/dot';
import TeamManagement from 'components/teamManagmentModal';
import FAB from 'components/FAB';
import Input from 'components/Input';
import CheckboxField from 'components/Forms/Fields/CheckboxField';
import Button from 'components/Button';
import { UNIT_STATUS, USER_TYPES } from 'constants/enums';
import { styles } from '../styles';

const ViewPropertyPageHead = ({ building }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [managementUsers, setManagementUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [allManagers, setAllManagers] = useState([]);
  const [selectedList, setSelection] = useState([]);
  const [memberIds, setMemberIds] = useState([]);
  const [isAddMember, setIsAddMember] = useState(false);
  const { loader, startLoading, stopLoading } = useLoader();
  const unitStatus = ['OCCUPIED', 'LISTED', 'VACANT'];
  const navigation = useNavigation();
  const [_, AddMember] = useMutation(updateManagementTeam);
  const [__, RemoveMember] = useMutation(removeManagerFromManagementTeam);

  const [managementTeam, fetchManagementTeam] = useQuery({
    query: getManagementTeamByBuilding,
    variables: { building: building?.pk },
  });

  const [managementUserRes, fetchManagementUsers] = useQuery({
    query: getManagementCompanyEmployees,
  });

  useEffect(() => {
    filteredUsers.length
      ? setManagementUsers(filteredUsers)
      : setManagementUsers(managementTeam?.data?.getManagementTeam?.members);
  }, [managementTeam, filteredUsers]);

  useEffect(() => {
    setSelection(managementUsers?.map(item => item?.pk));
    managementUserRes.length ??
      setAllManagers(managementUserRes?.data?.managementUsers?.edges);
  }, [managementUserRes]);

  function shortenString(str) {
    const shortened = str?.substring(0, 25) + '...' || '';
    return shortened;
  }

  const handleModalHide = () => {
    if (isAddMember) {
      setIsAddMember(false);
    } else {
      setModalVisible(false);
    }
  };

  const deleteMember = async id => {
    if (managementUsers.length < 2) {
      setModalVisible(false);
      showErrorPopup();
    } else {
      try {
        const res = await RemoveMember({
          building: building?.pk,
          member: id,
        });

        if (!res?.data?.error) {
          fetchManagementUsers({
            requestPolicy: 'network-only',
          });
        }
        setFilteredUsers(managementUsers.filter(item => item?.pk !== id));
      } catch (e) {
        console.log(e);
      } finally {
        setIsAddMember(false);
      }
    }
  };

  const addMembers = async () => {
    startLoading();
    try {
      const res = await AddMember({
        building: building?.pk,
        members: memberIds,
      });
      if (!res?.data?.error) {
        fetchManagementTeam({
          requestPolicy: 'network-only',
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsAddMember(false);
    }
    stopLoading();
  };

  const showErrorPopup = () => {
    Toast.show({
      type: 'error1',
      text1: 'Error',
      text2: 'Building should have at least one Manager',
      props: {
        buttons: [
          {
            children: 'OK',
            onPress: () => {
              Toast.hide();
              handleSubmit();
            },
          },
        ],
        styles: { text1: { textTransform: 'uppercase' } },
      },
    });
  };

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleSelection = useCallback(
    id => {
      const managersArr = [...selectedList];
      const newItem = managersArr.find(item => item === id);

      if (!newItem) {
        managersArr.push(id);
      } else {
        managersArr.splice(managersArr.indexOf(id), 1);
      }
      setSelection(managersArr);

      setMemberIds(managersArr);
    },
    [selectedList, memberIds],
  );

  const renderPersona = useCallback(
    ({
      userType,
      picture,
      fullName,
      userTitle,
      id,
      label,
      mb,
      onPress,
      button,
      handleModal,
      ...props
    }) => {
      return (
        <>
          {label && (
            <Typography
              typography={'body/medium – bold'}
              style={styles.labelStyle}
              children={label}
            />
          )}
          {loader}
          <Box flexDirection="row" alignItems="center">
            <Persona
              onPress={() => {
                if (handleModal) {
                  handleButtonClick()
                } else {
                  setModalVisible(false);
                  navigation.navigate('LandlordProfile', {
                    screen: 'ViewCoorperateProfile',
                    params: { userType, id },
                  });
                }
              }}
              profile={picture}
              name={fullName || props?.name}
              title={userTitle}
              isUppercase={props.isUppercase}
              mb={mb}
              styles={{
                image: styles?.imageStyle,
                text: styles?.textStyle,
                innerContainer: {
                  width: props.width,
                },
              }}
            />
            {button}
          </Box>
        </>
      );
    },
    [navigation, modalVisible, isAddMember, selectedList],
  );

  const renderUnitStatusBox = useCallback(
    ({ name, value, count, isMiddleItem }) => (
      <>
        <Box
          style={
            name === 'LISTED'
              ? styles.statusBox.listed
              : name === 'VACANT'
                ? styles.statusBox.vacant
                : styles.statusBox.occupied
          }
          flex={1}
          py={2}
          {...{ mx: isMiddleItem ? 3 : 0 }}>
          <Box alignItems="center">
            <Text
              category="c2"
              transform="uppercase"
              appearance="hint"
              style={styles.statusBox.name}>
              {name}
            </Text>
            <Text status="primary" category="s3" style={styles.statusBox.count}>
              {count}
            </Text>
          </Box>
        </Box>
      </>
    ),
    [building],
  );

  return (
    <CarouselCard
      title={building?.displayName || building?.name}
      images={building?.photos}
      isProperty={false}
      texStyle={styles.titleTextStyle}>
      <Box
        flexDirection="row"
        justifyContent="space-around"
        mb={3}
        style={styles.unitAddress}>
        <Text style={styles.unitAddressText}>
          {' '}
          {building?.vacantUnits?.edgeCount ? `${building?.vacantUnits?.edgeCount} ${building?.vacantUnits?.edgeCount === 1 ? 'unit' : 'units'
            }` : "N/A"}
        </Text>
        <Dot />
        <Text style={styles.unitAddressText}>
          {(building?.floors && building?.floors + ' FLOORS') || '- FLOORS'}
        </Text>
        <Dot />
        <Text style={styles.unitAddressText}>
          {building?.neighbourhood || building?.address || building?.city}
        </Text>
      </Box>
      <Box flexDirection="row" width="100%" mb={3}>
        {!building?.draftItem && unitStatus?.map((name, i) => {
          let unitKey = name.toLowerCase() + 'Units';
          return renderUnitStatusBox({
            name,
            value: UNIT_STATUS?.['name'],
            isMiddleItem: i > 0 && i < unitStatus?.length - 1,
            count: building?.[unitKey].edgeCount,
          });
        })}
      </Box>
      {building?.owner &&
        renderPersona({
          label: 'Landlord',
          ...building.owner,
          userType: USER_TYPES.LANDLORD,
          width: '100%',
        })}
      <Box>
        <Box flexDirection="row">
          <Box style={styles.buildingManager}>
            {building?.managementCompany &&
              renderPersona({
                width: '110%',
                mb: 0,
                label: 'Management Company',
                ...building.managementCompany,
                userType: USER_TYPES.MANAGEMENT,
                isUppercase: true,
                handleModal: true
              })}
          </Box>
        </Box>
      </Box>
      <TeamManagement
        visible={modalVisible}
        onHide={handleModalHide}
        leftIcon={true}
        title={
          isAddMember
            ? ' Add team members'
            : shortenString(building?.managementCompany?.name)
        }
        button={
          !isAddMember ? (
            <FAB onPress={() => setIsAddMember(true)} style={{ right: 0 }} />
          ) : (
            <Button
              onPress={addMembers}
              textStyle={{
                fontWeight: '500',
                fontSize: 16,
              }}>
              ADD
            </Button>
          )
        }
        search={
          isAddMember && (
            <Box style={styles.searchContainer}>
              <Box style={{ width: '90%', marginLeft: 20, marginBottom: 5 }}>
                <KeyboardAwareScrollView>
                  <Input
                    textStyle={styles.searchInput}
                    placeholder={'Search'}
                  />
                  <Image
                    style={styles.searchImage}
                    source={require('img/searchIcon.png')}
                  />
                </KeyboardAwareScrollView>
              </Box>
            </Box>
          )
        }
        children={
          modalVisible && (
            <Box style={styles.managerList}>
              <Text style={styles.managementText}>MANAGEMENT TEAM</Text>
              {(isAddMember ? allManagers : managementUsers)?.map(node => {
                return renderPersona({
                  picture: node?.picture || node?.node?.picture,
                  fullName: node?.fullName || node?.node?.fullName,
                  userTitle: node?.userTitle || node?.node?.userTitle,
                  id: node?.id || node?.node?.id,
                  userType: USER_TYPES.MANAGEMENT,
                  modalVisible,
                  width: modalVisible ? '94%' : '100%',
                  button: (
                    <Box as={TouchableOpacity}>
                      {!isAddMember && modalVisible ? (
                        <Box
                          as={TouchableOpacity}
                          style={styles.deleteButton}
                          mb={10}>
                          <Icon
                            as={TouchableOpacity}
                            onPress={() =>
                              deleteMember(node?.pk || node?.node?.pk)
                            }
                            name={'delete'}
                            pack="pm"
                          />
                        </Box>
                      ) : (
                        <Box as={TouchableOpacity} mb={10}>
                          <CheckboxField
                            isSelected={selectedList?.includes(
                              node?.pk || node?.node?.pk,
                            )}
                            onPress={() => {
                              handleSelection(node?.pk || node?.node?.pk);
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                  ),
                });
              })}
            </Box>
          )
        }
      />
    </CarouselCard>
  );
};

export default ViewPropertyPageHead;

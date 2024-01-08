import React, { useState, useEffect } from 'react';
import Box from 'components/Box';
import PhotoField from 'components/Forms/Fields/PhotoField/index.js';
import AmenitiesField from 'components/Forms/Fields/AmenitiesField/index.js';
import ManagementTeamField from 'components/Forms/Fields/ManagementTeamField/index.js';
import ButtonField from 'components/Forms/Fields/ButtonField';
import LandlordSelectField from 'components/Forms/Fields/LandlordField/LandlordSelectField';
import { removeFilterObjectFromArray } from 'helpers/array';
import { AMENITY_TYPES } from 'constants/enums.js';

import { styles } from '../styles';

const AdditionalBuildingFields = ({
  form,
  setValue,
  isLandlord,
  navigation,
  managersList,
}) => {
  const [selectedManagementUser, setSelectedManagementUser] = useState([]);
  const [savedManagers, setSavedManagers] = useState([]);

  useEffect(() => {
    setValue(
      'managementTeamMembers',
      selectedManagementUser.map(node => node?.pk),
    );
  }, [selectedManagementUser]);

  useEffect(() => {
    const filteredArray = managersList.filter(obj =>
      form?.managementTeamMembers?.includes(obj?.node?.pk),
    );
    const newArr = filteredArray.map(item => item?.node)
    setSavedManagers(newArr);
  }, [form?.managementTeamMembers]);

  return (
    <Box style={styles.inputFieldsContainer}>
      <PhotoField
        copy={{ label: 'Building photo', btn: 'ADD FROM PHONE' }}
        value={form?.photos}
        setValue={val => setValue('photos', val)}
      />
      {!isLandlord && (
        <LandlordSelectField
          value={form?.owner}
          setValue={val => setValue('owner', val?.[0])}
          limit={1}
          isPlusIcon={false}
          isRequired
          removeItem={() => setValue('owner', null)}
        />
      )}
      <ManagementTeamField
        Component={ButtonField}
        setValue={val => setSelectedManagementUser(val)}
        value={
          !selectedManagementUser?.length
            ? savedManagers
            : selectedManagementUser
        }
        removeItem={managementUser => {
          const filteredList =
            removeFilterObjectFromArray(
              selectedManagementUser,
              managementUser?.id,
              'id',
            ) || [];
          setSelectedManagementUser(filteredList);
        }}
        navigation={navigation}
        limit={1}
        isPlusIcon={false}
        isRequired
      />
      <AmenitiesField
        value={form?.amenities}
        setValue={val => setValue('amenities', val)}
        amenityType={AMENITY_TYPES.BUILDING}
      />
    </Box>
  );
};

export default AdditionalBuildingFields;

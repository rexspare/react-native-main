import React, { useEffect, useState } from 'react';
import { fetchBuildingData } from 'api/building';
import { useLoader } from 'hooks/useLoader';
import Box from 'components/Box';
import ExpandableInputList from '../ExpandableInputList';
import { getExpandableFieldDetails } from '../helper';

const AutomatedBuildingFields = ({
  zip,
  form,
  fields,
  setFields,
  shouldFetch,
  setShouldFetch,
  buildingAddress,
  onValidationChange,
}) => {
  const [autofetchStatus, setAutofetchStatus] = useState(null);
  const { loader, loadingFunc } = useLoader();

  const handleFetchBuildingData = loadingFunc(
    async address => {
      const fetchedData = await fetchBuildingData(address);
      const formattedData = getExpandableFieldDetails(fetchedData);
      setFields(formattedData);
      setAutofetchStatus('SUCCESS');
    },
    () => setAutofetchStatus('UNSUCCESSFULL'),
  );

  useEffect(() => {
    if (shouldFetch && autofetchStatus !== 'SUCCESS' && buildingAddress) {
      handleFetchBuildingData(buildingAddress);
      setShouldFetch(false);
    }
  }, [
    buildingAddress?.city,
    buildingAddress?.streetAddress,
    buildingAddress?.state,
    shouldFetch,
    autofetchStatus,
  ]);

  // useEffect(() => onValidationChange({fieldName: "automatedFields", isValid: autofetchStatus === "SUCCESS", validationMessage: autofetchStatus === "UNSUCCESSFULL" && "Failed to fetch automated fields"}) ,[autofetchStatus])

  return (
    <Box mt={3} mb={1}>
      {loader}
      <ExpandableInputList
        values={fields}
        zip={zip}
        form={form}
        setValue={setFields}
      />
    </Box>
  );
};

export default AutomatedBuildingFields;

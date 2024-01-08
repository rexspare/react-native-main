import { formatImageToFileInput } from 'components/Forms/Tasks/helpers.js';

export const expandableFieldLabels = {
  boro: { type: 'text', label: 'Boro' },
  block: { type: 'text', label: 'Block' },
  lot: { type: 'text', label: 'Lot' },
  owner: { type: 'text', label: 'Owner' },
  bldgcl: { type: 'text', label: 'Building Class' },
  numberOfFloors: { type: 'numeric', label: 'Number of floors' },
  taxclass: { type: 'text', label: 'Taxes' },
  ltfront: { type: 'numeric', label: 'Lot SQ FT' },
  ltdepth: { type: 'numeric', label: 'Lot SQ DT' },
  stories: { type: 'text', label: 'Stories' },
  staddr: { type: 'text', label: 'Address' },
  zip: { type: 'numeric', label: 'Zip Code' },
  bldfront: { type: 'numeric', label: 'Building SQ FT' },
  blddepth: { type: 'numeric', label: 'Building SQ DT' },
  bin: { type: 'numeric', label: 'Building Information Number' },
  neighborhood: { type: 'text', label: 'Neighborhood' },
};

export const expandableFieldsFormatters = {
  lotSqFt: val => val && `${val}`,
  lotDimensions: (val = []) => val?.join(' X '),
  taxes: (val = 0) => val && `$ ${val}`,
};

export const getExpandableFieldDetails = values => {
  return Object.keys(defaultExpandableFieldValues).map(key => {
    return {
      key,
      value: !!values
        ? values?.fetchBuildingData
          ? values?.fetchBuildingData[key]
          : !!values[key]
          ? values[key]
          : null
        : null,
      label: expandableFieldLabels[key]?.label,
      type: expandableFieldLabels[key]?.type,
      formatter: expandableFieldsFormatters?.[key]?.label,
    };
  });
};

export const defaultExpandableFieldValues = {
  boro: null,
  block: null,
  lot: null,
  owner: null,
  bldgcl: null,
  numberOfFloors: null,
  taxclass: undefined,
  ltfront: null,
  ltdepth: null,
  stories: null,
  staddr: null,
  zip: null,
  bldfront: null,
  blddepth: null,
  bin: null,
  neighborhood: null,
};

export const formatBuildingFormData = (form, managers) => {
  const building = {
    ...form,
    name: form?.name || form?.address,
    managementCompany:
      managers?.data?.managementUsers?.edges[0]?.node.managementCompany.id,
    photos: form?.photos?.map(formatImageToFileInput),
    amenities: form?.amenities?.map(a => a.id),
    owner: form?.owner?.id,
    ownerPk: form?.owner?.pk,
  };
  delete building?.managementUser;

  return building;
};

export const formatBuildingInitialValues = editData => {
  return {
    state: 'NY',
    address: editData?.address,
    city: editData?.city,
    name: editData?.name,
    zip: editData?.zip?.toString(),
    neighbourhood: editData?.neighbourhood,
    far: editData?.far?.toString(),
    maxFar: editData?.maxFar?.toString(),
    photos: editData?.photos?.map(uri => ({ uri })),
    propertyType: editData?.propertyType,
    regulationStatus: editData?.regulationStatus,
    amenities: editData?.amenities?.edges?.map((item, index) => item.node),
    owner: editData?.owner,
    managementTeamMembers: editData?.managementTeam?.members?.map(
      item => item.pk,
    ),
  };
};

export const formatInitialAutomatedFieldValues = data => {
  if (!data || !data.length) {
    data = defaultExpandableFieldValues;
    return {
      boro: data?.boro,
      blocks: data?.blocks?.[0],
      lot: data?.lot,
      owner: data?.owner,
      bldgcl: data?.bldgcl,
      floors: data?.floors,
      taxes: data?.taxes,
      lotSqFt: data?.lotSqFt,
      lotSqDt: data?.lotSqDt,
      stories: data?.stories,
      address: data?.address,
      zip: data?.zip,
      bldFront: data?.bldFront,
      bldDepth: data?.bldDepth,
      bin: data?.bin,
      neighborhood: data?.neighborhood,
    };
  } else {
    const formattedData = {};
    data.forEach(item => {
      if (item.value !== undefined) {
        formattedData[item.key] = item.value;
      }
    });

    return formattedData;
  }
};

export const toCapitalLetter = str => {
  if (!str) return '';
  const arr = str.split(' ');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(' ');
};

import { RENT_TYPES, UNIT_STATUS, UNIT_UTILITIES } from 'constants/enums';
import * as yup from 'yup';
import { formatImageToFileInput } from 'components/Forms/Tasks/helpers';
import { format } from 'helpers/date';

const transformNumber = (value, originalValue) =>
  +`${originalValue}`.replace(/[^0-9.]+/g, '');

export const schema = yup.object().shape({
  building: yup
    .object()
    .shape({
      id: yup.string().required(),
      displayName: yup.string(),
    })
    .required()
    .label('Building'),
  unitNumber: yup
    .string()
    .max(5)
    .required()
    .label('Unit #'),
  floor: yup
    .number()
    .required()
    .label('Floor'),
  status: yup
    .number()
    .required()
    .oneOf(Object.values(UNIT_STATUS))
    .label('Status'),
  price: yup
    .number()
    .transform(transformNumber)
    .min(1)
    .required()
    .label('Rent Amount'),
  photos: yup
    .array()
    .of(
      yup.lazy(value => {
        if (typeof value === 'string') {
          return yup.string().url();
        }
        return yup.object().shape({
          uri: yup.string().required(),
        });
      }),
    )
    .label('Photos'),
  areaSize: yup
    .number()
    .transform(transformNumber)
    .required()
    .label('Square Feet'),
  rentType: yup
    .object()
    .shape({
      key: yup
        .mixed()
        .oneOf(Object.values(RENT_TYPES))
        .required(),
    })
    .required()
    .label('Rent Type'),
  amenities: yup
    .array()
    .ensure()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
      }),
    )
    .label('Amenities'),
  tenants: yup
    .array()
    .ensure()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        fullName: yup.string().required(),
        picture: yup.string(),
        pk: yup.number(),
        title: yup.string().required(),
      }),
    )
    .label('Tenants'),
  utilities: yup
    .array()
    .of(yup.number().oneOf(Object.values(UNIT_UTILITIES)))
    .label('Utilities'),
  bedroomCount: yup
    .number()
    .min(0)
    .required()
    .label('Bedroom Count'),
  bathroomCount: yup
    .number()
    .min(0)
    .required()
    .label('Bathroom Count'),
  description: yup.string().label('description'),
  isFurnished: yup.bool().default(false),
  date: yup.string().required(),
  lease: yup.object(),
});

export const UNIT_FIELDS_WATCHING = [
  'amenities',
  'building',
  'unitNumber',
  'price',
  'status',
  'photos',
  'areaSize',
  'rentType',
  'lease',
  'bedroomCount',
  'bathroomCount',
  'isFurnished',
  'floor',
  'rentType',
  'date',
  'unitRegulationStatus',
  'description',
  'tenants',
];

export const UNIT_REQUIRED_FIELDS = [
  'building',
  'unitNumber',
  'price',
  'bedroomCount',
  'bathroomCount',
  'status',
  'rentType',
];
export const formatUnitInitialValueFields = (data, buildingData) => ({
  ...data,
  building: {
    ...buildingData,
  },
  rentType: data.rentType,
  photos: data.photos?.length > 0 ? data.photos.map(uri => ({ uri })) : [],
  unitNumber: data.unitNumber ? `${data.unitNumber}` : undefined,
  floor: data.floor ? `${data.floor}` : undefined,
  price: data.price ? `${data.price}` : undefined,
  areaSize: data.areaSize ? `${data.areaSize}` : undefined,
  isFurnished: data.isFurnished,
  bedroomCount: data.bedroomCount,
  bathroomCount: data.bathroomCount,
  amenities: data.amenities?.length > 0 ? data.amenities.edges.map(e => e.node) : [],
  tenants: data.tenants?.edges?.length > 0 ? data.tenants.edges.map(e => e.node) : [],
  date: data?.vacancyDate ? new Date(data?.vacancyDate) : null,
});

export const formatUnitFieldsOnSubmit = form => ({
  building: form.building?.id,
  unitNumber: form.unitNumber,
  floor: form.floor ?? 1,
  status: form.status ?? 1,
  price: parseFloat(form.price.replace(/,/g, '')),
  photos: form.photos?.map(formatImageToFileInput) || [],
  amenities: form?.amenities?.map(a => a.id) || [],
  tenants: form?.tenants?.map(a => a.pk) || [],
  areaSize: form.areaSize ?? 0,
  rentType: form.rentType ?? 1,
  utilities: form.utilities ?? [],
  bedroomCount: form.bedroomCount ?? 1,
  bathroomCount: form.bathroomCount ?? 1,
  description: form.description ?? '',
  isFurnished: form.isFurnished ?? false,
  vacancyDate: format(form?.date, 'yyyy-MM-dd'),
});

export const formatUnitLeaseData = form => ({
  ...form?.lease,
  rentDay: form?.lease?.rentDay?.key,
  tenantId: form?.lease?.tenant?.pk,
  start: format(form?.lease?.start, 'yyyy-MM-dd'),
  end: format(form?.lease?.end, 'yyyy-MM-dd'),
  documents: form?.lease?.attachments?.map(formatImageToFileInput),
  tenant: null,
  unit: null,
});

import React, { useRef, useState } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { TouchableOpacity } from 'react-native';
import { useMutation } from 'urql';
import getAmenitiesQuery from 'queries/properties/getAmenities.gql';
import addAmenityMutation from 'queries/properties/addAmenity.gql';
import { useGetListProps } from 'hooks/useGetListProps';
import TagsValue from 'components/Forms/TagsValue';
import Text from 'components/Text';
import SelectListItem from 'components/SelectListItem/SelectListItem';
import Dialog, { Buttons } from 'components/Dialog';
import ButtonField from '../ButtonField';
import PopoverField from '../PopoverField';
import AppendedTextField from '../AppendedTextField';
import { t } from 'helpers/react';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';
import { button_styles } from 'styles/button';
import { styles } from './styles';

const renderItem = ({ item, isSelected, onPress }) =>
  t(
    item.name,
    <SelectListItem
      text={item.name}
      item={item}
      isSelected={isSelected}
      onPress={onPress}
    />,
  );

const defaultCopy = { label: 'List of amenities', btn: 'ADD FROM LIST' };

const AmenitiesField = ({
  value,
  setValue,
  amenityType = 1,
  copy = defaultCopy,
}) => {
  const [amenityText, setAmenityText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef();
  const listProps = useGetListProps({
    dataKey: 'amenities',
    ref: listRef,
  });
  const [_, addAmenity] = useMutation(addAmenityMutation);

  const handleAddAmenity = async () => {
    if (amenityText) {
      const input = { amenityType, name: amenityText };
      try {
        const res = await addAmenity({ input });
        if (res.error?.message) {
          return Toast.show({ type: 'error', text1: res.error?.message });
        }
        listRef.current?.refresh();
        setAmenityText('');
      } catch (err) {
        Toast.show({ type: 'error', text1: err?.message });
      }
    }
  };

  const headerRight = (
    <TouchableOpacity onPress={() => setAmenityText('')}>
      <Text
        color={colors['primary/50']}
        style={{
          ...typography['body/small – medium'],
          textTransform: 'uppercase',
        }}>
        {amenityText && 'Cancel'}
      </Text>
    </TouchableOpacity>
  );

  const titleAppender = (
    <AppendedTextField
      onAddition={handleAddAmenity}
      setAmenityText={setAmenityText}
      amenityText={amenityText}
    />
  );

  const handleRemoveAmenity = (amenity, removeAll) => {
    if (removeAll) {
      setValue();
    } else {
      let amenities = value.slice().filter(a => a.id !== amenity.id);
      setValue(amenities);
    }
  };

  const renderModal = () => {
    return (
      <Dialog
        visible={isOpen}
        onHide={() => setIsOpen(false)}
        styles={styles.container}>
        <Text style={styles.title}>
          Do you really want to delete all “Amenities”?
        </Text>
        <Text style={styles.content}>You will have to choose them again</Text>
        <Buttons
          containerStyle={styles.buttonsContainer}
          buttons={[
            {
              children: 'CANCEL',
              containerStyle: styles.buttonContainer,
              onPress: () => setIsOpen(false),
              ...button_styles['primary_50_brand_clear_large'],
            },
            {
              children: 'DELETE',
              containerStyle: styles.buttonContainer,
              onPress: () => {
                setIsOpen(false);
                handleRemoveAmenity(null, true);
              },
              ...button_styles['grey_large'],
            },
          ]}
        />
      </Dialog>
    );
  };

  return (
    <>
      <PopoverField
        value={
          value?.length && (
            <TagsValue
              onTagDelete={handleRemoveAmenity}
              style={{ marginTop: 5 }}
              value={value}
            />
          )
        }
        Component={ButtonField}
        setValue={setValue}
        {...copy}
        triggerKey={'onPress'}
        isPlusButton={false}
        removeItems={() => setIsOpen(true)}
        navigationProps={{
          query: getAmenitiesQuery,
          listRef,
          header: 'Select Amenities',
          initialValues: value,
          onSelect: values => setValue(values),
          valueKey: 'id',
          variables: amenityType && { type: amenityType },
          value,
          renderItem,
          headerRight,
          titleAppender,
          isScrollTitle: true,
          displayDone: true,
          ...listProps,
        }}
      />
      {renderModal()}
    </>
  );
};

export default AmenitiesField;

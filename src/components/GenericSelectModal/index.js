import React, { useCallback, useEffect, useState } from 'react';
import GenericSelectList from 'pages/GenericSelectScreen/GenericSelectList';
import FullPageBottomModal from 'components/FullPageBottomModal';
import Button from 'components/Button';
import { t } from 'helpers/react';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';
import {styles} from "./styles";

const GenericSelectModal = ({
  visible,
  onHide,
  onSelect,
  header,
  headerRight,
  titleAppender,
  children,
  isScrollTitle = false,
  isSelectBtn = false,
  addTenant,
  buttonText,
  open,
  ...genericSelectProps
}) => {
  const [selectedValues, setSelectedValues] = useState({});
  const isAddBtn = (genericSelectProps?.value && genericSelectProps?.value?.length) || !addTenant;
  const onDone = useCallback(() => {
    onSelect?.(Object.values(selectedValues));
    onHide();
  }, [selectedValues]);
  
  
  useEffect(() => {
    if(addTenant){
      onSelect?.(Object.values(selectedValues));
    }
  },[selectedValues]);
  return (
    <FullPageBottomModal
      title={header}
      titleAppender={!isScrollTitle && titleAppender}
      visible={visible}
      headerRight={headerRight}
      onHide={onDone}
      {...genericSelectProps}>
      {children}
      <GenericSelectList
        header={!!isScrollTitle && titleAppender}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        {...genericSelectProps}
      />

      {t(isSelectBtn, <Button style={[styles.button, !isAddBtn && {backgroundColor: "transparent"} ]} 
      textStyle={[{...typography['buttons/large'], color: "white"}, !isAddBtn && {color: colors['primary/50']}]} onPress={(genericSelectProps?.value && genericSelectProps?.value?.length) || !addTenant ? onDone : open }>
        {(genericSelectProps?.value && genericSelectProps?.value?.length) || !addTenant ? "SELECT" : buttonText}
      </Button>)}
    </FullPageBottomModal>
  );
};

export default GenericSelectModal;

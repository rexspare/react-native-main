import React from 'react';
import format from 'date-fns/format';
import FeaturesTab from 'components/ProfilePage/FeaturesTab';
import formatPhoneNumber from 'utils/formatPhoneNumber';
import { usaDateFormat } from 'constants/dateFormat';
import { typography } from "styles/typography";
import { colors } from "styles/theme";
import { getDocumentType } from '../EditCoorperateProfile/schema';
import WorkHours from 'components/WorkHours';
import Box from 'components/Box';
import Button from 'components/SubmitButton';
import { t } from 'helpers/react';
import { styles } from './styles';

const Personal = ({ data, isContactManager }) => {
  const personal = data;
  const docType = getDocumentType({
    ssn: personal?.ssn,
    passport: personal?.ssn,
    drivingLicense: personal?.drivingLicense,
  });

  const workHours = !!personal?.workHours?.length && (
    <WorkHours data={personal?.workHours} />
  );

  return (
    <>
      <FeaturesTab
        features={isContactManager ?
          [
            { label: 'Company Name', content: personal?.managementCompany?.name },
            { label: 'Office Phone', content: personal?.workingDetails?.phone ? formatPhoneNumber(personal?.workingDetails?.phone) : '' },
            { label: 'Mobile Phone', content: personal?.phone ? formatPhoneNumber(personal?.phone) : '' },
            { label: 'Office Email', content: personal?.workingDetails?.email },
            { label: 'Office Address', content: personal?.workingDetails?.address },
            { label: 'Hours', contentJsx: workHours },
          ]
          : [
            {
              label: 'ID',
              content: docType?.docNumber
            },
            {
              label: 'DOB',
              content: personal?.birthday
                ? format(new Date(personal?.birthday), usaDateFormat)
                : '',
            },
            {
              label: 'Cell Phone',
              content: personal?.phone ? formatPhoneNumber(personal?.phone) : '',
            },
            { label: 'Home Address', content: personal?.address },
            // { label: 'Driver License', content: personal?.drivingLicense },
            { label: 'Personal Email', content: personal?.email },
            { label: 'Passport', content: personal?.passport },
            { label: 'SSN', content: personal?.ssn },
          ]}
        styles={{
          features: {
            label: {
              ...typography["body/medium – regular"],
              color: colors['gray scale/40']
            },
            content: {
              ...typography["body/medium – regular"],
              color: colors['gray scale/90']
            },
            row: {
              height: 'auto',
              minHeight: 54,
              borderColor: colors['gray scale/10'],
              paddingHorizontal: 7,
            },
          }
        }}
      />
      {t(isContactManager, <Box pb="3" mx={3}>
        <Button
          style={{height: 48, borderRadius: 13}}
          textStyle={styles.buttonText}
          onPress={null}>
          SEND MESSAGE
        </Button>
      </Box>)}
    </>
  );
};

export default Personal;

import React, { useMemo } from 'react';
import { useQuery } from 'urql';
import HeadedScreen from 'components/HeadedScreen';
import FeaturesTab from 'components/ProfilePage/FeaturesTab';
import ComplianceActionsButton from '../ComplianceActionsButton';
import withComplianceType from '../hoc/withComplianceType';
import helpers from './helpers';
import { getActions } from 'constants/actions';
import { COMPLIANCE_DETAILS_TYPE_MAP } from '../const';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';
import styles from './styles';

const ComplianceDetailsPage = ({ route, navigation, query, prefix }) => {
  const [res] = useQuery({ query, variables: { id: route?.params?.id } });

  const features = useMemo(() => {
    return helpers.formatFeatures(res?.data?.data, route);
  }, [res?.data]);

  return (
    <HeadedScreen
      header={`${route?.params?.title} #${res?.data?.data?.idInSupplier}`}
      actions={getActions(['back', { onPress: () => navigation.goBack() }])}
      contentContainerProps={styles.contentContainer}
      isLoading={res?.fetching}
      divider>
      <FeaturesTab
        features={features}
        containerProps={styles.featuresContainer}
        styles={{
          features: styles.featuresStyle,
          label: {
            ...typography['body/medium – regular'],
            color: colors['gray scale/40'],
          },
        }}
      />
      <ComplianceActionsButton
        navigation={navigation}
        entity={res?.data?.data}
        prefix={prefix}
      />
    </HeadedScreen>
  );
};

export default withComplianceType(
  ComplianceDetailsPage,
  COMPLIANCE_DETAILS_TYPE_MAP,
  props => props?.route?.params?.__typename,
);

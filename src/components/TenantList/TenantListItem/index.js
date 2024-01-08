import React from 'react';
import Box from 'components/Box';
import Persona from 'components/Persona';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Text from 'components/Text';
import { t } from 'helpers/react';
import { splitString } from 'utils/exchanges';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const TenantListItem = ({
  tenant,
  leaseField,
  restoreDeniedTenant,
  displaySetStatusModal,
  queryParams,
  onPress,
}) => {
  const lease = tenant[leaseField];
  const unit = lease?.unit;
  const tenantMeta =
    unit?.unitNumber &&
    `${tenant?.pastLease?.unit?.building?.name} ${tenant?.pastLease?.unit?.building?.name ? '/' : ''
    } Unit` + unit?.unitNumber;

  return (
    lease && (
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb="1"
        px={3}>
        <Persona
          profile={tenant.picture}
          name={tenant.fullName}
          subtext={
            <Text style={{ ...styles.prospectiveTenantPersona.subtext }}>
              {splitString(
                tenantMeta,
                queryParams?.isProspective || queryParams?.isArchived ? 18 : 30,
              )}
            </Text>
          }
          onPress={() => onPress(lease.id)}
          activeOpacity={0.7}
          styles={styles.prospectiveTenantPersona}
          title={`Apartment ${unit?.unitNumber}`}
          avatarProps={{ shape: 'rounded', size: 'medium' }}>
        </Persona>
        {t(
          queryParams?.isProspective,
          <Button
            onPress={() => displaySetStatusModal(lease?.application?.pk)}
            appearance="ghost"
            py="0px"
            px="0px"
            style={{ width: 30, height: 49 }}
            icon={style =>
              Icon('grey-dots', 'pm')({ width: 20, height: 20 })
            }></Button>,
        )}
        {t(
          queryParams?.isArchived,
          <Button
            onPress={() => restoreDeniedTenant(lease?.application?.pk)}
            appearance="outline"
            style={{ backgroundColor: '#fff', borderRadius: 10, marginLeft: -70 }}
            size="small"
            py="0px"
            px="0px">
            RESTORE
          </Button>,
        )}
      </Box>
    )
  );
};

const styles = {
  prospectiveTenantPersona: {
    subtext: {
      ...typography['body/small – regular'],
      color: colors['gray scale/40'],
      textTransform: 'uppercase',
    },
    text: {
      ...typography['body/medium – medium'],
      color: colors['gray scale/90'],
    },
  },
};

export default TenantListItem;

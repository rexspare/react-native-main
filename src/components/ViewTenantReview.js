import React from 'react';
import { StyleSheet } from 'react-native';
import Box from './Box';
import Text from './Text';
import Review from "../pages/tenants/RateTenant/Review";
import Avatar from 'components/Avatar_old';
import { typography } from 'styles/typography';

const styles = StyleSheet.create({
    tenantAvatar: { width: 95, height: 95 },
    reviewAvatar: { width: 20, height: 20 }
});
const ViewTenantReview = ({ tenantReview }) => {
    const renderReview = React.useCallback(() => {
        const formatedReview = {
            tenancyYears: tenantReview?.tenancyYears,
            comment: tenantReview?.comment,
            score: tenantReview?.reviewerScore,
            ...tenantReview?.paymentSection,
            ...tenantReview?.leaseSection,
            ...tenantReview?.damagesSection,
            ...tenantReview?.complaintsSection,
            ...tenantReview?.behaviourSection,
            ...tenantReview?.maintenanceSection
        };
        return <Review containerProps={{ mx: 0 }} watching={formatedReview} isEditable={false} />
    }, [tenantReview]);


    return (
        <>
            <Box m="2px" alignItems="center">
                <Box
                    as={Avatar}
                    source={
                        tenantReview?.tenant?.picture
                            ? { uri: tenantReview?.tenant?.picture }
                            : require('img/profile.svgpng')
                    }
                    style={styles.tenantAvatar}
                />
                <Text style={typography["body/small – regular"]} transform="uppercase" pt="1">
                    {`${tenantReview?.tenant?.firstName} ${tenantReview?.tenant?.lastName}`}
                </Text>
                <Box flexDirection="row" alignItems="center">
                    <Box
                        as={Avatar}
                        source={
                            tenantReview?.reviewer?.picture
                                ? { uri: tenantReview?.reviewer?.picture }
                                : require('img/profile.svgpng')
                        }
                        style={styles.reviewAvatar}
                    />
                    <Text style={typography["body/small – regular"]} px="1">
                        {`rated by ${tenantReview?.reviewer?.fullName}.`}
                    </Text>
                </Box>
            </Box>
            {renderReview()}
        </>
    );
};

export default ViewTenantReview;
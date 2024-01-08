import React, { useCallback, useRef, useState } from 'react';
import { useQuery } from 'urql';
import Text from 'components/Text';
import InfiniteFlatList from 'components/InfiniteFlatList';
import FullPageBottomModal from 'components/FullPageBottomModal';
import ViewTenantReview from 'components/ViewTenantReview';
import ReviewCard from 'components/ReviewCard';
import listTenantReviewsQuery from 'queries/tenants/listTenantReviews.gql';
import getReviewTenant from 'queries/tenants/getReviewTenant.gql';
import Box from 'components/Box';
import { colors } from 'styles/theme';

const TenantReviews = ({ isOpen, close, lease }) => {
    const listRef = useRef();
    const [reviewId, setReviewId] = useState(null);
    const listProps = React.useMemo(
        () => ({
            query: listTenantReviewsQuery,
            variables: {
                id: lease?.id,
            },
            limit: 10,
            keyExtractor: item => item.id,
            dataExtractor: data => data?.lease?.tenant?.receivedReviews,
            renderItem: ({ item }) => <ReviewCard name={item?.reviewer?.fullName} comment={item?.comment} onPress={() => setReviewId(item?.id)} />,
            contentContainerStyle: { paddingVertical: 8 },
        }),
        [lease],
    );

    const [res, executeQuery] = useQuery({
        query: getReviewTenant,
        variables: {
            id: reviewId,
        },
        pause: !reviewId
    });

    const tenantReview = res?.data?.tenantReview;

    useCallback(() => {
        if (reviewId) {
            executeQuery({
                requestPolicy: 'network-only',
            });
        }
    }, [executeQuery, reviewId])

    return (
        <FullPageBottomModal
            displayDone={!!reviewId}
            doneText={"Back"}
            visible={isOpen}
            onHide={() => {
                if(!!reviewId) {
                    return setReviewId(null)
                } else return close();
            }}
            contentContainerProps={{ backgroundColor: reviewId ? "#fff" : colors['gray scale/5'] }}
            title={reviewId ? "Review" : "Reviews"}
        >
            {reviewId ?
                <ViewTenantReview tenantReview={tenantReview} />
                :
                <Box flex={1}>
                    <InfiniteFlatList
                        ref={listRef}
                        {...listProps}
                        ListEmptyComponent={
                            <Text category="h6" textAlign="center" appearance="hint">
                                No Reviews
                            </Text>
                        }
                    />
                </Box>
            }
        </FullPageBottomModal>
    )
};

export default TenantReviews;
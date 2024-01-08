import React, { useEffect, useMemo, useState } from 'react';
import listPendingPaymentsQuery from 'queries/rentals/listTenantPayments.gql';
import InfiniteFlatList from 'components/InfiniteFlatList';
import Text from 'components/Text';
import RentalCard from 'components/RentalCard';
import { PAYMENT_STATUSES } from 'constants/enums';
import differenceInDays from 'date-fns/differenceInDays';
import useShouldRefresh from 'hooks/useShouldRefresh';
import { TENANT_PAYMENTS } from 'constants/refreshConsts';
import { useLoader } from 'hooks/useLoader';

const TenantPaymentsList = ({ navigation, variables = {} }) => {
    const paymentListRef = React.useRef();
    const [pause, setPause] = useState(false);
    const { loader, startLoading, stopLoading, isLoading } = useLoader()


    const onRefresh = React.useCallback(async () => {
        const refresh = async () => {
            startLoading()
            await paymentListRef.current?.refresh?.(false)
            stopLoading()
        };
        await refresh();
    }, []);

    useShouldRefresh(TENANT_PAYMENTS, () => onRefresh())

    const paymentsListProps = useMemo(
        () => ({
            keyExtractor: item => item.id,
            dataExtractor: data => data?.payments,
            renderItem: ({ item }) => {
                const due = new Date(item.due)
                const status = getPaymentStatus(item, new Date(item.due))
                return (
                    <>
                        <RentalCard
                            price={item.amount}
                            due={due}
                            status={status}
                            unit={item?.lease.unit}
                            paidDate={item?.latestPayment}
                            id={item?.id}
                            notes={item.notes}
                            pending={item.status === PAYMENT_STATUSES.PENDING}
                            onViewDetails={() => navigation.navigate("RentalPaymentDetails", { item, status })}
                        />
                    </>)
            },
        }),
        [navigation],
    );

    useEffect(() => setPause(false), [variables])
    return (
        <>
            {loader}
            <InfiniteFlatList
                query={listPendingPaymentsQuery}
                ref={paymentListRef}
                variables={variables}
                refresh={isLoading}
                // TODO: Fix to not continuously fetch without using manual pause
                onLoad={() => setPause(true)}
                pause={pause}
                ListEmptyComponent={
                    <Text category="h6" py={3} textAlign="center" appearance="hint">
                        No Pending Payments
                    </Text>
                }
                {...paymentsListProps}
            />
        </>

    );
};

const getPaymentStatus = (item, due) => {
    if (item?.amountDue <= 0) return "PAID"
    const now = new Date();
    const diff = differenceInDays(due || now, now);
    if (diff < 0 && diff !== 0) return "OVERDUE"
    return "UNPAID"
}


export default TenantPaymentsList;

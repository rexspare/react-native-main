import { useContext, useMemo } from 'react';
import AuthProvider from 'providers/auth';
import { USER_TYPES } from 'constants/enums';

export default function useRole() {
    const { user: { userType = '', ...user } } = useContext(AuthProvider);

    return useMemo(() => ({
        userType,
        isTenant: USER_TYPES.TENANT === userType,
        isManager: USER_TYPES.MANAGEMENT === userType,
        isLandlord: USER_TYPES.LANDLORD === userType,
        isStaff: USER_TYPES.STAFF === userType,
        user
    }), [user?.id])
};

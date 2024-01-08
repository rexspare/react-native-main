import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
/* eslint-disable react/prop-types */

const MockProvider = ({
    children,
}) => (
    <ApplicationProvider>
        {children}
    </ApplicationProvider>
);
/* eslint-enable react/prop-types */

export default MockProvider;

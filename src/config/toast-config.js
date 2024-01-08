import React from 'react';
import Toaster from 'components/Toaster';

export const toastConfig = {
    error1: ({ props, ..._props }) => <Toaster icon={"red-cross-filled"} {..._props} {...props} />,
    success1: ({ props, ..._props }) => <Toaster icon={"checkCircleIcon"} {...props} {..._props} />
};
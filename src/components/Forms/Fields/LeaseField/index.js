import { useIsOpen } from 'hooks/useIsOpen';
import React from 'react';
import ButtonField from '../ButtonField';
import { format } from 'helpers/date';
import LeaseForm from 'components/Forms/LeaseForm';
import Features from 'components/Features';
import useTheme from 'hooks/useTheme';

const defaultCopy = { label: "Lease", btn: "ADD LEASE DETAILS" }
const LeaseField = ({ setValue, value, formProps, isModal, copy = defaultCopy, ...props }) => {
    const { isOpen, close, open } = useIsOpen();
    const theme = useTheme();

    const handleSetLease = (lease) => {
        if (lease?.start && lease?.end) setValue(lease)
        close()
    }

    return (
        <>
            <ButtonField
                onPress={open}
                {...copy}
                label={"Add Lease"}
                addMoreProps={{ children: "Change" }}
                clearAll={false}
                value={value &&
                    <Features
                        styles={{ container: { marginTop: 3 } }}
                        theme={theme}
                        features={[{
                            label: value?.tenant?.fullName || "",
                            content: `${format(value?.start, 'MMM dd, yy')} - ${format(value?.end, 'MMM dd, yy')}`
                        }]}
                    />
                }
                {...props}
            />
            <LeaseForm 
                onSubmit={handleSetLease} 
                onHide={close} 
                visible={isOpen} 
                isModal={isModal} 
                {...formProps} 
            />
        </>
    )
};

export default LeaseField;
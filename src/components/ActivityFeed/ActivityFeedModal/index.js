import FullPageBottomModal from 'components/FullPageBottomModal';
import React  from 'react';
import ActivityFeed from '../index';


const ActivityFeedModal = ({modalProps, ...props}) => {
    return (
        <FullPageBottomModal title={"ACTIVITY"} {...modalProps} doneText="DONE">
            <ActivityFeed onLinkPress={modalProps?.onHide} {...props} />
        </FullPageBottomModal>
    )
};

export default ActivityFeedModal;
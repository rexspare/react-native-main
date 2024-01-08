
import getViolationDetails from "queries/compliance/getViolation.gql";
import getPermitDetails from "queries/compliance/getPermit.gql";
import getComplaintDetails from "queries/compliance/getComplaint.gql";

export const COMPLIANCE_SOURCES = {
    ECB: "ECB",
    DOB: "DOB",
    HPD: "HPD"
}

export const COMPLIANCE_FEED_SWITCH_OPTIONS = [
    { text: "Open", value: true },
    { text: "Closed", value: false }
]

const COMPLIANCE_NODE_TYPES = {
    PERMIT: "PermitNode",
    COMPLAINT: "ComplaintNode",
    VIOLATION: "ViolationNode"
}

export const COMPLIANCE_DETAILS_TYPE_MAP = {
    [COMPLIANCE_NODE_TYPES.PERMIT]: {
        query: getPermitDetails,
        prefix: "Permit"
    },
    [COMPLIANCE_NODE_TYPES.COMPLAINT]: {
        query: getComplaintDetails,
        prefix: "Complaint"
    },
    [COMPLIANCE_NODE_TYPES.VIOLATION]: {
        query: getViolationDetails,
        prefix: "Violation"
    }
};

export const COMPLIANCE_CARD_TYPE_MAP = {
    [COMPLIANCE_NODE_TYPES.PERMIT]: {
        title: "Permit"
    },
    [COMPLIANCE_NODE_TYPES.COMPLAINT]: {
        title: "Complaint"
    },
    [COMPLIANCE_NODE_TYPES.VIOLATION]: {
        title: "Violation"
    }
}
import { compact } from "lodash";

export const getLeaseRequiredFields = ({units = true, tenants = true, paymentMethod = true}) => compact([ units && "unit", tenants && "tenant", "start", "end", "rentDay", "rentAmount", "securityDeposit",  ])
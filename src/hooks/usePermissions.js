import { useContext, useMemo } from "react";
import AuthContext from "providers/auth";

export const PERMISSION_SECTIONS = {
    TASKS: "tasks",
    FINANCIALS: "financials",
    PROFILE: "profile",
    PROPERTIES: "properties",
    DOCUMENTS: "documents",
}

export const usePermissions = (sectionKey) => {
    const { permissions } = useContext(AuthContext)
    return useMemo(() => permissions?.[sectionKey] || {}, [permissions, sectionKey])
}
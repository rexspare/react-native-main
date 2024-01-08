import { useEffect } from "react"

export const useRegisterFields = (fields, register,unregister ) => {
    useEffect(() => {
        fields.map(field => register({name: field}))
        return () => {
            fields.map(field => unregister({name: field}))
        }
    }, [register, unregister, fields])
};

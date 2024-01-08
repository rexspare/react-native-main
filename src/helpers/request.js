export const objToQueryString = (params) => {
    if(!params) return ''
    let qs = `?`
    const keys = Object.keys(params);
    keys.map(key => {
        const val = params[key]
        if(val !== undefined){
            qs += `${key}=${val}&`
        }
    })
    return qs
}

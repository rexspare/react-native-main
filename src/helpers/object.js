export const removeValueFromObject = (object, key) => {
    delete object[key];
    return object
} 

export const  arrayToObject = (arr, field='id')  => {
    try{
        let result = {};
        for (let element of arr){
            result[element[field].toString()] = element;
        }
        return result;
    }
    catch(e){
        return {}
    }
}

export const getIn = (obj, arr, defaultValue = null) => {
    try{
        let result = obj;
        for (let key of arr){
            result = result[key];
        }
        return result;
    }
    catch (e) {
        return defaultValue;
    }
}

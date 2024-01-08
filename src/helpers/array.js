export const removeValueFromArray = (array = [], value) => {
    const index = array.indexOf(value);

    if (index !== -1) {
        array.splice(index, 1)
    }

    return array;
};

export const removeObjectFromArray = (array = [], value, key = "id") => {
    return array.slice().filter(item => item[key] !== value);
};

export const removeNodeObjectFromArray = (array = [], value, key = "id") => {
    return array.slice().filter(item => item['node'][key] !== value);
};

export const removeItem = (setValue, key, v, i) => {
    const rItem = removeFilterObjectFromArray(v, i)
    setValue(key, rItem);
}

export const removeFilterObjectFromArray = (array = [], value, key = "id", objectNode = false) => {
    if (!(array.length > 1)) return null;
    if (objectNode) return removeNodeObjectFromArray(array, value, key);
    return removeObjectFromArray(array, value, key);
}
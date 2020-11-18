export const LI_setState = (data, property) => {
    return {
        type: 'LI_setState',
        payload: data,
        property: property,
    };
}

export const LI_setGlobalState = (data, property) => {
    return {
        type: 'LI_setGlobalState',
        payload: data,
        property: property,
    };
}
export const set_state = (data, property) => {
    return {
        type: 'set_state',
        payload: data,
        property: property,
    };
}

export const setLiButton = (property) => {
    return {
        type: 'setLiButton',
        property: property,
    };
}
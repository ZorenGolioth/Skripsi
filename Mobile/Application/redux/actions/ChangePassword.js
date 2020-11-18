export const set_state = (data, property) => {
    return {
        type: 'set_state',
        payload: data,
        property: property,
    };
}

export const setCpButton = (property) => {
    return {
        type: 'setCpButton',
        property: property,
    };
}
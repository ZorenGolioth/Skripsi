export const employee_state = (data, property) => {
    return {
        type: 'employee_state',
        payload: data,
        property: property,
    };
}

export const setPdButton = (property) => {
    return {
        type: 'setPdButton',
        property: property,
    };
}

export const setPudButton = (property) => {
    return {
        type: 'setPudButton',
        property: property,
    };
}
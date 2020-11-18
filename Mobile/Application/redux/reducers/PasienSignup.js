const initialState = {
    // personal details
    fullname : '',
    address  : '',
    phone    : '',
    dob      : '',
    gender   : '',
    PdButtonState : true,

    // user details
    username    : '',
    email       : '',
    password    : '',
    rePassword  : '',
    // avatar      : {},
    UserButtonState : true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'employee_state':
            return { ...state, [action.property]: action.payload };
    
        case 'setPdButton':
            if(state.fullname !== '' && state.address !== '' && state.phone !== '' && state.dob !== '' && state.gender !== '')
            {
                return { ...state, [action.property]: false };
            }
            else
            {
                return { ...state, [action.property]: true };
            }
    
        case 'setPudButton':
            if(state.username !== '' && state.email !== '' && state.password !== '' && state.rePassword !== '')
            {
                return { ...state, [action.property]: false };
            }
            else
            {
                return { ...state, [action.property]: true };
            }
    
        default:
            return state;
    }
}
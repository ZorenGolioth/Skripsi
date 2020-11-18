const initialState = {
    CpEmail             : '',
    CpNewPassword       : '',
    CpConfirmPassword   : '',
    CpButtonState       : true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'set_state':
            return { ...state, [action.property]: action.payload.toString() };
    
        case 'setCpButton':
            if(state.CpEmail !== '' && state.CpNewPassword !== '' && state.CpConfirmPassword !== '') {
                return { ...state, [action.property]: false };
            } else {
                return { ...state, [action.property]: true };
            }
    
        default:
            return state;
    }
}
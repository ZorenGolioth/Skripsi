const initialState = {
    LiUnEmail       : '',
    LiPassword      : '',
    LiButtonState   : true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'set_state':
            return { ...state, [action.property]: action.payload.toString() };
    
        case 'setLiButton':
            if(state.LiUnEmail !== '' && state.LiPassword !== '') {
                return { ...state, [action.property]: false };
            } else {
                return { ...state, [action.property]: true };
            }
    
        default:
            return state;
    }
}
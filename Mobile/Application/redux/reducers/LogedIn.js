const initialState = {
    // personal details
    LI_fullname : '',
    LI_address  : '',
    LI_phone    : '',
    LI_dob      : '',
    LI_gender   : '',

    // user details
    LI_username     : '',
    LI_email        : '',

    LI_IdKlinik     : '',
    LI_NamaKlinik   : '',
    LI_firstLogin   : false,

    // data loader
    LI_loadAntrian  : false,
    LI_loadDokter   : false,
    // LI_loadAllEmployee      : false,
    // LI_loadCategoryEmployee : false,
    // LI_loadOnJobEmployee    : false,
    // LI_loadOnJobUpdater     : false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LI_setState':
            return { ...state, [action.property]: action.payload.toString() };

        case 'LI_setGlobalState':
            return { ...state, [action.property]: action.payload };
    
        default:
            return state;
    }
}
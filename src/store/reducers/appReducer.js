import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
    sectionItem: {},
};
const appReducer = (state = initState, action) => {
    //action sẽ cái mà dispatch mang tới
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find((item) => item.sectionId === "hSlider")?.items || null,
                sectionItem: action.homeData?.find((item) => item.sectionId === "hEditorTheme") || {},
            };

        default:
            return state;
    }
};

export default appReducer;

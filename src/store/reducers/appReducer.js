import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
    sectionItem: {},
    sectionItem2: {},
    sectionItem3: {},
    sectionItem4: {},
    sectionItem5: {},
};
const appReducer = (state = initState, action) => {
    //action sẽ cái mà dispatch mang tới
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find((item) => item.sectionId === "hSlider")?.items || null,
                sectionItem: action.homeData?.find((item) => item.sectionId === "hEditorTheme") || {},
                sectionItem2: action.homeData?.find((item) => item.sectionId === "hEditorTheme3") || {},
                sectionItem3: action.homeData?.find((item) => item.sectionId === "h100") || {},
                sectionItem4: action.homeData?.find((item) => item.sectionId === "hAlbum") || {},
                sectionItem5: action.homeData?.find((item) => item.sectionType === "new-release") || {},
            };
        default:
            return state;
    }
};
export default appReducer;

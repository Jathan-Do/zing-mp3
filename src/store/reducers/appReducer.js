import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
    sectionItem: {},
    sectionItem2: {},
    sectionItem3: {},
    sectionItem4: {},
    sectionItem5: {},
    sectionItem6: {},
    sectionItem7: {},
    sectionItem8: {},
    sectionItem9: {},
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
                sectionItem6: action.homeData?.find((item) => item.sectionType === "weekChart") || {},
                sectionItem7: action.homeData?.find((item) => item.sectionId === "hEditorTheme4") || {},
                sectionItem8: action.homeData?.find((item) => item.sectionId === "hSeasonTheme") || {},
                sectionItem9: action.homeData?.find((item) => item.sectionId === "hZC") || {},
            };
        default:
            return state;
    }
};
export default appReducer;

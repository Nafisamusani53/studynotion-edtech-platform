const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categories = {
    GET_ALL_CATEGORY: BASE_URL + "/course/getAllCategory",
    CREATE_CATEOGORY: BASE_URL + "/course/createCategory",
    GET_CATEGORY_PAGE_DETAILS: BASE_URL + "/course/getCategoryPageDetails",
}
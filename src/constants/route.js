const API_URL = process.env.REACT_APP_API_URL

const ROUTE = {
    LOGIN_PATH : `${API_URL}/login`,
    REGISTER_PATH : `${API_URL}/register`,
    LOGOUT_PATH : `${API_URL}/log-out`,
    CONFIRMCODE_PATH : `${API_URL}/register/activeEmail/{codeInput}/{username}`,
    EDITPROFILE_PATH : `${API_URL}/editUser`,
    SEARCH_PATH : `${API_URL}/houses/filter`,
    HOUSE_DETAIL : `${API_URL}/houses/detail`,
    HOUSE_MANAGE : `${API_URL}/houses/username`,
    HOUSE_CREATE : `${API_URL}/houses/create`,
    
    USERDETAIL_PATH : `${API_URL}/userDetail`,
    HOUSEDETAIL_PATH : `${API_URL}/houses/detail?`
}

const AUTH_ROUTE = {
    LOGIN: `${API_URL}/login`,
    REGISTER : `${API_URL}/register`,
    LOGOUT : `${API_URL}/log-out`,
    CHANGE_PASSWORD : `${API_URL}/`,
}

const USER_ROUTE = {
    GET_USER : `${API_URL}/userDetail`,
    EDIT_INFOR : `${API_URL}/editUser`,
}

export {API_URL, ROUTE, AUTH_ROUTE, USER_ROUTE};
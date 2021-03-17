const API_URL = process.env.REACT_APP_API_URL

const ROUTE = {
    LOGIN_PATH : `${API_URL}/login`,
    REGISTER_PATH : `${API_URL}/register`,
    LOGOUT_PATH : `${API_URL}/log-out`,
    CONFIRMCODE_PATH : `${API_URL}/register/activeEmail/{codeInput}/{username}`,
    EDITPROFILE_PATH : `${API_URL}/editUser`
}

export {API_URL, ROUTE};
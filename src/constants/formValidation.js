export const PASSWORD_MIN_LENGTH = 6;
export const NAME_MIN_LENGTH = 3;
export const userConstants = {
  LOGIN_REQUEST: "USERS_LOGIN_REQUEST",
  LOGIN_SUCCESS: "USERS_LOGIN_SUCCESS",
  LOGIN_FAILURE: "USERS_LOGIN_FAILURE",

  REGISTER_SUCCESS: "USERS_REGISTER_SUCCESS",
  REGISTER_FAILURE: "USERS_REGISTER_FAILURE",

  LOGOUT: "USERS_LOGOUT",

  GETALL_REQUEST: "USERS_GETALL_REQUEST",
  GETALL_SUCCESS: "USERS_GETALL_SUCCESS",
  GETALL_FAILURE: "USERS_GETALL_FAILURE",
};
export const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

export const phoneRegex = RegExp(/^(84|0[3|5|7|8|9])+([0-9]{8})$/ ) ; 

export const passwordRegex = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/); 

export const usernameRegex = RegExp(/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/) ;
    // /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

export  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach((val) => {
      val === null && (valid = false);
    });
  
    return valid;
};
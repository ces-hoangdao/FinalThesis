import _ from "lodash";

const isValidData = (value) => {
  const isEmpty = _.isEmpty(value);
  const isObject = _.isObject(value);
  
    return (!isEmpty && isObject)
  
}

const isAuthenticated = () => {
  return localStorage.getItem("token");
}

const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { isValidData, isAuthenticated, numberWithCommas};
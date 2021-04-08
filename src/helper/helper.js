import _ from "lodash";

export default function isValidData(value) {
  const isEmpty = _.isEmpty(value);
  const isObject = _.isObject(value);

  return !isEmpty && isObject;
}

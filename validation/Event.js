const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateEvent(data) {
  let errors = {};


  data.title = !isEmpty(data.title) ? data.title : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Required title";
  }
 


  return {
      errors,
      isValid: isEmpty(errors)
  }
};

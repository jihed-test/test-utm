const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateLogin(data) {
  let errors = {};


  data.email = !isEmpty(data.email) ? data.email : "";
  data.code = !isEmpty(data.code) ? data.code : "";


 
  if (!validator.isEmail(data.email)) {
    errors.email = "Required format email";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Required email";
  }
  if (validator.isEmpty(data.code)) {
    errors.code = "Required Code";
  }
 


  return {
      errors,
      isValid: isEmpty(errors)
  }
};

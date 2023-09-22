const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateEventList(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.date = !isEmpty(data.date) ? data.date : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Required title";
  }
  if (validator.isEmpty(data.description)) {
    errors.description = "Required description";
  }
  if (validator.isDate(data.date)) { 
    errors.date = "Required valid date";
  }
  if (validator.isEmpty(data.date)) {
    errors.date = "Required date";
  }
  
 



  return {
      errors,
      isValid: isEmpty(errors)
  }
};

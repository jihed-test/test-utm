const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateProfile(data) {
  let errors = {};
  data.tel = !isEmpty(data.tel) ? data.tel : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.postalcode = !isEmpty(data.postalcode) ? data.postalcode : "";
  data.institution = !isEmpty(data.institution) ? data.institution : "";
  data.grade = !isEmpty(data.grade) ? data.grade : "";
  data.laboratoire = !isEmpty(data.laboratoire) ? data.laboratoire : "";
  data.ecoleDoctorale = !isEmpty(data.ecoleDoctorale) ? data.ecoleDoctorale : "";

  if (validator.isEmpty(data.tel)) {
    errors.tel = "Required tel";
  }
 
  if (validator.isEmpty(data.city)) {
    errors.city = "Required city";
  }
  if (validator.isEmpty(data.country)) {
    errors.country = "Required country";
  }
  if (validator.isEmpty(data.address)) {
    errors.address = "Required address";
  }
  if (validator.isEmpty(data.postalcode)) {
    errors.postalcode = "Required postalcode";
  }
  if (validator.isEmpty(data.institution)) {
    errors.institution = "Required institution";
  }
  if (validator.isEmpty(data.grade)) {
    errors.grade = "Required grade";
  }
  if (validator.isEmpty(data.laboratoire)) {
    errors.laboratoire = "Required laboratoire";
  }
  // if (validator.isInt(data.laboratoire, max:,min:)) {
  //   errors.ecoleDoctorale = "Required ecoleDoctorale";
  // }
  return {
      errors,
      isValid: isEmpty(errors)
  }
};

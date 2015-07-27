var isEmail = require('isEmail');

/*
 * Validates that text is not empty
 * @params {string} the value found in the form field
 * @returns {boolean}
*/
function validText(str) {
  return str.length !== 0;
}

/*
 * Validates an email address
 * @params {string} the value found in the form field
 * @returns {boolean}
*/
function validEmail(str) {
  if(validText(str) === false) return false;
  return isEmail(str);
}

/*
 * Validates a serialized html input/textarea field obj
 * @params {object} serialized html form control
 * @returns {boolean}
*/
function validateField(obj) {
  switch(obj.type) {
    case 'email':
      return validEmail(obj.value);
    case 'text':
    case 'search':
    case 'tel':
      return validText(obj.value);
    default: return true;
  }
}

/*
 * A generic form state object factory
 * @returns {object} object containing form element's relevant attributes as key value pairs
*/
var formState = {
  create: function() {
    return {
      errors: [],
      valid: function() {
        return this.errors.length === 0;
      },
      addError: function(err) {
        this.errors.push(err);
      }
    }
  }
}

module.exports = {
  /*
   * Validates a form and returns the form state
   * @params {object} serializedForm - a serialized form
   * @returns {object} object containing form element's relevant attributes as key value pairs
  */
  validate: function (serializedForm) {
    var formReport = formState.create();
    var validField;

    // only worry about fields that are set as 'required'
    serializedForm.filter(function(ele) {
      return ele.required;
    })
    // iterate over required fields and validate
    .forEach(function(ele) {
      if(validateField(ele) === false) {
        formReport.addError(ele);
      }
    })

    return formReport;
  }
}
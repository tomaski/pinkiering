var formState = require('./form-state');
var serializeForm = require('./form-serializer');

/*
 * Resets styles on the form if they were previously invalid
*/
function formReset(form) {
  var children = [].slice.call(form.children);
  children.forEach(function(child) {
    child.classList.remove('invalid');
  })
}

module.exports = {
  /*
   * Creates a form validator
   * @params {DOM form} form
   * @returns {boolean}
  */
  create: function(form) {
    if(form.onsubmit === undefined ) return;
    /*
     * Validates a form on the submit event
     * @params {event} e - DOM event
     * @returns {boolean}
    */
    form.onsubmit = function(e) {
      formReset(form);
      var formElement;
      var serializedForm = serializeForm(form);
      var state = formState.validate(serializedForm);

      if(state.valid() === true) return true;

      e.preventDefault();
      state.errors.forEach(function(ele) {
        formElement = document.querySelector('[name="'+ele.name+'"]');
        formElement.classList.add('invalid');
      })

      return false;
    }
  }
}
var formState = require('./form-state');

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
      var validation = formState.validate(form);
      if(validation.valid() === true) return true

      e.preventDefault();
      validation.errors.forEach(function(ele) {
        formElement = document.querySelector('[name="'+ele.name+'"]');
        formElement.classList.add('invalid');
      })

      return false;
    }
  }
}
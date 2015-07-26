var formValidator = require('./form-validator');
var form = document.querySelector('form');

// validate our form
formValidator.create(form);
var formValidator = require('./form-validator');
var form = document.querySelector('form');
var particles = require('./particles');

// Validates contact form
formValidator.create(form);
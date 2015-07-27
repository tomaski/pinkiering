var formState = require('../src/js/form-state');
var test = require('tape');


test('form state', function(t) {
  // empty form
  var invalidFormStub = [
   {name: "name", required: true, tagName: "input", type: "text", value: ""},
   {name: "email", required: true, tagName: "input", type: "email", value: ""},
   {name: "comment", required: true, tagName: "input", type: "text", value: ""}
  ];

  // form filled in with invalid email
  var invalidEmailFormStub = [
   {name: "name", required: true, tagName: "input", type: "text", value: "test"},
   {name: "email", required: true, tagName: "input", type: "email", value: "d@"},
   {name: "comment", required: true, tagName: "input", type: "text", value: "test"}
  ];

  // valid form
  var validEmailFormStub = [
   {name: "name", required: true, tagName: "input", type: "text", value: "test"},
   {name: "email", required: true, tagName: "input", type: "email", value: "d@david.com"},
   {name: "comment", required: true, tagName: "input", type: "text", value: "test"}
  ];

  t.plan(6);
  var state = formState.validate(invalidFormStub)
  t.equal(state.valid(), false, 'should not be valid if a required field is left blank');
  t.equal(state.errors.length, 3, 'should return invalid fields in the errors array');

  var invalidEmailState = formState.validate(invalidEmailFormStub);
  t.equal(invalidEmailState.valid(), false, 'should not be valid if an email is invalid');
  t.equal(invalidEmailState.errors.length, 1, 'should return invalid fields in the errors array');

  var validEmailState = formState.validate(validEmailFormStub);
  t.equal(validEmailState.valid(), true, 'should be valid if all fields have content and email is valid');
  t.equal(validEmailState.errors.length, 0, 'should return an empty errors array if there are none');
})
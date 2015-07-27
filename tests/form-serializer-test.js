var serializeForm = require('../src/js/form-serializer');
var formStub = require('./stub-form');
var formFieldStub = require('./stub-form-field');
var test = require('tape');


test('form serializer', function(t) {
  // form field stubs
  var emailField = formFieldStub.create({name:'email', required: true, tagName:'input', type: 'text'});
  var nameField = formFieldStub.create({name:'name', required: true, tagName:'input', type: 'text'});
  var commentField = formFieldStub.create({name:'comment', required: true, tagName:'textarea'});
  var hiddenField = formFieldStub.create({tagName:'input', hidden: true, name:'hidden-field', value:'✓'});

  // form stubs
  var form = formStub.create([commentField])
  var form2 = formStub.create([emailField, nameField, commentField, hiddenField]);

  var serializedForm = serializeForm(form);
  var serializedForm2 = serializeForm(form2);
  //console.log('\nserializedForm2 ',serializedForm2)
  var formOutput = [ { name: 'comment', required: true, tagName: 'textarea', type: 'text', value: '' } ];

  t.plan(4);
  t.deepEqual(serializedForm, formOutput, 'should output a serialized form');
  t.equal(serializedForm[0].type, 'text', 'should set a <textarea>\'s type to \'text\' so it can validate');
  t.equal(serializedForm2.length, 4, 'should be able to add more than one field to form');
  t.equal(serializedForm2[3].required, false, 'should set \'required\' to false if it\'s absent in the field');
})
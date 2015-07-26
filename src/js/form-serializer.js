/*
 * Simple form serializer - only text controls at the moment
 * TODO add phone validator
 * @params {object} html from object
 * @returns {object} object containing form element's 'name' as key and 'value' as value
*/
function serializeForm(form) {
  var formArr = [];
  var children = [].slice.call(form.children);
  var name;
  var elementObj;

  children.forEach(function(child) {
    var tag = child.tagName.toLowerCase();
    name = child.getAttribute('name');
    if(name) {
      elementObj = getAttributes(child);
      elementObj['value'] = child.value;
      elementObj['tagName'] = tag;
      // force textarea type to be text so we can validate as text input
      if(tag === 'textarea') elementObj['type'] = 'text';
      formArr.push(elementObj);
    }
  });
  return formArr;
}

/*
 * Transforms form element attributes into an object
 * @params {object} html form object
 * @returns {object} object containing attributes as key value pairs
*/
function getAttributes(formElement) {
  var elementAtts = [].slice.call(formElement.attributes);
  var attributes = {};
  elementAtts.forEach(function(attribute) {
    if(attribute.name === 'required') {
      attributes['required'] = normalizeRequired(attribute.value)
    }else{
      attributes[attribute.name] = attribute.value
    }
  })
  if(!attributes.hasOwnProperty('required')) attributes['required'] = false;
  return attributes;
}

/*
 * Normalizes required attribute value into true/false since they can be left blank
 * @params {string} attribute value
 * @returns {boolean}
*/
function normalizeRequired(val) {
  if(val==='false') return false
  return true
}

module.exports = serializeForm;
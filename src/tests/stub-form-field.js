
// convert an objs properties to array (leaving out functions)
function objectToArray(obj) {
  var arr = [];
  var attObj;

  for(key in obj) {
    if(typeof obj[key] !== 'function') {
      attObj = {};
      attObj['name'] = key;
      attObj['value'] = obj[key]
      arr.push(attObj);
    }
  }
  return arr;
}

// merge obj for defaults
function merge(from, to) {
  for(key in from) {
    to[key] = from[key]
  }
  return to;
}

// default field
function field() {
  return {
    name: '',
    required: '',
    tagName: 'INPUT',
    type: 'text',
    value: '',
    getAttribute: function(str) {
      return this[str]
    }
  }
}

module.exports = {
  create: function(obj) {
    var formField = merge(obj, field());
    formField.attributes = objectToArray(formField);
    return formField;
  }
}


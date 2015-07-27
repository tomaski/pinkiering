
// props - children
// methods - onsubmit
module.exports = {
  create: function(children) {
    return {
      children: children,
      onsubmit: undefined
    }
  }
}
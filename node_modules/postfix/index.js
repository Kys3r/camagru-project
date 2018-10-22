
function postfix(addr) {
  var list = addr.split('@');
  if (list.length != 2) {
    return false;
  } else {
    return list[1];
  }
}

module.exports = postfix;
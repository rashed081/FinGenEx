export default {
  // Form validation rules ##

  OnlyNumberRule(fieldName) {
    return (v) => /^[0-9]+(\.[0-9][0-9]?)?$/.test(v) || ''; //fieldName + ' must be Number only'
  },
  RequiredRules(fieldName) {
    return (v) => !!v || '';
  },
  LengthRulesEq(fieldName, length) {
    return (v) => (v && v.toString().length == length) || fieldName + ' must be ' + length + ' characters';
  },
  LengthRulesLess(fieldName, length) {
    return (v) => (v && v.toString().length < length) || fieldName + ' must be less than ' + length + ' characters';
  },
  LengthRulesLessEq(fieldName, length) {
    return (v) => (v && v.toString().length <= length) || fieldName + ' must be less than or equal to ' + length + ' characters';
  },
  LengthRulesGreater(fieldName, length) {
    return (v) => (v && v.toString().length > length) || fieldName + ' must be greater than ' + length + ' characters';
  },
  LengthRulesGreaterEq(fieldName, length) {
    return (v) => (v && v.toString().length >= length) || fieldName + ' must be greater than or equal to ' + length + ' characters';
  },
  LengthRules(fieldName, fieldValue, len) {
    if (fieldValue !== null) {
      let fieldvalue1 = fieldValue.toString();
      return (v) => fieldvalue1.length == len || fieldName + ' must be ' + len + ' characters';
    }
  },
  EmailRules(fieldName) {
    return (v) => /.+@.+\..+/.test(v) || fieldName + ' must be valid';
  },

  isLetter(e) {
    let char = String.fromCharCode(e.keyCode); // Get the character
    if (/^[A-Za-z .]+$/.test(char)) return true;
    // Match with regex
    else e.preventDefault(); // If not match, don't add to input text
  },
  isAddress(e) {
    let char = String.fromCharCode(e.keyCode); // Get the character
    if (/^[A-Za-z  - ,.]+$/.test(char)) return true;
    // Match with regex
    else e.preventDefault(); // If not match, don't add to input text
  },
  isDigit(e) {
    let char = String.fromCharCode(e.keyCode); // Get the character
    if (/^[0-9]+$/.test(char)) return true;
    // Match with regex
    else e.preventDefault(); // If not match, don't add to input text
  },
  isAmount(e) {
    let char = String.fromCharCode(e.keyCode); // Get the character
    if (/^[0-9.]+$/.test(char)) return true;
    // Match with regex
    else e.preventDefault(); // If not match, don't add to input text
  }

  // End form validation rules ##
};

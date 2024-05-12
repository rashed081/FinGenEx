




  const OnlyNumberRule=(fieldName: any)=>
  {
      return (v: string) => /^[0-9]+(\.[0-9][0-9]?)?$/.test(v) || ''//fieldName + ' must be Number only'
  }
  const required= (v: any)=> {
    return !!v || 'Field is required'
  }
  const LengthRulesEq=(fieldName: string, length: string)=> {
      return (v: { toString: () => { (): any; new(): any; length: any; }; }) => (v && v.toString().length == length) || fieldName + ' must be ' + length + ' characters'
  }
  const LengthRulesLess=(fieldName: string, length:any)=> {
      return (v: { toString: () => { (): any; new(): any; length: number; }; }) => (v && v.toString().length <length) || fieldName + ' must be less than ' + length + ' characters'
  }
  const LengthRulesLessEq=(fieldName: string, length: any)=> {
      return (v: { toString: () => { (): any; new(): any; length: number; }; }) => (v && v.toString().length <= length) || fieldName + ' must be less than or equal to ' + length + ' characters'
  }
  const LengthRulesGreater=(fieldName: string, length:  number)=> {
      return (v: { toString: () => { (): any; new(): any; length: number; }; }) => (v && v.toString().length > length) || fieldName + ' must be greater than ' + length + ' characters'
  }
  const LengthRulesGreaterEq=(fieldName: string, length:  number)=> {
      return (v: { toString: () => { (): any; new(): any; length: number; }; }) => (v && v.toString().length >= length) || fieldName + ' must be greater than or equal to ' + length + ' characters'
  }
  const LengthRules=(fieldName: string, fieldValue: { toString: () => any; } | null, len: string)=> {
      if (fieldValue !== null) {
          let fieldvalue1 = fieldValue.toString()
          return (v: any) => (fieldvalue1.length == len) || fieldName + ' must be ' + len + ' characters'
      }
  }
  const EmailRules=(fieldName: any)=> {
      return (v: string) => /.+@.+\..+/.test(v) || fieldName + ' must be valid'
      
  }

  const isLetter=(e: { keyCode: number; preventDefault: () => void; })=> {
    let char = String.fromCharCode(e.keyCode); // Get the character
    if (/^[A-Za-z .]+$/.test(char)) return true;
    // Match with regex
    else e.preventDefault(); // If not match, don't add to input text
  }
  const isAddress=(e: { keyCode: number; preventDefault: () => void; })=> {
    let char = String.fromCharCode(e.keyCode); // Get the character
    if (/^[A-Za-z  - ,.]+$/.test(char)) return true;
    // Match with regex
    else e.preventDefault(); // If not match, don't add to input text
  }
  const isDigit=(e: { keyCode: number; preventDefault: () => void; })=> {
    let char = String.fromCharCode(e.keyCode); // Get the character
    if (/^[0-9]+$/.test(char)) return true;
    // Match with regex
    else e.preventDefault(); // If not match, don't add to input text
  }
  const isAmount=(e: { keyCode: number; preventDefault: () => void; })=> {
    let char = String.fromCharCode(e.keyCode); // Get the character
    if (/^[0-9.]+$/.test(char)) return true;
    // Match with regex
    else e.preventDefault(); // If not match, don't add to input text
  }
  const isDecimal=(e: { keyCode: number; preventDefault: () => void; })=> {
    let char = String.fromCharCode(e.keyCode); // Get the character
    if (/^([\d]{0,9})(\.[\d]{1,2})?$/.test(char)) return true;
    // Match with regex
    else e.preventDefault(); // If not match, don't add to input text
  }


export default {
    isDecimal ,
    OnlyNumberRule,
    isAmount,
    required,
    LengthRulesEq,
    LengthRulesLess,
    LengthRulesLessEq,
    LengthRulesGreater,
    LengthRulesGreaterEq,
    isAddress,
    isDigit,
    LengthRules,
    EmailRules,
    isLetter,
    
}


export function validationOtherFields(key,name) {
  if (!name.trim()) return key + " can't be empty.";
  return '';
}

export function validationEmail(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Email can't be empty."
  if (!re.test(email)) return 'Ooops! We need a valid email address.'
  return ''
}

export function validationPassword(password) {
  if (!password) return "Password can't be empty."
  if (password.length < 5) return 'Password must be at least 5 characters long.'
  return ''
}

// Validation for confirm password
export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return "Confirm password can't be empty.";
  if (password !== confirmPassword) return "Passwords do not match.";
  return '';
}


export const capitalize = (string) => {
  const [firstLetter, ...restOfWord] = string;
  return firstLetter.toUpperCase() + restOfWord.join('')
}


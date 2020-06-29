/* eslint-disable no-useless-escape */
/**
 * Email Validation
 */
const validateEmail = (email: string): boolean => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  console.log('herere')
  return false;
};

/**
 * Email Validation
 */
const validatePassword = (password: string): boolean => {
  if (password) {
    return true;
  }
  return false;
};

/**
 * Flat Number Validation
 */
const validateFlat = (flat: string): boolean => {
  if (/[((A-Z{1,9})|(a-z{1,9})]-[0-9{1-9}]/g.test(flat)) {
    return true;
  }
  return false;
};

/**
 * Value Validation
 */
const validateIfValue = (input: string): boolean => {
  if (input) {
    return true;
  }
  return false;
};



export { validateEmail, validatePassword, validateFlat, validateIfValue };

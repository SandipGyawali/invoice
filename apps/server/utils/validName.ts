export function isNameValid(value: string) {
  if (/(https?:\/\/|www\.|http:|https:)/.test(value)) {
    return false;
  }

  const commonTLDs = /\.(com|org|net|edu|gov|io|co|me|app|dev|info)(\s|$|\/)/i;
  if (commonTLDs.test(value)) {
    return false;
  }

  const emailPattern = /.+@.+\..+/i;
  if (emailPattern.test(value)) {
    return false;
  }

  const phonePattern = /\+?[\d\s\(\)\-\.]{7,}/;
  if (phonePattern.test(value)) {
    return false;
  }

  return true;
}

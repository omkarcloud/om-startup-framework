export function isEmptyString(x: string): boolean {
  return x.trim() === '' 
}

export function isValidEmail(email: string): boolean {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !isEmptyString(email) && emailRegex.test(email);
}

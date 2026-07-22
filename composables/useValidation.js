// Shared validation rules used across all forms in the app (checkout, auth, contact, addresses, etc.)

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/
export const NAME_REGEX = /^[a-zA-Z' -]{2,}$/
export const POSTAL_CODE_REGEX = /^[a-zA-Z0-9\s-]{3,10}$/

export const isValidEmail = (value) => EMAIL_REGEX.test((value || '').trim())
export const isValidPhone = (value) => PHONE_REGEX.test((value || '').trim())
export const isValidName = (value) => NAME_REGEX.test((value || '').trim())
export const isValidPostalCode = (value) => POSTAL_CODE_REGEX.test((value || '').trim())
export const isNonEmpty = (value) => !!(value || '').toString().trim()
export const isValidPassword = (value) => (value || '').length >= 6

// Card type detection based on IIN/BIN prefixes (Visa, Mastercard, Amex, Discover)
export function detectCardType(cardNumber) {
  const digits = (cardNumber || '').replace(/\D/g, '')

  if (/^4/.test(digits)) return 'visa'
  if (/^5[1-5]/.test(digits) || /^2(2[2-9]|[3-6]\d|7[01]|720)/.test(digits)) return 'mastercard'
  if (/^3[47]/.test(digits)) return 'amex'
  if (/^6(?:011|5)/.test(digits)) return 'discover'
  return null
}

// Luhn algorithm check for card number validity
export function isValidCardNumber(cardNumber) {
  const digits = (cardNumber || '').replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let shouldDouble = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10)
    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    shouldDouble = !shouldDouble
  }
  return sum % 10 === 0
}

export function isValidExpiryDate(value) {
  const match = /^(\d{2})\/(\d{2})$/.exec((value || '').trim())
  if (!match) return false
  const month = parseInt(match[1], 10)
  const year = parseInt(match[2], 10) + 2000
  if (month < 1 || month > 12) return false

  const now = new Date()
  const expiry = new Date(year, month) // first day of the month AFTER expiry month
  return expiry > now
}

export function isValidCVV(value, cardType) {
  const digits = (value || '').replace(/\D/g, '')
  return cardType === 'amex' ? digits.length === 4 : digits.length === 3
}

export function formatCardNumber(value) {
  const digits = (value || '').replace(/\D/g, '').slice(0, 19)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

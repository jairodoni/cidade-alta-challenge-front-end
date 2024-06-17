export function generateRandomCode(length: number) {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyz'
  let code = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    code += characters.charAt(randomIndex)
  }

  return code
}

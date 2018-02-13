const availableLocales = require('fs').readdirSync('./src/renderer/locales').map(fileName => fileName.split('.')[0])
const currentLanguage = navigator.language.substr(0, 2)
const language = availableLocales.includes(currentLanguage) ? currentLanguage : 'en'
const locale = require('./' + language)

export default (phrase, variables) => {
  let result = eval('locale.' + phrase)

  if (Array.isArray(result)) {
    return result
  }

  if (typeof result !== 'string') {
    throw new Error('Invalid phrase: ' + phrase)
  }

  if (typeof variables === 'object') {
    for (const key in variables) {
      const pattern = new RegExp(`%${key}%`, 'g')
      const value = variables[key]
      result = result.replace(pattern, value)
    }
  }

  return result
}

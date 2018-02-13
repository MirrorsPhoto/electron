const currentLanguage = navigator.language.substr(0, 2)
const locale = require('../locales/' + currentLanguage)

export default (phrase) => {
  const result = eval('locale.' + phrase)

  if (typeof result !== 'string') {
    throw new Error('Invalid phrase: ' + phrase)
  }

  return result
}

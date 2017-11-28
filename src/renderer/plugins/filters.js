export default {

  // Валюта
  currency: value => value ? value + '₽' : '',

  /**
   * Склонение слова, зависящее от кол-ва
   * @param  {Number}  [n=0]        // Кол-во
   * @param  {Array}   [words=[]]   // Массив форм слов для кол-в [1, 2, 5]
   * @param  {Boolean} [showN=true] // Показывать ли кол-во
   */
  decline: (n = 0, words = [], showN = true) => {
    const cases = [2, 0, 1, 1, 1, 2]
    const word = words[n % 100 > 4 && n % 100 < 20 ? 2 : cases[n % 10 < 5 ? n % 10 : 5]]

    return showN ? `${n} ${word}` : word
  }
  
}

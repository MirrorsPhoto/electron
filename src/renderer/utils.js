export default {
  arrLoop: function* (arr) {
    for (let i = 0; ; i++) {
      arr[i] !== undefined ? yield arr[i] : (i = -1)
    }
  }
}

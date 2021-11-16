function formatDate(value) {
  let day = value.getDate()
  let month = value.getMonth() + 1
  let year = value.getFullYear()

  if(month < 10) {
    month = `0${month}`
  }
  if(day < 10) {
    day = `-${day}`
  }

  return `${year}-${month}-${day}`
}

module.exports = formatDate
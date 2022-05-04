import moment from "moment"

export function fDateTime(date, format = "MM.DD.YYYY, h:mm A") {
  try {
    if (!date) return ""
    return moment(date).format(format)
  } catch (error) {
    console.error(error)
    return ""
  }
}

import dayjs from "dayjs"
import LocalizedFormat from "dayjs/plugin/localizedFormat"

export const formatDate = (str: string, format: string) => {
  dayjs.extend(LocalizedFormat)

  return dayjs(str).format(format)
}

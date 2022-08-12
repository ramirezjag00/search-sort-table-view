import dayjs, { extend } from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

extend(isSameOrAfter)

const today = () => dayjs().format()
const hasOneHourPassed = (date: string): boolean =>
  dayjs().isSameOrAfter(dayjs(date).add(1, 'minute'))

export { today, hasOneHourPassed }

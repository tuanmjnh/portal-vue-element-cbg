import moment from 'moment'

export function addMonth(val) {
  return moment().add(val, 'months')
}

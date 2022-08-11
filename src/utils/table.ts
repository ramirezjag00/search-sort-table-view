import capitalize from './strings'
import { RowData } from '@customtypes/row'

const getTableHeaders = (rowData: RowData): RowData => {
  const newHeaders: RowData = {}
  Object.keys(rowData).forEach((item, idx) => {
    newHeaders[idx] = capitalize(item)
  })

  return newHeaders
}

export default getTableHeaders

import capitalize from './strings'
import { TableData } from '@customtypes/row'

const getTableHeaders = (
  rowData: TableData,
  isSortingHeader = false,
  sortingSymbols: TableData = {},
): TableData => {
  const newHeaders: TableData = {}
  Object.keys(rowData).forEach((item, idx) => {
    if (isSortingHeader) {
      newHeaders[idx] = `${capitalize(item)} ${
        sortingSymbols[item as keyof TableData]
      }`
    } else {
      newHeaders[idx] = capitalize(item)
    }
  })

  return newHeaders
}

export default getTableHeaders

import User from './user'

interface RowData {
  [key: string]: string | number
}

type TableData = User | RowData

export { RowData, TableData }

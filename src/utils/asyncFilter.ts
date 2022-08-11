import { TableData } from '@customtypes/row'

const asyncFilter = async (
  arr: TableData[],
  predicate: (obj: TableData) => boolean,
): Promise<TableData[]> => {
  const results = await Promise.all(arr.map(predicate))

  return arr.filter((_v, index) => results[index])
}

export default asyncFilter

import asyncFilter from './asyncFilter'
import { TableData } from '@customtypes/row'

const searchResults = async (
  searchText: string,
  data: TableData[],
): Promise<TableData[]> => {
  const keys = Object.keys(data[0])

  const mergedResults = []
  const lowerCasedSearchText = searchText.toLowerCase()
  const lowerCasedGenericValue = (obj: TableData, key: string) =>
    `${obj[key as keyof TableData]}`.toLowerCase()

  const filteredKey = async (key: string): Promise<TableData[]> => {
    const results = await asyncFilter(
      data,
      (obj: TableData): boolean =>
        lowerCasedGenericValue(obj, key) === lowerCasedSearchText ||
        lowerCasedGenericValue(obj, key).startsWith(lowerCasedSearchText) ||
        lowerCasedGenericValue(obj, key).includes(lowerCasedSearchText),
    )

    return results
  }

  for (let i = 0; i < keys.length; i++) {
    const results = await filteredKey(keys[i])
    mergedResults.push(...results)
  }
  const uniqueResults = [...new Map(mergedResults.map((o) => [o, o])).values()]

  return uniqueResults
}

export default searchResults

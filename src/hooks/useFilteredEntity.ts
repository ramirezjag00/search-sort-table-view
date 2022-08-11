import { useCallback, useEffect, useState } from 'react'

import EMPTY_USER_TABLE_DATA from '@constants/table'
import { TableData } from '@customtypes/row'
import searchResults from '@utils/searchResults'

const useFilteredEntity = (
  searchTerm: string,
  data: TableData[],
): TableData[] => {
  const [filteredEntity, setFilteredEntity] = useState<TableData[]>([])

  const filterEntity = useCallback(async () => {
    if (data?.length && searchTerm?.length) {
      const newEntityData = await searchResults(searchTerm, data)
      if (newEntityData?.length) {
        setFilteredEntity(newEntityData)
      } else {
        setFilteredEntity([EMPTY_USER_TABLE_DATA])
      }
    }
  }, [searchTerm, data])

  useEffect(() => {
    filterEntity()
  }, [filterEntity])

  return searchTerm?.length ? filteredEntity : data
}

export default useFilteredEntity

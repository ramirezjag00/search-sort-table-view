import { useCallback, useEffect, useState } from 'react'

import ApiClient from '@api/apiClient'
import { TableData } from '@customtypes/row'

const useGetUsers = (): TableData[] => {
  const [users, setUsers] = useState<TableData[]>([])
  const isFetchingAllowed = !users?.length

  const getUsers = useCallback(async () => {
    if (isFetchingAllowed) {
      const results = await ApiClient.fetchUsers()
      if (results.length) {
        setUsers(results)
      }
    }
  }, [isFetchingAllowed])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return users
}

export default useGetUsers

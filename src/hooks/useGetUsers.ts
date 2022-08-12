import { useCallback, useEffect, useRef, useState } from 'react'

import ApiClient from '@api/apiClient'
import keys from '@constants/keys'
import { TableData } from '@customtypes/row'
import { getMultiData, setMultiData } from '@utils/asyncStorage'
import { hasOneHourPassed, today } from '@utils/datetime'

const useGetUsers = () => {
  const [users, setUsers] = useState<TableData[]>([])
  const updatedAtRef = useRef<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchUsers = useCallback(async () => {
    const results = await ApiClient.fetchUsers()
    if (results.length) {
      const newUpdatedAt = today()
      const data: [string, string][] = [
        [keys?.USERS, JSON.stringify(results)],
        [keys?.USERS_UPDATED_AT, newUpdatedAt],
      ]
      await setMultiData(data)
      setUsers(results)
      updatedAtRef.current = newUpdatedAt
    }
    setIsLoading(false)
  }, [])

  const getCachedUsers = useCallback(async () => {
    const data = await getMultiData([keys?.USERS, keys?.USERS_UPDATED_AT])
    if (data?.length && !!data[0][1] && !!data[1][1]) {
      const cachedUsers = JSON.parse(data[0][1] ?? '') as TableData[]
      setUsers(cachedUsers ?? [])
      updatedAtRef.current = data[1][1] ?? ''
      setIsLoading(false)
    } else {
      fetchUsers()
    }
  }, [fetchUsers])

  const getUsers = useCallback(() => {
    const isFetchingAllowed = hasOneHourPassed(updatedAtRef?.current)

    if (!isLoading) {
      setIsLoading(true)
      if (isFetchingAllowed) {
        fetchUsers()
      } else {
        getCachedUsers()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchUsers, getCachedUsers])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return {
    users,
    getUsers,
    isFetchingUsers: isLoading,
  }
}

export default useGetUsers

import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types'
import { waitFor, renderHook, cleanup } from '@testing-library/react-native'
import dayjs from 'dayjs'
import MockDate from 'mockdate'
import { act } from 'react-test-renderer'

import AsyncStorage from '../__mocks__/async-storage'
import ApiClient from '@api/apiClient'
import keys from '@constants/keys'
import User from '@customtypes/user'
import useGetUsers from '@hooks/useGetUsers'
import { getMultiData, setMultiData } from '@utils/asyncStorage'
import { today } from '@utils/datetime'

const keysArray = [keys?.USERS, keys?.USERS_UPDATED_AT]

describe('useGetUsers hook', () => {
  describe('on render', () => {
    afterAll(async () => {
      await AsyncStorage.clear()
      MockDate.reset()
      cleanup()
    })

    const { result } = renderHook(() => useGetUsers())
    it('should always use Async Storage cache first but fetches data if cache is empty', async () => {
      expect(result.current.users?.length).toBeFalsy()
      expect(AsyncStorage.multiGet).toBeCalledWith(keysArray)
      expect(result.current.users?.length).toBeLessThan(1)
      await waitFor(() => result.current.users)
      expect(result.current.users?.length).toBeTruthy()
    })

    it('should use cache within an hour of fetching users', async () => {
      await act(() => {
        result.current.getUsers()
      })
      expect(AsyncStorage.multiGet).toBeCalledWith(keysArray)
      expect(result.current.users?.length).toBeTruthy()
    })

    it('should fetch users once an hour', async () => {
      let data = await getMultiData(keysArray)
      MockDate.set(dayjs(data?.[1][1]).add(1, 'hour').add(1, 'minute').format())
      const now = dayjs()
      await act(() => {
        result.current.getUsers()
      })
      data = await getMultiData(keysArray)
      expect(now.format()).toEqual(data?.[1][1])
      expect(result.current.users.length).toBeGreaterThanOrEqual(1)
      await act(() => {
        result.current.getUsers()
      })
      expect(now.format()).toEqual(data?.[1][1])
    })
  })

  describe('caching logic', () => {
    let data: readonly KeyValuePair[] | null
    const updatedAt = today()

    beforeAll(async () => {
      data = await getMultiData(keysArray)
    })

    afterAll(async () => {
      await AsyncStorage.clear()
      MockDate.reset()
      cleanup()
    })

    it('should check if Async Storage cache is used on first load', () => {
      expect(AsyncStorage.multiGet).toBeCalledWith(keysArray)
      expect(data?.[0]?.[1]).toBeFalsy()
      expect(data?.[1]?.[1]).toBeFalsy()
    })

    it('should fetch users if cached data is empty', async () => {
      if (data?.length && !data[0][1] && !data[1][1]) {
        const results = await ApiClient.fetchUsers()
        expect(results).toBeTruthy()
        expect(results?.length).toBeGreaterThanOrEqual(1)

        const usersData: [string, string][] = [
          [keys?.USERS, JSON.stringify(results)],
          [keys?.USERS_UPDATED_AT, updatedAt],
        ]
        await setMultiData(usersData)
      }
    })

    it('should have data if there are cached users after fetching', async () => {
      const cachedData = await getMultiData(keysArray)
      expect(AsyncStorage.multiGet).toBeCalledWith(keysArray)
      expect(cachedData?.[0]?.[1]).toBeTruthy()
      expect(cachedData?.[1]?.[1]).toBeTruthy()
    })

    it('should fetch users if updatedAt time has been equal or more than an hour now', async () => {
      MockDate.set(dayjs(updatedAt).add(1, 'hour').add(1, 'minute').format())
      const now = dayjs()
      const isFetchingAllowed = now.isSameOrAfter(
        dayjs(updatedAt).add(1, 'hour'),
      )
      await waitFor(() => isFetchingAllowed)

      let results: User[] | readonly KeyValuePair[] | null
      if (isFetchingAllowed) {
        results = await ApiClient.fetchUsers()
        const usersData: [string, string][] = [
          [keys?.USERS, JSON.stringify(results)],
          [keys?.USERS_UPDATED_AT, now.format()],
        ]
        await setMultiData(usersData)
      } else {
        results = await getMultiData(keysArray)
      }

      data = await getMultiData(keysArray)
      expect(results).toBeTruthy()
      expect(results?.length).toBeGreaterThanOrEqual(1)
      expect(now.format()).toEqual(data?.[1][1])
    })
  })
})

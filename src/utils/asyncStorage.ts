import AsyncStorage from '@react-native-async-storage/async-storage'
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types'

const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)

    return jsonValue ? (JSON.parse(jsonValue) as T) : null
  } catch (e) {
    return null
  }
}

const storeData = async <T>(key: string, value: T): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)

    return true
  } catch (e) {
    return false
  }
}

const getMultiData = async (
  keysArray: string[],
): Promise<readonly KeyValuePair[] | null> => {
  try {
    const data: readonly KeyValuePair[] = await AsyncStorage.multiGet(keysArray)

    return data?.length ? data : null
  } catch (e) {
    return null
  }
}

const setMultiData = async (data: [string, string][]): Promise<boolean> => {
  try {
    await AsyncStorage.multiSet(data)

    return true
  } catch (e) {
    return false
  }
}

export { storeData, getData, getMultiData, setMultiData }

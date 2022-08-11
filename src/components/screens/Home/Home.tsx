import { FC, useCallback, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

import ApiClient from '@api/apiClient'
import Table from '@common/Table'
import { TableData, RowData } from '@customtypes/row'
import { COLORS } from '@themes'
import capitalize from '@utils/strings'

const Home: FC = () => {
  const [users, setUsers] = useState<TableData[]>([])

  const isFetchingAllowed = !users?.length

  const getUsers = useCallback(async () => {
    if (isFetchingAllowed) {
      const result = await ApiClient.fetchUsers()
      if (result.length) {
        const newHeaders: RowData = {}
        Object.keys(result[0]).forEach((item, idx) => {
          newHeaders[idx] = capitalize(item)
        })
        setUsers([newHeaders, ...result])
      }
    }
  }, [isFetchingAllowed])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>USER TABLE</Text>
      <Table data={users} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    color: COLORS?.mineShaft,
    fontSize: 40,
    marginBottom: 12,
  },
})

export default Home

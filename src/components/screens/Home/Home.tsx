import { FC, useCallback, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

import Search from './components/Search'
import ApiClient from '@api/apiClient'
import Table from '@common/Table'
import { TableData } from '@customtypes/row'
import { COLORS } from '@themes'
import getTableHeaders from '@utils/table'

const Home: FC = () => {
  const [users, setUsers] = useState<TableData[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const onChangeSearchInput = (input: string): void => setSearchTerm(input)

  const isFetchingAllowed = !users?.length

  const getUsers = useCallback(async () => {
    if (isFetchingAllowed) {
      const result = await ApiClient.fetchUsers()
      if (result.length) {
        const headers = getTableHeaders(result[0])
        setUsers([headers, ...result])
      }
    }
  }, [isFetchingAllowed])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>USER TABLE</Text>
      <Search
        onChangeText={onChangeSearchInput}
        placeholder="Search for name or age"
        value={searchTerm}
      />
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

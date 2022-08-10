import { FC, useCallback, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native'

import ApiClient from '@api/apiClient'
import Row from '@common/Row'
import Table from '@common/Table'
import RowData from '@customtypes/row'
import User from '@customtypes/user'
import { COLORS } from '@themes'
import capitalize from '@utils/strings'

const Home: FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [headers, setHeaders] = useState<RowData>({})

  const isFetchingAllowed = !users?.length

  const getUsers = useCallback(async () => {
    if (isFetchingAllowed) {
      const result = await ApiClient.fetchUsers()
      if (result.length) {
        const newHeaders: RowData = {}
        Object.keys(result[0]).forEach((item, idx) => {
          newHeaders[idx] = capitalize(item)
        })
        setUsers(result)
        setHeaders(newHeaders)
      }
    }
  }, [isFetchingAllowed])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>USER TABLE</Text>
      <ScrollView style={styles.container}>
        <Table data={users}>
          <Row data={headers} isHeader={true} />
        </Table>
      </ScrollView>
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

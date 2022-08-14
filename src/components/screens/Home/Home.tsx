import { FC, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

import lodashDebounce from 'lodash/debounce'

import Search from './components/Search'
import Row from '@common/Row'
import Table from '@common/Table'
import EMPTY_USER_TABLE_DATA from '@constants/table'
import useFilteredEntity from '@hooks/useFilteredEntity'
import useGetUsers from '@hooks/useGetUsers'
import useSortEntity from '@hooks/useSortEntity'
import { COLORS } from '@themes'
import getTableHeaders from '@utils/table'

const Home: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { users, getUsers, isFetchingUsers } = useGetUsers()
  const filteredData = useFilteredEntity(searchTerm, users)
  const { data, onPressColumn, sortingSymbols } = useSortEntity(filteredData)
  const [onDebounceSearchText] = useState(() =>
    lodashDebounce((input: string): void => setSearchTerm(input), 300),
  )

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>USER TABLE</Text>
      <Search
        onChangeText={onDebounceSearchText}
        placeholder="Search for name or age"
        value={searchTerm}
      />
      <Table data={data} onRefresh={getUsers} refreshing={isFetchingUsers}>
        <Row
          data={
            data?.length > 1
              ? getTableHeaders(data[0], true, sortingSymbols)
              : getTableHeaders(EMPTY_USER_TABLE_DATA)
          }
          isHeader={true}
          onPressCell={onPressColumn}
        />
      </Table>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS?.white,
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

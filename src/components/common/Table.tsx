import { FC, ReactNode } from 'react'
import {
  ScrollView,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'

import Row from './Row'
import { CELL_MIN_COLUMNS } from '@constants/cell'
import User from '@customtypes/user'
import { COLORS } from '@themes'

interface Props {
  data: User[]
  cellContainerStyle?: ViewStyle
  cellLabelStyle?: TextStyle
  rowContainerStyle?: ViewStyle
  tableContainerStyle?: ViewStyle
  children?: ReactNode
}

const Table: FC<Props> = (props) => {
  const {
    data,
    cellContainerStyle = {},
    cellLabelStyle = {},
    rowContainerStyle = {},
    tableContainerStyle = {},
    children,
  } = props

  const numberOfColumns = Object.keys(data?.[0] ?? [])?.length

  const containerStyles: ViewStyle = StyleSheet.flatten([
    {},
    numberOfColumns <= CELL_MIN_COLUMNS && styles.container,
  ])

  const tableStyles: ViewStyle = StyleSheet.flatten([
    styles.table,
    tableContainerStyle,
  ])

  return (
    <ScrollView contentContainerStyle={containerStyles} horizontal={true}>
      <View style={tableStyles}>
        {children}
        {data?.map((user: User) => {
          return (
            <Row
              key={user.name}
              cellContainerStyle={cellContainerStyle}
              cellLabelStyle={cellLabelStyle}
              data={user}
              isHeader={false}
              rowContainerStyle={rowContainerStyle}
            />
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  table: {
    borderColor: COLORS?.mineShaft,
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 20,
  },
})

export default Table

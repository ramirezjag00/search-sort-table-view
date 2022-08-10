import { FC, ReactElement } from 'react'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native'

import Row from './Row'
import { CELL_MIN_COLUMNS, TABLE_MARGIN_HORIZONTAL } from '@constants/cell'
import { TableData } from '@customtypes/row'
import { COLORS } from '@themes'

interface Props {
  data: TableData[]
  cellContainerStyle?: ViewStyle
  cellLabelStyle?: TextStyle
  rowContainerStyle?: ViewStyle
  tableContainerStyle?: ViewStyle
}

const keyExtractor = (item: TableData, index: number): string => `${index}`

const Table: FC<Props> = (props) => {
  const {
    data,
    cellContainerStyle = {},
    cellLabelStyle = {},
    rowContainerStyle = {},
    tableContainerStyle = {},
  } = props

  const numberOfColumns = Object.keys(data?.[0] ?? [])?.length

  const containerStyles: ViewStyle = StyleSheet.flatten([
    styles.container,
    numberOfColumns <= CELL_MIN_COLUMNS && { width: '100%' },
  ])

  const tableStyles: ViewStyle = StyleSheet.flatten([
    styles.table,
    tableContainerStyle,
    numberOfColumns <= CELL_MIN_COLUMNS && { flex: 1 },
  ])

  if (!data?.length) {
    return null
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: TableData
    index: number
  }): ReactElement => {
    return (
      <Row
        cellContainerStyle={cellContainerStyle}
        cellLabelStyle={cellLabelStyle}
        data={item}
        isHeader={!index}
        rowContainerStyle={rowContainerStyle}
      />
    )
  }

  return (
    <ScrollView horizontal nestedScrollEnabled>
      <FlatList
        contentContainerStyle={containerStyles}
        data={data}
        extraData={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        scrollEventThrottle={16}
        style={tableStyles}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS?.mineShaft,
    borderWidth: 1,
  },
  table: {
    marginHorizontal: TABLE_MARGIN_HORIZONTAL,
  },
})

export default Table

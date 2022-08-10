import { FC } from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'

import Cell from './Cell'
import RowData from '@customtypes/row'
import User from '@customtypes/user'
import { COLORS } from '@themes'

interface Props {
  isHeader: boolean
  data: User | RowData
  cellContainerStyle?: ViewStyle
  cellLabelStyle?: TextStyle
  rowContainerStyle?: ViewStyle
}

const Row: FC<Props> = (props) => {
  const {
    isHeader = false,
    data,
    cellContainerStyle = {},
    cellLabelStyle = {},
    rowContainerStyle = {},
  } = props

  const columns = Object.keys(data)
  const rowStyles: ViewStyle = StyleSheet.flatten([
    styles.row,
    rowContainerStyle,
  ])

  return (
    <View style={rowStyles}>
      {columns?.map((column: string) => {
        return (
          <Cell
            key={column}
            containerStyle={cellContainerStyle}
            isHeader={isHeader}
            label={data[column as keyof User]}
            labelStyle={cellLabelStyle}
            numberOfColumns={columns?.length}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    borderBottomColor: COLORS?.mineShaft,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

export default Row

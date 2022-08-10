import { FC, ReactElement } from 'react'
import { FlatList, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'

import Cell from './Cell'
import { TableData } from '@customtypes/row'
import { COLORS } from '@themes'

interface Props {
  isHeader: boolean
  data: TableData
  cellContainerStyle?: ViewStyle
  cellLabelStyle?: TextStyle
  rowContainerStyle?: ViewStyle
}

const keyExtractor = (item: string, index: number): string => `${item}-${index}`

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

  const renderItem = ({ item }: { item: string }): ReactElement => {
    return (
      <Cell
        containerStyle={cellContainerStyle}
        isHeader={isHeader}
        label={data[item as keyof TableData]}
        labelStyle={cellLabelStyle}
        numberOfColumns={columns?.length}
      />
    )
  }

  return (
    <View style={rowStyles}>
      <FlatList
        data={columns}
        horizontal={true}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        scrollEnabled={false}
        scrollEventThrottle={16}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    borderBottomColor: COLORS?.mineShaft,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})

export default Row

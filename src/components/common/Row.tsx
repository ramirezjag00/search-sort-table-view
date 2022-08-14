import { FC, ReactElement } from 'react'
import {
  FlatList,
  Platform,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'

import Cell from './Cell'
import { TableData } from '@customtypes/row'
import { COLORS } from '@themes'

interface Props {
  isHeader: boolean
  data: TableData
  cellContainerStyle?: ViewStyle
  cellLabelStyle?: TextStyle
  rowContainerStyle?: ViewStyle
  onPressCell?: (column: string | number) => void
}

const keyExtractor = (item: string, index: number): string => `${item}-${index}`

const Row: FC<Props> = (props) => {
  const {
    isHeader = false,
    data,
    cellContainerStyle = {},
    cellLabelStyle = {},
    rowContainerStyle = {},
    onPressCell = () => null,
  } = props

  const columns = Object.keys(data)
  const rowStyles: ViewStyle = StyleSheet.flatten([
    styles.row,
    rowContainerStyle,
  ])

  const renderItem = ({ item }: { item: string }): ReactElement => {
    const label = data[item as keyof TableData]
    const onPress = () => onPressCell(label)

    return (
      <Cell
        containerStyle={cellContainerStyle}
        isHeader={isHeader}
        label={label}
        labelStyle={cellLabelStyle}
        numberOfColumns={columns?.length}
        onPress={onPress}
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
    ...Platform.select({
      ios: {
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      android: {
        borderBottomWidth: 1,
      },
    }),
  },
})

export default Row

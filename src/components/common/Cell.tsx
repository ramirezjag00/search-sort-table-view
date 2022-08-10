import { memo, FC, useMemo } from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

import {
  CELL_LANDSCAPE_MULTIPLIER,
  CELL_MIN_COLUMNS,
  CELL_PORTRAIT_MULTIPLIER,
} from '@constants/cell'
import { useDeviceContext } from '@contexts/DeviceContext'
import { COLORS } from 'styles/themes'

interface Props {
  isHeader: boolean
  label: string | number
  containerStyle?: ViewStyle
  labelStyle?: TextStyle
  numberOfColumns?: number
}

const Cell: FC<Props> = (props) => {
  const { isPortrait, screenWidth } = useDeviceContext()
  const {
    isHeader = false,
    label = '',
    containerStyle = {},
    labelStyle = {},
    numberOfColumns = 0,
  } = props

  const containerStyles: ViewStyle = StyleSheet.flatten([
    styles.container,
    { backgroundColor: isHeader ? COLORS?.wildSand : COLORS?.white },
    containerStyle,
  ])

  const calculateCellWidth = useMemo((): number => {
    if (numberOfColumns <= CELL_MIN_COLUMNS) {
      return screenWidth / numberOfColumns
    } else if (isPortrait) {
      return screenWidth * CELL_PORTRAIT_MULTIPLIER
    } else {
      return screenWidth * CELL_LANDSCAPE_MULTIPLIER
    }
  }, [isPortrait, numberOfColumns, screenWidth])

  const labelStyles: TextStyle = StyleSheet.flatten([
    styles.label,
    {
      fontWeight: isHeader ? 'bold' : 'normal',
      width: calculateCellWidth,
      fontSize: isHeader ? 18 : 15,
    },
    labelStyle,
  ])

  return (
    <View style={containerStyles}>
      <Text numberOfLines={2} style={labelStyles}>
        {label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRightColor: COLORS?.mineShaft,
    borderRightWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'flex-start',
  },
  label: {
    color: COLORS?.mineShaft,
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
})

export default memo(Cell)

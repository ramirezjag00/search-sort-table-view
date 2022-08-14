import { memo, FC, useMemo } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

import {
  CELL_LANDSCAPE_MULTIPLIER,
  CELL_MIN_COLUMNS,
  CELL_PORTRAIT_MULTIPLIER,
  SAFE_AREA_PORTRAIT_WIDTH,
  TABLE_MARGIN_HORIZONTAL,
} from '@constants/cell'
import { useDeviceContext } from '@contexts/DeviceContext'
import { COLORS } from 'styles/themes'

interface Props {
  isHeader: boolean
  label: string | number
  containerStyle?: ViewStyle
  labelStyle?: TextStyle
  numberOfColumns?: number
  onPress?: () => void
}

const Cell: FC<Props> = (props) => {
  const { isPortrait, screenWidth } = useDeviceContext()
  const {
    isHeader = false,
    label = '',
    containerStyle = {},
    labelStyle = {},
    numberOfColumns = 0,
    onPress,
  } = props

  const containerStyles: ViewStyle = StyleSheet.flatten([
    styles.container,
    { backgroundColor: isHeader ? COLORS?.wildSand : COLORS?.white },
    containerStyle,
  ])

  const calculateCellWidth = useMemo((): number => {
    const margin = isPortrait
      ? TABLE_MARGIN_HORIZONTAL * 2
      : SAFE_AREA_PORTRAIT_WIDTH
    if (numberOfColumns <= CELL_MIN_COLUMNS) {
      return (screenWidth - margin) / numberOfColumns
    } else if (isPortrait) {
      return (screenWidth - margin) * CELL_PORTRAIT_MULTIPLIER
    } else {
      return (screenWidth - margin) * CELL_LANDSCAPE_MULTIPLIER
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
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={!isHeader}
      onPress={onPress}
      style={containerStyles}>
      <Text numberOfLines={10} style={labelStyles}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRightColor: COLORS?.mineShaft,
    ...Platform.select({
      ios: {
        borderRightWidth: StyleSheet.hairlineWidth,
      },
      android: {
        borderRightWidth: 0.5,
      },
    }),
  },
  label: {
    color: COLORS?.mineShaft,
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
})

export default memo(Cell)

import { FC, useRef } from 'react'
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { COLORS } from '@themes'

interface Props {
  value: string
  onChangeText: (input: string) => void
}

const Search: FC<Props> = (props) => {
  const { value, onChangeText } = props
  const onClearForm = (): void => onChangeText('')
  const inputRef = useRef<TextInput>(null)
  const inputStyles = StyleSheet.flatten([
    styles.searchBox,
    !value.length && styles.placeHolder,
  ])

  const onSubmitEditing = () => Keyboard.dismiss()

  return (
    <View style={styles.searchContainer}>
      <TextInput
        ref={inputRef}
        autoCorrect={false}
        defaultValue={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder="Search for name or age"
        placeholderTextColor={COLORS?.silverChalice}
        returnKeyType="search"
        selectionColor={COLORS?.vistaBlue}
        style={inputStyles}
        underlineColorAndroid="transparent"
        value={value}
      />
      {!!value.length && (
        <TouchableOpacity onPress={onClearForm} style={styles.close}>
          <Text>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    position: 'relative',
    ...Platform.select({
      ios: {
        paddingHorizontal: 10,
        marginHorizontal: 20,
        paddingVertical: 10,
      },
      android: {
        paddingVertical: 5,
        paddingHorizontal: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: COLORS?.wildSand,
    borderRadius: 4,
    flexDirection: 'row',
    margin: 10,
  },
  searchBox: {
    color: COLORS.mineShaft,
    flex: 1,
    fontSize: 14,
  },
  placeHolder: {
    fontSize: 14,
  },
  close: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})

export default Search

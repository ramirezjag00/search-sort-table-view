import { useEffect, useState } from 'react'
import { Dimensions, ScaledSize } from 'react-native'

import Orientation from '@customtypes/orientation'

const defaultScreen = Dimensions.get('screen')

const useOrientation = (): Orientation => {
  const [isPortrait, setIsPortrait] = useState<boolean>(true)
  const [newScreen, setNewScreen] = useState<ScaledSize>(defaultScreen)

  useEffect(() => {
    const onChange = ({ screen }: { screen: ScaledSize }) => {
      const { width, height } = screen
      setNewScreen(screen)
      setIsPortrait(height >= width)
    }

    const subscription = Dimensions.addEventListener('change', onChange)

    return () => {
      if (typeof subscription?.remove === 'function') {
        subscription.remove()
      }
    }
  }, [])

  return {
    isPortrait,
    screenWidth: newScreen.width,
    screenHeight: newScreen.height,
  }
}

export default useOrientation

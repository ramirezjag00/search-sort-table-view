import { createContext, FC, ReactNode, useContext } from 'react'
import { Dimensions } from 'react-native'

import Orientation from '@customtypes/orientation'
import useOrientation from '@hooks/useOrientation'

const { width, height } = Dimensions.get('screen')

interface Props {
  children: ReactNode
}

const DeviceContext = createContext<Orientation>({
  isPortrait: true,
  screenWidth: width,
  screenHeight: height,
})

const DeviceContextProvider: FC<Props> = (props) => {
  const { children } = props
  const orientationData = useOrientation()

  return (
    <DeviceContext.Provider value={orientationData}>
      {children}
    </DeviceContext.Provider>
  )
}

const useDeviceContext = () => useContext(DeviceContext)

export { DeviceContext, DeviceContextProvider, useDeviceContext }

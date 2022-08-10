import { FC } from 'react'

import { DeviceContextProvider } from '@contexts/DeviceContext'
import Home from '@screens/Home'

const App: FC = () => {
  return (
    <DeviceContextProvider>
      <Home />
    </DeviceContextProvider>
  )
}

export default App

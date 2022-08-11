import { FC } from 'react'

import { DeviceContextProvider } from '@contexts/DeviceContext'
import Home from '@screens/Home/Home'

const App: FC = () => {
  return (
    <DeviceContextProvider>
      <Home />
    </DeviceContextProvider>
  )
}

export default App

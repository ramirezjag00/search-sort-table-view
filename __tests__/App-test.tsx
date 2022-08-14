/**
 * @format
 */

import 'react-native'
import { create } from 'react-test-renderer'

import App from '../App'

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  create(<App />)
})

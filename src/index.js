import React from 'react'
import ReactDOM from 'react-dom'
import { Dashboard } from './pages/Dashboard'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Dashboard />, document.getElementById('root'))

serviceWorker.unregister()

import {
  StrictMode,
} from 'react'
import {
  createRoot,
} from 'react-dom/client'

// script extensions can also be omitted
import App from './App'

// the initial render
createRoot(document.getElementById('root')).render(
  // jsx syntax; scripts should be named with ".jsx" to tell vite to translate
  <StrictMode>
    <App />
  </StrictMode>
  /* translated to
  React.createElement(
    StrictMode,
    null,
    React.createElement(
      App,
      null,
    ),
  )
  */
)

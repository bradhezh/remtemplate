import {
  StrictMode,
} from 'react'
import {
  createRoot,
} from 'react-dom/client'

// script extensions can also be omitted
import App from './App'

createRoot(document.getElementById('root')).render(
  // the script should be named with ".jsx" to tell vite to translate
  <StrictMode>
    <App />
  </StrictMode>,
)

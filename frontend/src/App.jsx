import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Signup from './components/Signup'
import Login from './components/Login'
import Main from './components/Main'
import NotFound from './components/NotFound'

// the 1st letter of components must be capital
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        {/* parameters, got in the component: const {id} = useParams()
        <Route path="/item/:id" element={<Item />} />
        */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App

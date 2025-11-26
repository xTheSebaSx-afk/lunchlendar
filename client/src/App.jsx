import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Panel from './pages/Panel'
import ProtectedRoute from './components/ProtectedRoute'
import { UserProvider } from './context/UserContext'

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<ProtectedRoute/>}>
            <Route path='/panel' element={<Panel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App

import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dishes from './pages/Dishes'
import ProtectedRoute from './components/ProtectedRoute'
import { UserProvider } from './context/UserContext'
import { DishesProvider } from './context/DishesContext'
import Dish from './pages/dishes/Dish'

function App() {

  return (
    <UserProvider>
      <DishesProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dishes' element={<Dishes />} />
            <Route path='/dishes/:id' element={<Dish />} />
            <Route element={<ProtectedRoute />}></Route>
          </Routes>
        </BrowserRouter>
      </DishesProvider>
    </UserProvider>
  )
}

export default App

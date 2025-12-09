import { Outlet, Navigate } from 'react-router-dom'
import AuthManager from "..//api/ApiManager"
import { useUser } from '../context/UserContext'

function ProtectedRoute() {

    const { user, loading } = useUser();

    if (loading) {
        return (
            <div className='absolute bg-gray-300/70 w-screen h-screen flex items-center justify-center'>
                <h1 className='text-3xl'>Cargando...</h1>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default ProtectedRoute
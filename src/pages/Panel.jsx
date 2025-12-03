import React from 'react'
import { useUser } from '../context/UserContext'

function Panel() {
    const { user, logout } = useUser()

    document.title = `Panel de ${user.username}`

    const handleLogout = async () => {
        await logout();
    }

    return (
        <>
            <h1 className='w-screen p-3 '>Bienvenido <span className='text-emerald-500'>{user.username}</span></h1>
            <button className='absolute top-0 right-0 m-3 mr-4 rounded border-emerald-200 to-red-400 from-blue-300 bg-linear-210 p-3' onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Panel
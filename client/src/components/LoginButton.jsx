import { useState } from 'react'
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

function LoginButton() {

    const [isOpen, setIsOpen] = useState(false);
    const { user, isAuthenticated, logout } = useUser()
    const handleLogout = async () => {
        await logout();
    }

    return (
        <>
            {!isAuthenticated ? (
                <Link className="from-[#94c255] to-[#398a5b] from-30% bg-linear-150 px-5 py-2 rounded border-[#366f43] text-white transition-all duration-300 hover:scale-105 brightness-110" to="/login" target="_blank">Login</Link>
            ) : (<>
                <ul>
                    <li onClick={() => setIsOpen(!isOpen)}><p>Bienvenido, <span className='text-shadow-[0_0px_2px_#000] underline'>{user.username}</span></p></li>
                    {isOpen && (
                        <li className='absolute'>
                            <button onClick={() => handleLogout()} className='border-l-red-400 border-l-2 pl-2 text-white'>Cerrar sesión</button>
                        </li>
                    )}
                </ul>
            </>)}
        </>
    )
}

export default LoginButton
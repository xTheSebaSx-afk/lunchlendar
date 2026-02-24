import { useState } from "react"
import { Link, useNavigate, } from "react-router-dom"
import { useUser } from '../../context/UserContext'
import { useEffect } from "react"
import UserIcon from '@icons/UserIcon.jsx'
import PadlockIcon from '@icons/PadlockIcon.jsx'
import WarningIcon from '@icons/WarningIcon.jsx'

const ErrorWarn = ({ error }) => {
    return (
        <>
            <div className="from-[#f6e9f3] to-[#f9ecf5] bg-linear-120 w-[90%] rounded-lg p-2">
                <WarningIcon className="size-[30px] mr-3 inline" />
                <span className="text-[#895e6a] md:text-[17px] text-[12px]">{error}</span>
            </div>
        </>
    )
}

const Form = ({ error, handleSubmit, setUsername, setPassword, buttonDisabled }) => {
    return (
        <>
            <form onSubmit={handleSubmit} className="bg-linear-60 to-[#f5e8f8] from-[#bcc2f1] w-[80%] max-w-[400px] h-[65%] my-5 rounded-2xl shadow [box-shadow:0px_1px_3px_1px_#000c] flex flex-col items-center p-4 gap-3">
                <h2 className="my-2 text-[#3a3c4b]">Iniciar sesión</h2>
                <div className="w-[90%] flex flex-col gap-4">
                    <div className="bg-[#fdfdff] rounded-lg p-2 shadow">
                        <UserIcon className="sm:size-6 inline mr-1 size-[17px]" />
                        <input type="text" placeholder="Nombre de usuario" className="focus-visible:outline-0 w-[90%]" onChange={(e) => setUsername(e.target.value)} maxLength='25' />
                    </div>
                    <div className="bg-[#fdfdff] rounded-lg p-2 shadow">
                        <PadlockIcon className="sm:size-6 inline mr-1 size-[17px]" />
                        <input type="password" placeholder="Contraseña" className="focus-visible:outline-0 w-[90%]" onChange={(e) => setPassword(e.target.value)} maxLength='25' />
                    </div>
                    <input type="submit" value={buttonDisabled ? "Iniciando sesión..." : "Iniciar sesión"} className={`bg-linear-120 from-[#388861] to-[#85a258] rounded-2xl p-4 text-white hover:[box-shadow:0px_1px_3px_1px_#000a] focus:outline-[#dbeee6] focus:outline-2 ${buttonDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} disabled={buttonDisabled} />
                </div>
                <span>¿No tienes cuenta? <Link to="/register" className="text-[#5562b5] underline ">Registrate</Link></span>
                {error && <ErrorWarn error={error} />}
            </form>
        </>
    )
}

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const { login, isAuthenticated } = useUser()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        try {
            setIsLoading(true);
            const res = await login(username, password)
            if (res?.status === 200) {
                navigate("/panel")
            }
        } catch (e) {
            setError(e?.response?.data?.error || "Error al iniciar sesión")
        } finally {
            setIsLoading(false)
        }

    }

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/panel")
        }
    }, [isAuthenticated])

    useEffect(() => {
        document.title = 'LunchLendar | Login'
    }, [])

    useEffect(() => {
        if (!error) return

        const timer = setTimeout(() => {
            setError("")
        }, 5000)

        return () => clearTimeout(timer)
    }, [error])

    return (
        <main className='w-screen h-screen flex justify-center items-center flex-col pt-4' id="login-page">
            <h1 className="font-bold md:text-5xl text-3xl text-[#1c4546] w-screen text-center">Lunch Calendar</h1>
            <h2 className="text-gray-500 text-2xl">Login</h2>
            <Form error={error} handleSubmit={(e) => handleSubmit(e)} setUsername={setUsername} setPassword={setPassword} buttonDisabled={isLoading} />
        </main>
    )
}


export default Login
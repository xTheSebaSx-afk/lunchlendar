import { useState } from "react"
import { Link, useNavigate, } from "react-router-dom"
import { useUser } from '../../context/UserContext'

const FormInput = ({ label, type = 'text', example, onChange }) => {
    return (
        <>
            <div className="m-4">
                <label className="mr-2" htmlFor={label}>{label}</label>
                <input className="p-2" type={type} placeholder={example} id={label} onChange={onChange} />
            </div>
        </>
    )
}

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { login } = useUser()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(username, password)
            if (res?.status === 200) {
                navigate("/panel")
            }
        } catch (e) {
            setError(e.response.data.error || "Error al iniciar sesión")
        }

    }

    const navigate = useNavigate()

    document.title = 'LunchLendar | Login'

    return (
        <main className='w-screen h-screen bg-indigo-300 flex justify-center items-center'>
            <div className="bg-purple-400 rounded p-3 md:w-100 w-70 md:h-100 h-80">
                <h1 className="md:text-4xl text-2xl text-white m-5 text-center underline">LunchLendar | Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <FormInput example="Usuario" label="Username" onChange={(e) => setUsername(e.target.value)} />
                    <FormInput type="password" example="Contraseña" label="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value="Iniciar Sesión" className="bg-purple-500 text-white rounded p-2 self-center cursor-pointer" />
                    <Link to="/register" className="text-blue-800 p-2 mt-2 text-right">¿No tienes cuenta?</Link>
                </form>
                {error && <p className="text-red-500 text-center mt-4 bg-white rounded w-max m-auto p-2">{error}</p>}
            </div>
        </main>
    )
}


export default Login
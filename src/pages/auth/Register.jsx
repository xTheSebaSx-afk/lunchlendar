import { useState } from "react";
import AuthManager from "../../api/AuthManager";
import { useNavigate } from 'react-router-dom'

const FormInput = ({ label, type = 'text', example, onChange }) => {
    return (
        <>
            <div className="m-4">
                <label className="after:content-[':'] underline" htmlFor={label}>{label}</label>
                <input className="mt-1 w-full bg-white p-1" type={type} placeholder={example} id={label} onChange={onChange} />
            </div>
        </>
    )
}

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const useNav = useNavigate();

    const [error, setError] = useState("");

    const rol = "user";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await AuthManager.post("/register", { username, password, email, role: rol })
            if (res?.status === 200) {
                useNav("/login")
                alert("Usuario registrado con exito")
            }
        } catch (error) {
            setError(error?.response?.data?.error || "Error al registrarse")
        }

    }

    return (
        <>
            <main className="w-screen h-screen bg-pink-300/50 flex justify-center items-center flex-col">
                <h1 className="text-2xl">Registrarse</h1>
                <form onSubmit={handleSubmit} className="bg-emerald-300/80 p-3 m-4 flex flex-col h-100 w-100">
                    <FormInput example="Usuario" label="Username" onChange={(e) => setUsername(e.target.value)} />
                    <FormInput type="password" example="Contraseña" label="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                    <FormInput type="email" example="Email" label="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="submit" value="Registrarse" className="bg-red-500 text-white rounded p-2 self-center cursor-pointer" />
                    {error && <p className="text-red-500 text-center mt-4 bg-white rounded w-max m-auto p-2">{error}</p>}
                </form>
            </main>
        </>
    )
}

export default Register
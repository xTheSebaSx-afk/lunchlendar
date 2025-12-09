import React from 'react'
import { useUser } from '../context/UserContext'
import { useEffect, useState } from 'react'
import { useDishes } from '../context/DishesContext'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const RecipeCard = ({ dish, buttonOnClick }) => {
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-1 gap-4">
                <div className="bg-blue-400 rounded p-3 flex flex-col gap-3 md:col-span-2">
                    <h2 className="underline text-xl font-semibold">
                        {dish.name}
                    </h2>
                    <p className="text-sm">
                        {dish.description}
                    </p>
                    <p className="font-bold mt-2">
                        Precio: {dish.price}
                    </p>
                    <button className='cursor-pointer bg-sky-400 rounded' onClick={buttonOnClick}>Ver más</button>
                </div>
                <div className="bg-gray-400 rounded p-3 shadow flex flex-col md:col-start-3">
                    <h3 className="font-semibold mb-2">Ingredientes</h3>
                    <ul className="list-disc pl-5">
                        {dish.ingredients.map((i, j) => (
                            <li key={j}>{i}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

function Panel() {
    const navigate = useNavigate();

    const { user, logout } = useUser()
    const [searchName, setSearchName] = useState('');

    const { dishes } = useDishes()

    useEffect(() => {
        document.title = `Panel de ${user.username}`
    }, [])

    const handleLogout = async () => {
        await logout();
    }

    const filtered = dishes.filter(d => d.name.toLowerCase().includes(searchName.toLowerCase()));

    const handleOnClick = (id) => {
        navigate(`/dishes/${id}`);
    }

    return (
        <>
            <h1 className='m-3 text-1xl'>Bienvenido <span className='text-emerald-500'>{user.username}</span></h1>
            <button className='absolute top-0 right-0 m-3 mr-4 rounded border-emerald-200 to-red-400 from-blue-300 bg-linear-210 p-3 hover:text-2xl hover:p-5 transition-all duration-300 cursor-pointer' onClick={handleLogout}>Logout</button>
            <p className='m-2'>Busca tus recetas favoritas</p>
            <nav className='w-full p-2'>
                <input className='rounded from-cyan-300 overflow-auto to-purple-500 bg-linear-210 p-2 w-full ' type='text' placeholder='Ingrese el nombre de la receta' onChange={(e) => setSearchName(e.target.value)} />
            </nav>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 p-4'>
                {filtered.length ? filtered.map((d, i) => {
                    return (
                        <RecipeCard dish={d} key={i} buttonOnClick={() => handleOnClick(d._id)} />
                    )
                }) : <p>No hay recetas disponibles</p>}
            </div>
        </>
    )
}

export default Panel
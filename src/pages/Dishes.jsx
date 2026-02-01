import ApiManager from '../api/ApiManager'
import { useUser } from '../context/UserContext'
import { useEffect, useState } from 'react'
import { useDishes } from '../context/DishesContext'
import { useNavigate, Link } from 'react-router-dom'
import Footer from '../components/Footer'

/**
 * 
 * @param {{dish: import("../types/dish").Dish}} dish
 */
const StarredRecipe = ({ dish }) => {

    if (!dish) return null;

    return (
        <>
            <div className="grid gridl-cols-[100%] md:grid-cols-[350px_1fr] grid-rows-[210px] overflow-hidden rounded-lg bg-[#fefcfe] p-2 my-4 shadow-amber-300 shadow-lg">
                <img src="/food.png" alt="" className='h-[210px] w-full md:w-[350px] rounded-l-lg' />
                <div className="flex">
                    <div className='w-[170%] bg-[#ffffff] px-3 flex-col flex'>
                        <h3>{dish.name}</h3>
                        <p>{dish.description}</p>
                        <p>Precio: S/.<span>{dish.price.toFixed(2)}</span></p>
                        <p>Categoría: {dish.category}</p>
                        <div className='self-end mt-auto flex gap-4'>
                            <div className='flex items-center gap-1'>
                                <img src="/dislike.svg" alt="dislike" className='size-[17px]' />
                                <p>{dish.dislikes}</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <img src="/like.svg" alt="like" className='size-[17px]' />
                                <p>{dish.likes}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-start capitalize flex-col bg-[#eaebea] w-full p-3'>
                        <h3>Ingredientes</h3>
                        <ul className='w-full flex flex-col justify-center gap-2 h-full'>
                            {dish.ingredients.slice(0, 5).map(ingredient => (
                                <li className='' key={ingredient}>
                                    <p className='flex items-center gap-1'>
                                        <img src="/leave.svg" alt="leave" className='size-5' /> {ingredient}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

/**
 * @param {{dish: import("../types/dish").Dish}} dish
 */
const RecipeCard = ({ dish, buttonOnClick }) => {
    return (
        <>
            <div className="grid grid-cols-[100%]  md:grid-rows-[160px] overflow-hidden rounded-lg bg-[#fefcfe] p-2 hover:shadow-lg">
                <img src="/food.png" alt="" className='h-40 w-full  rounded-l-lg' />
                <div className="bg-[#efeef0] p-2 flex flex-col">
                    <h3 className="text-2xl w-max hover:underline"><Link className='block' to={`/dishes/${dish._id}`}>{dish.name}</Link></h3>
                    <p className="">{dish.description}</p>
                    <p className='text-[#565561]'>Precio: S/.<span>{dish.price.toFixed(2)}</span></p>
                    <div className='self-end mt-auto flex gap-4'>
                        <div className='flex items-center gap-1'>
                            <img src="/dislike.svg" alt="dislike" className='size-[17px]' />
                            <p>{dish.dislikes}</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <img src="/like.svg" alt="like" className='size-[17px]' />
                            <p>{dish.likes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const SearchBar = () => {
    return (
        <div className='w-[83%] m-auto mt-[50px]'>
            <input type="text" placeholder="Buscar" className='w-[75%] bg-[#f1f0f9] p-2 rounded-lg' />
            <button className='w-[calc(100% - 75%)]'>Buscar</button>
        </div>
    )
}

/**
* @param {{ dishes: import("../types/dish").Dish[] }} dishes
*/
const DishesContainer = ({ dishes, page }) => {
    return (
        <main className='w-[80%] mx-auto mt-[50px]'>
            <StarredRecipe dish={dishes[0]} />
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {dishes.slice(1, page + 11).map(dish => (
                    <RecipeCard dish={dish} key={dish._id} />
                ))}
            </div>
        </main>
    )
}

const Header = ({ isAuthenticated, user }) => {
    return (
        <header className="p-2 to-[#c1dff9] from-[#eef1fd] from-50% bg-linear-330 flex justify-between items-center relative top-3 [box-shadow:0px_1px_10px_2px_#abc6dd] text-[#1b3a49] text-[18px] text-center px-8">
            <Link className='flex justify-center items-center gap-2' to="/">
                <img src="/icon.svg" alt="" className='size-[30px]' />
                <h2>Lunch Calendar</h2>
            </Link>
            {!isAuthenticated ? (
                <Link to="/login" target='_blank' className='from-[#94c255] to-[#398a5b] from-30% bg-linear-150 px-5 py-2 rounded border-[#366f43] text-white transition-all duration-300 hover:brightness-110 hover:scale-105'>Login</Link>
            ) : (<span>
                Bienvenido, {user.username}
            </span>)}
        </header>
    )
}

function Panel() {
    const navigate = useNavigate();

    const { user, logout, isAuthenticated } = useUser()

    const { dishes, addDish, loading } = useDishes()

    const [page, setPage] = useState(0);

    useEffect(() => {
        document.title = `Platos | Lunch Calendar`
    }, [])

    const handleLogout = async () => {
        await logout();
    }

    const filtered = [...dishes];

    return (
        <div id='login-page' className='pt-4'>
            <Header isAuthenticated={isAuthenticated} user={user} />
            <SearchBar />
            {loading ? (
                <div className='w-[80%] mx-auto mt-[50px]'>
                    <h1 className='text-center'>Cargando...</h1>
                </div>
            ) : (
                <DishesContainer dishes={filtered.sort((a, b) => ((a.likes - a.dislikes) > (b.likes - b.dislikes)) ? -1 : 1)} page={page} />
            )}
            <Footer />
        </div>
    )
}

export default Panel
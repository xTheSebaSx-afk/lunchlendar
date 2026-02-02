import { useUser } from '../context/UserContext'
import { useEffect, useState } from 'react'
import { useDishes } from '../context/DishesContext'
import { Link, useSearchParams } from 'react-router-dom'
import Footer from '../components/Footer'
import LoginButton from '../components/LoginButton'

/**
 * 
 * @param {{dish: import("../types/dish").Dish}} dish
 */
const StarredRecipe = ({ dish }) => {

    if (!dish) return null;

    return (
        <>
            <div className="grid gridl-cols-[100%] md:grid-cols-[350px_1fr] grid-rows-[210px] overflow-hidden rounded-lg bg-[#fefcfe] p-2 my-4 shadow-amber-300 shadow-lg">
                <img src="/images/illustrations/food.png" alt="" className='h-[210px] w-full md:w-[350px] rounded-l-lg' />
                <div className="flex">
                    <div className='w-[170%] bg-[#ffffff] px-3 flex-col flex'>
                        <h3>{dish.name}</h3>
                        <p>{dish.description}</p>
                        <p>Precio: S/.<span>{dish.price.toFixed(2)}</span></p>
                        <p>Categoría: {dish.category}</p>
                        <div className='self-end mt-auto flex gap-4'>
                            <div className='flex items-center gap-1'>
                                <img src="/icons/dislike.svg" alt="dislike" className='size-[17px]' />
                                <p>{dish.dislikes}</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <img src="/icons/like.svg" alt="like" className='size-[17px]' />
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
                                        <img src="/icons/leave.svg" alt="leave" className='size-5' /> {ingredient}
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
            <div className="grid grid-cols-[100%]  md:grid-rows-[180x] overflow-hidden rounded-lg bg-[#fefcfe] p-2 hover:shadow-lg">
                <img src="/images/illustrations/food.png" alt="" className='h-[180px] w-full  rounded-l-lg' />
                <div className="bg-[#efeef0] p-2 flex flex-col">
                    <h3 className="text-2xl w-max hover:underline"><Link className='block' to={`/dishes/${dish._id}`}>{dish.name}</Link></h3>
                    <p className="">{dish.description}</p>
                    <p className='text-[#565561]'>Precio: S/.<span>{dish.price.toFixed(2)}</span></p>
                    <div className='self-end mt-auto flex gap-4'>
                        <div className='flex items-center gap-1'>
                            <img src="/icons/dislike.svg" alt="dislike" className='size-[17px]' />
                            <p>{dish.dislikes}</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <img src="/icons/like.svg" alt="like" className='size-[17px]' />
                            <p>{dish.likes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const SearchBar = ({ onChange }) => {
    return (
        <div className='w-[85%] m-auto mt-[50px] flex'>
            <input type="text" placeholder="Buscar" className='bg-[#f1f0f9] p-2 rounded-l-lg grow outline-none' onChange={onChange} />
            <button className='cursor-pointer bg-[#b1b1b1] p-2'>
                <img src="/icons/search.svg" alt="search" className='size-6 inline mr-2' />
                Buscar
            </button>
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
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#ecf4f2]'>
                {dishes.slice(1, page + 11).map(dish => (
                    <RecipeCard dish={dish} key={dish._id} />
                ))}
            </div>
        </main>
    )
}

/**
 * 
 * @param {{ isAuthenticated: boolean }} isAuthenticated
 * @returns 
 */
const Header = ({ isAuthenticated, user }) => {
    return (
        <header className="p-2 to-[#c1dff9] from-[#eef1fd] from-50% bg-linear-330 flex justify-between items-center relative top-3 [box-shadow:0px_1px_10px_2px_#abc6dd] text-[#1b3a49] text-[18px] text-center px-8">
            <Link className='flex justify-center items-center gap-2' to="/">
                <img src="/images/ui/icon.svg" alt="" className='size-[30px]' />
                <h2>Lunch Calendar</h2>
            </Link>
            <LoginButton />
        </header>
    )
}

function Panel() {

    const [search, setSearch] = useState('');

    const { user, logout, isAuthenticated } = useUser()

    /**
     * @type {import("../types/dish").DishesContextType}
     */
    const { dishes, addDish, loading } = useDishes()

    const [page, setPage] = useState(0);

    useEffect(() => {
        document.title = `Platos | Lunch Calendar`
    }, [])

    const handleLogout = async () => {
        await logout();
    }

    const filtered = [...dishes].filter(dish => dish.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div id='login-page' className='pt-4'>
            <Header isAuthenticated={isAuthenticated} user={user} />
            <SearchBar onChange={(e) => setSearch(e.target.value)} />
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
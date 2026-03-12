import { useEffect, useState } from 'react'
import { useDishes } from '../context/DishesContext'
import { Link, useSearchParams } from 'react-router-dom'
import Footer from "@components/Footer"
import LoginButton from '@components/LoginButton'
import DislikeIcon from '@components/icons/DislikeIcon'
import LikeIcon from '@components/icons/LikeIcon'
import SearchIcon from '@icons/SearchIcon'
import ClockIcon from '@components/icons/ClockIcon'
import AppIcon from '@components/icons/AppIcon'
import CalendarIcon from '@components/icons/CalendarIcon'

/**
 * 
 * @param {{dish: import("../types/dish").Dish}} dish
 */
const StarredRecipe = ({ dish }) => {

    if (!dish) return null;

    return (
        <>
            <div className="rounded-lg bg-[#fefcfe] my-4">
                <div className='rounded-t-lg text-center text-white text-shadow-lg shadow-[0_0px_-10px_#000] bg-[#4a9cbb] py-3'>
                    <h2 className='text-3xl font-bold'>Receta destacada:</h2>
                </div>
                <div className='bg-cover bg-center h-80 w-full bg-[url("/images/illustrations/food.png")] rounded-b-lg shadow-xl relative'>
                    <div className='absolute left-0 bottom-0 p-4 bg-[#bbfdfa88] rounded-tl-lg rounded-tr-lg w-full'>
                        <h2 className='text-3xl font-bold text-white text-shadow-lg'>{dish.name}</h2>
                        <p className='text-xl text-[#216776] font-bold'>{dish.description}</p>
                        <ul className='flex gap-2 pt-2'>
                            <li className='flex gap-1 items-center border-r border-[#938885] pr-2'>
                                <LikeIcon className="size-7" fill="#4597a8" /> {dish.opinions.filter(x => x.type == "like").length}
                            </li>
                            <li className='flex gap-1 items-center border-r border-[#938885] pr-2'>
                                <DislikeIcon className="size-7" fill="#77b4d5" /> {dish.opinions.filter(x => x.type == "dislike").length}
                            </li>
                            <li className='flex gap-1 items-center'>
                                <ClockIcon className="size-7" fill_face="#313d46" fill_hand="#313d46" /> {dish.steps.length} pasos
                            </li>
                        </ul>
                    </div>
                    <span className='absolute right-0 bottom-10 bg-[#dae0e6] pr-8 pl-4 text-xl p-2 rounded-l-full text-[#216776] font-bold'>
                        S/. {dish.price.toFixed(2)}
                    </span>
                </div>
            </div>
        </>
    )
}

/**
 * @param {{dish: import("../types/dish").Dish}} dish
 */
const RecipeCard = ({ dish }) => {
    return (
        <>
            <div className="grid md:grid-cols-[2fr_5fr] overflow-hidden rounded-lg hover:shadow-lg">
                <img src="/images/illustrations/food.png" alt="" className='h-[157px] w-full  rounded-l-lg' />
                <div className="bg-[#a86ef369] p-2 pl-4 flex flex-col relative text-wrap flex-wrap">
                    <h3 className="text-[15px] font-bold md:text-2xl w-max hover:underline my-2"><Link className='block' to={`/dishes/${dish._id}`}>{dish.name}</Link></h3>
                    <p className="text-[10px] md:text-[17px]">{dish.description}</p>
                    <div className='mt-auto rounded-tl-lg rounded-tr-lg w-full text-[#225b6d]'>
                        <ul className='flex gap-2 pt-2 flex-wrap'>
                            <li className='flex gap-1 items-center border-r border-[#938885] pr-2'>
                                <LikeIcon className="size-7" fill="#4597a8" /> {dish.opinions.filter(x => x.type == "like").length}
                            </li>
                            <li className='flex gap-1 items-center border-r border-[#938885] pr-2'>
                                <DislikeIcon className="size-7" fill="#77b4d5" /> {dish.opinions.filter(x => x.type == "dislike").length}
                            </li>
                            <li className='flex gap-1 items-center border-r border-[#938885] pr-2'>
                                <ClockIcon className="size-7" fill_face="#313d46" fill_hand="#313d46" /> {dish.steps.length} pasos
                            </li>
                            <li className='flex gap-1 items-center'>
                                <CalendarIcon className="size-5"/>
                                {new Date(dish.date.createdAt).toLocaleDateString()}
                            </li>
                        </ul>
                    </div>
                    <span className='absolute right-5 top-4 md:bottom-5 border-lg px-4 bg-[#d3dfea] md:text-[17px] py-2 rounded-full text-center font-bold h-max text-[#337589] text-[12px]'>
                        S/. {dish.price.toFixed(2)}
                    </span>
                </div>
            </div>
        </>
    )
}

const SearchBar = () => {

    const [, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        setSearchParams({ search: search })
    }

    return (
        <form className='w-full m-auto my-[15px] flex bg-[#eef1f6] rounded-[19px] border-[#93acb9] border-2 items-center pl-2' onSubmit={(e) => handleSearch(e)}>
            <button className="hover:cursor-pointer outline-amber-300" onClick={(e) => handleSearch(e)}>
                <SearchIcon className="size-[30px]" fill="#3e7892" />
            </button>
            <input type="text" placeholder="Buscar" className='p-2 grow outline-none' onChange={(e) => setSearch(e.target.value)} />
        </form>
    )
}

/**
* @param {{ dishes: import("../types/dish").Dish[] }} dishes
*/
const DishesContainer = ({ dishes, page }) => {

    const [searchParams] = useSearchParams();

    const starred = dishes[0];

    return (
        <main className='w-[80%] mx-auto mt-[50px]'>
            {!searchParams.get("search") && <StarredRecipe dish={starred} />}
            <SearchBar />
            <div className='grid grid-cols-1 gap-4'>
                {searchParams.get("dishes") && dishes.slice(1, page * 10 + 1).map(dish => (
                    <RecipeCard dish={dish} key={dish._id} />
                ))}
                {!searchParams.get("dishes") && dishes.map(dish => (
                    <RecipeCard dish={dish} key={dish._id} />
                ))}
            </div>
        </main>
    )
}

const Header = () => {
    return (
        <header className="p-2 to-[#c1dff9] from-[#eef1fd] from-50% bg-linear-330 flex justify-between items-center relative top-3 [box-shadow:0px_1px_10px_2px_#abc6dd] text-[#1b3a49] text-[18px] text-center px-8">
            <Link className='flex justify-center items-center gap-2' to="/">
                <AppIcon alt="" className='size-[30px]' />
                <h2>Lunch Calendar</h2>
            </Link>
            <LoginButton />
        </header>
    )
}

const SeeMoreButton = ({ setPage }) => {
    const addPage = () => {
        setPage((prev) => prev + 1)
    }

    return (
        <button onClick={() => addPage()} className='w-max mt-5 bg-white/70 rounded-lg py-2 px-4 text-center mx-auto block cursor-pointer hover:scale-120 transition-all duration-300'>
            Ver más
        </button>
    )
}

function Panel() {

    /**
     * @type {import("../types/dish").DishesContextType}
     */
    const { dishes, loading } = useDishes()

    const [page, setPage] = useState(1);

    useEffect(() => {
        document.title = `Platos | Lunch Calendar`
    }, [])

    const [searchParams] = useSearchParams();

    const filtered = [...dishes].filter(dish => dish.name.toLowerCase().includes((searchParams.get("search") || "").toLowerCase()));

    return (
        <div id='login-page' className='pt-4'>
            <Header />
            {loading ? (
                <div className='w-[80%] mx-auto mt-[50px]'>
                    <h1 className='text-center'>Cargando...</h1>
                </div>
            ) : (
                <>
                    <DishesContainer dishes={filtered.sort((a, b) => ((a.opinions.filter(x => x.type == "like") - (a.opinions.filter(x => x.type == "dislike"))) > ((b.opinions.filter(x => x.type == "like")) - (b.opinions.filter(x => x.type == "dislike")))) ? -1 : 1)} page={page} />
                    {page * 10 + 1 < dishes.length && <SeeMoreButton setPage={setPage} />}
                </>
            )}
            <Footer />
        </div>
    )
}

export default Panel
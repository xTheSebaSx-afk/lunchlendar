import dayjs from "dayjs";
import "dayjs/locale/es";
import relativeTime from "dayjs/plugin/relativeTime";

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ApiManager from '../../api/ApiManager'
import { useUser } from '../../context/UserContext'
import AppIcon from '@icons/AppIcon'
import LeaveIcon from '@icons/LeaveIcon'
import UserIcon from '@icons/UserIcon'
import LikeIcon from '@icons/LikeIcon'
import DislikeIcon from '@icons/DislikeIcon'
import DropDownIcon from '@icons/DropDownIcon'
import DropUpIcon from '@icons/DropUpIcon'
import CommentIcon from "@icons/CommentIcon"

dayjs.extend(relativeTime)
dayjs.locale("es")

/**
 * @param {{ dish: import("../../types/dish").Dish }} dish
 */
const Details = ({ dish }) => {
    return (
        <>
            <ul className="flex w-full justify-around gap-5">
                <li className='flex items-center gap-1 rounded-2xl shadow-lg bg-[#f8eee5] grow justify-center px-4 py-2 flex-wrap'>
                    <LikeIcon className="size-6" fill="#c25053" />
                    <span className='text-[#743839]'>{dish.likes}</span> Likes
                </li>
                <li className='flex items-center gap-1 rounded-2xl shadow-lg bg-[#f8eee5] grow justify-center px-4 py-2 flex-wrap'>
                    <DislikeIcon className="size-6" fill="#c87c61" />
                    <span className='text-[#743839]'>{dish.dislikes}</span> Dislikes
                </li>
                <li className='flex items-center gap-1 rounded-2xl shadow-lg bg-[#f8eee5] grow justify-center px-4 py-2 flex-wrap'>
                    <CommentIcon className="size-6" fill="#80827a" />
                    <span className='text-[#743839]'>{dish.comments.length}</span> Comentarios
                </li>
            </ul>
        </>
    )
}

/**
 * @param {{dish: import("../../types/dish").Dish}} dish
 */
const Header = ({ dish }) => {

    const [opened, setOpened] = useState(false);

    const toggle = () => setOpened(!opened);

    return (
        <>
            <div className='h-[130px] sm:w-[70%] md:h-[250px] sm:h-[150px] xl:[h-370px] w-[90%] m-auto rounded-t-xl bg-[url("/images/illustrations/food.png")] bg-cover bg-center relative'>
                <div className='absolute bottom-5 left-5 wrap-break-word'>
                    <h2 className='text-white sm:text-2xl w-max md:text-4xl font-bold drop-shadow-lg'>
                        {dish.name}
                    </h2>
                    <p className='w-3/4 wrap-anywhere text-[#f8f5ef]'>{dish.description}</p>
                </div>
                <span className='bg-[#f9eee3] text-[#9e2726] p-2 px-4 rounded-full font-semibold shadow-lg absolute bottom-8 right-5'>
                    S/. {dish.price.toFixed(2)}
                </span>
            </div>
            <ul className='bg-[#f2f2fc] w-[90%] sm:w-[70%] m-auto p-5 rounded-b-xl shadow-lg'>
                <li className=''>
                    <div className='flex items-center gap-1 '>
                        <UserIcon aria-hidden className='size-[30px]' />
                        <p>Creado por <span className='font-bold'>{dish.author.username}</span></p>
                        <button>
                            {opened ? <DropUpIcon className='cursor-pointer' onClick={() => toggle()} /> : <DropDownIcon className='cursor-pointer' onClick={() => toggle()} />}
                        </button>
                    </div>
                </li>
                <li
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${opened ? "opacity-100 mt-3 pt-3 border-t border-[#eae4e5]" : "max-h-0 opacity-0 mt-0 pt-0 border-t border-transparent"} `}
                >
                    <Details dish={dish} />
                </li>
            </ul>
        </>
    )
}

/**
 * 
 * @param {{dish: import("../../types/dish").Dish}} dish
 */
const Ingredients = ({ dish }) => {
    const ingredients = dish.ingredients;

    return (
        <>
            <div className='sm:w-[70%] w-[90%] m-auto rounded-xl relative my-5 p-5 bg-white/40 shadow-[0_5px_10px_4px_rgba(0,0,0,0.2)]'>
                <ul className="flex flex-col gap-2 sm:w-[70%] w-full">
                    <li>
                        <h3 className='text-2xl underline '>
                            Ingredientes
                        </h3>
                    </li>
                    {ingredients.map((ingredient, i) => (
                        <li className="flex items-center gap-2 border-t border-[#e9e4e4] pt-2" key={i}>
                            <LeaveIcon aria-hidden className="size-5" fill="#5c7845" />
                            <p>{ingredient}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

/**
 * 
 * @param {{dish: import("../../types/dish").Dish}} dish
 */
const Comments = ({ dish }) => {

    const comments = dish.comments;

    return (
        <>
            <div className='sm:w-[70%] w-[90%] m-auto rounded-xl relative my-5 p-5 bg-white/40 shadow-[0_5px_10px_4px_rgba(0,0,0,0.2)]'>
                <h3 className='text-2xl underline mb-4'>
                    Comentarios
                </h3>
                <div className="flex flex-col gap-2 w-full">
                    {comments.map((comment, i) => (
                        <div className="flex items-center gap-2" key={i}>
                            <UserIcon aria-hidden className="size-10" />
                            <div>
                                <div className='flex items-baseline gap-2'>
                                    <p className='font-bold'>{comment.author.username}</p>
                                    <p className='text-xs text-[#8d8d8d]'>{dayjs(comment.date).fromNow()}</p>
                                </div>
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

function Dish() {
    const { user } = useUser()
    const { id } = useParams();

    /**
     * @type {[import('../../types/dish').Dish, Function]}
            */
    const [dish, setDish] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        const getDish = async () => {
            try {
                const res = await ApiManager.get(`/dishes/${id}`)
                setDish(res.data)
            } catch (e) {
                setError("Error al cargar el plato")
            }
        }
        getDish()
    }, [])

    useEffect(() => {
        document.title = dish ? `${dish?.name}. Por ${dish?.author?.username}` : "Cargando..."
    }, [dish])

    if (!dish) return <p>Cargando...</p>

    return (
        <>
            <main className='p-4' id='login-page'>
                <Link to="/">
                    <AppIcon className="fixed sm:absolute size-10 sm:top-5 sm:left-5 bottom-5 right-5" />
                </Link>
                <Header dish={dish} />
                {error && <p className="text-red-500 text-center mt-4 bg-white rounded w-max m-auto p-2">{error}</p>}
                <Ingredients dish={dish} />
                <Comments dish={dish} />
            </main>
        </>
    )
}

export default Dish

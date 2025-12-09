import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ApiManager from '../../api/ApiManager'

function Dish() {
    const { id } = useParams();

    const [dish, setDish] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        const getDish = async () => {
            try {
                const res = await ApiManager.get(`/dishes/${id}`)
                setDish(res.data)
            } catch (e) {
                console.log(e)
                setError("Error al cargar el plato")
            }
        }
        getDish()
    }, [])

    return (
        <>
            <h1>Dish</h1>
            {error && <p className="text-red-500 text-center mt-4 bg-white rounded w-max m-auto p-2">{error}</p>}
            <p>{dish?.name}</p>
            <p>{dish?.description}</p>
            <p>{dish?.price}</p>
            <p>{dish?.ingredients.join(", ")}</p>
            <p>{dish?.author}</p>
        </>
    )
}

export default Dish
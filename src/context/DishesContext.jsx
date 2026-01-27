import { createContext, useContext, useEffect, useState } from 'react'
import ApiManager from '../api/ApiManager'

const DishesContext = createContext()

export const useDishes = () => {
    return useContext(DishesContext)
}

export function DishesProvider({ children }) {
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const getDishes = async () => {
            try {
                const res = await ApiManager.get("/dishes")
                setDishes(res.data)
                setLoading(false)
            } catch (e) {
                setDishes([])
            }
        }
        getDishes()
    }, [])

    const addDish = async (dish) => {
        setDishes((prev) => [...prev, dish])
    }

    return (
        <DishesContext.Provider value={{
            dishes,
            loading,
            addDish
        }}>
            {children}
        </DishesContext.Provider>
    )
}
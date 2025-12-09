import { createContext, useContext, useEffect, useState } from 'react'
import ApiManager from '../api/ApiManager'

const DishesContext = createContext()

export const useDishes = () => {
    return useContext(DishesContext)
}

export function DishesProvider({ children }) {
    const [dishes, setDishes] = useState([])
    useEffect(() => {
        const getDishes = async () => {
            try {
                const res = await ApiManager.get("/dishes")
                setDishes(res.data)
            } catch (e) {
                setDishes([])
                console.log(e)
            }
        }
        getDishes()
    }, [])

    return (
        <DishesContext.Provider value={{
            dishes
        }}>
            {children}
        </DishesContext.Provider>
    )
}
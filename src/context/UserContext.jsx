import { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import AuthManager from '../api/ApiManager'

const UserContext = createContext(null)

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await AuthManager.get("/me");
                setIsAuthenticated(true);
                setUser(res.data);
            } catch (e) {
                setUser(null);
            }
            setLoading(false);
        }
        getUser();
    }, [isAuthenticated])

    const login = async (username, password) => {
        const res = await AuthManager.post("/login", { username, password })
        setUser(res.data);
        setIsAuthenticated(true);
        return res;
    }

    const logout = async () => {
        await AuthManager.post("/logout")
        setUser(null);
        setIsAuthenticated(false);
    }

    return (
        <UserContext.Provider value={{
            user,
            loading,
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </UserContext.Provider>
    )
}
import { createContext } from 'react'
import { useState } from 'react'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const user = sessionStorage.getItem('user')
        return user ? user : null
    })

    const [token, setToken] = useState(() => {
        const token = sessionStorage.getItem('token')
        return token ? token : null
    })
    console.log(token)

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

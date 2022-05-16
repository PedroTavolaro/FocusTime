import React, { createContext, ReactNode, useEffect, useState } from "react"

import {setCookie, parseCookies} from 'nookies';

interface UserContextData {
    user: string,
    photo: string,
    name: string,
}

interface UserProviderProps{
    children?: ReactNode;
    user?: string;
    photo?: string;
    name?: string;
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({children, ...rest} : UserProviderProps) {
 
    const [user, setUser] = useState(rest.user);
    const [photo, setPhoto] = useState(rest.photo);
    const [name, setName] = useState(rest.name);
    const [currentPhoyo, setCurrentPhoto] = useState(true)

    const cookies = parseCookies()

    function togglePhoto() {
        setCurrentPhoto(localStorage.photo)
       }

  return (

    <UserContext.Provider 
        value={{
            user,
            photo,
            name
        }}
    >
        {children}
    </UserContext.Provider>

  )
}



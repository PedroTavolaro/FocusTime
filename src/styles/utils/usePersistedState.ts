import Cookies from 'js-cookie';
import { setCookie } from 'nookies';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

// type Response<T> = [
//     T,
//     Dispatch<SetStateAction<T>>,
// ];

 function usePersistedState(key: string,  initialState: Cookies.CookieAttributes) {
    const [state, setState] = useState(() =>{
        const storageValue = Cookies.get(key);

        if(storageValue){
            return JSON.parse(storageValue)
        }else{
            return initialState
        }
        
    });

    useEffect(() => {
        setCookie(null, key, JSON.stringify(state), {
            maxAge: 86400 * 360 * 100,
            path: '/',
        });
    },[key, state]);

    return [state, setState];

}
export default usePersistedState;
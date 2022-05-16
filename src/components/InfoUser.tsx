import React, { FormEvent, useContext, useEffect, useState } from 'react';
import styles from '../styles/components/InfoUser.module.css';

import { UserContext } from '../contexts/UserContext';
import Link from 'next/link';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { parseCookies, setCookie } from 'nookies';
import { FaUserAlt } from 'react-icons/fa';
import Cookies from 'js-cookie';


type Photo = 'true' | 'false';

type PhotoContextType = {
    photo: Photo;
    togglePhoto: () => void;
}

export function InfoUser() {
    const { name } = useContext(ChallengesContext)
    const { user } = useContext(UserContext);
    const { photo } = useContext(UserContext);
    
    const [foto, setFoto] = useState('');

    const cookies = parseCookies()

    const [isChecked, setIsChecked] = useState(false)
    const [isCheckedName, setIsCheckedName] = useState(false)
//   const [currentPhoto, setCurrentPhoto] = useState<Photo>(() => {
    
//     return (storageFoto) as Photo;
//   })
const [cont, setCont] = useState(true)
    
 useEffect(() => {
     const foto = localStorage.getItem('photo')
    setFoto(`${foto}`)
 })

 

useEffect(() => {
    
    const storageValue = localStorage.getItem('photo') || null
    
    if(storageValue === "" || storageValue === 'undefined' || storageValue === null){
        setCont(false)
    }
    if(storageValue !== '' ){
        setIsChecked(true)
    }
   
    console.log(storageValue)
 
    
})

useEffect(() => {
    const storageName = Cookies.get('name')
    if(storageName === '' || storageName ==='undefined') {
        setIsCheckedName(false)
    }else{
        setIsCheckedName(true)
       
    }

})

 function photoClose(){
     setIsChecked(false)
}

 console.log(isChecked)

    return (
<>
        <div className={styles.Container}>
           
             <div className={styles.userContainer}>
                         { cont ?
                                <>
                                {isChecked ?
                                <img src={foto} alt='foto' className={styles.fotoUser}/>          
                                :
                                <FaUserAlt color="#746" size={40} className={styles.photoPadrao} />
                                } 
                                </>
                                :
                                <FaUserAlt color="#746" size={40} className={styles.photoPadrao} />
                        }
                        
             </div>
             <div className={styles.userContainer}>
                        {isCheckedName ?
                         <p> Bem vindo(a): <br />{cookies.name} </p>
                         :
                         <p> Bem vindo(a): <br />user </p>    
                    }
                    
             </div>
             <div className={styles.userContainer}>
                <Link href='/Register'>
                    <button className={styles.buttonAdd} onClick={photoClose}> add perfil</button>
                </Link>
            </div>
             
            
        </div>
</>
    )
}

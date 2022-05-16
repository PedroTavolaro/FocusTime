import Head from 'next/head';
import { BsArrowLeftShort } from 'react-icons/bs';
import { MdEmail, MdPhotoLibrary } from 'react-icons/md';
import { FaLock, FaMehBlank, FaUserAlt } from 'react-icons/fa';

import styles from '../../styles/pages/Register.module.css';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';

import Link from 'next/link';
import { notifyError, notifySuccess } from '../../styles/utils/configToast';

import Cookies from 'js-cookie';
import { parseCookies, setCookie } from 'nookies';
import { GetServerSideProps } from 'next';
import { fileURLToPath } from 'url';

export default function Register(){
    
    
    const [photo, setPhoto] = useState('');
    const [baseImage, setBaseImage] = useState('')
    const [name, setName ] = useState('');

    async function handleCreateUser(e: FormEvent) {
        e.preventDefault();
      
      }

        const uploadImage = async (e) =>{
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        console.log(base64)
        setBaseImage(`${base64}`)

      };
      

      const convertBase64=(file)=>{
        return new Promise((resolve, reject)=>{
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);

           fileReader.onload = () => {
            resolve(fileReader.result)
           }
             
             fileReader.onerror = (error) => {
                 reject(error);
             }

        })
      }

    
        useEffect(() => {
            setCookie(null, 'name', String(name), {
                MaxAge: 86400 * 360 * 100,
                path:'/',
            });
       }, [name])

    
    //    useEffect(() => {
    //     setCookie(null, 'photo', String(baseImage), {
    //         MaxAge: 86400 * 360 * 100,
    //         path: '/',
    //     })
    // }, [baseImage])

    useEffect(() => {
        localStorage.setItem('photo', baseImage);
    }, [baseImage])


    return (
        <>
        <div className={styles.containerRegister}>
            <Head>
                <title>Cadastro | Moveit</title>
            </Head>

            <section>
                <img src='landing-logo.svg' alt='logo' />
            </section>

            <section>
                <Link href='/'>
                    <a className={styles.backPage}> <BsArrowLeftShort /> </a>
                </Link>

                <form onSubmit={handleCreateUser}>
                    <p>Preencha com seus dados</p>

                    {/* transformar essas div em componentes */}
                    <div>
                        <input
                        required
                        type="text"
                        placeholder="Digite seu nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        
                        />

                        <span>Nome</span>

                        <button disabled className={styles.buttonDisabled} type="button"><FaUserAlt color="#fff" size={26} /></button>
                    </div>

                    <div>
                        <input
                        required
                        type="file"
                        placeholder=""
                        value={photo}
                        onChange={uploadImage}
                        className={styles.buttonPhoto}
                        />

                        <span>Photo</span>

                        <button disabled className={styles.buttonDisabled} type="button"><MdPhotoLibrary color="#fff" size={26} /></button>
                    </div>

                    
                    <span className={styles.areaPhoto}>
                    <img src={baseImage} className={styles.imgAdd} />
                    </span>
                    

                    <Link href={'/'}>
                    <button type="submit">Cadastrar</button>
                    </Link>
                   
                    
                </form>

            </section>

              
        </div>

        <ToastContainer />
        </>
    )

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
    const cookies = parseCookies(ctx);
    const { user } = parseCookies(ctx);
    const {baseImage} = parseCookies(ctx);
  
    return {
      props: {
        user: String(user),
        photo: String(baseImage)
      }
    }
}
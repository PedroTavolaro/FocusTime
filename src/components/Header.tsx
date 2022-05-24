import Cookies from 'js-cookie';
import { parseCookies } from 'nookies';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';

import styles from '../styles/components/Header.module.css';

interface Props {
    toggleTheme(): void;
}

const Header: React.FC<Props> = ({toggleTheme}) =>{
    const { colors, title} = useContext(ThemeContext);

    console.log(Cookies.get('theme'))
    const [theme,setTheme] = useState(false)
    const isThemeDark = title === 'dark'
    const isThemeLight = title === 'light'

    
return(
    
        <div className={styles.container}>

            <div className={styles.section}>

            </div>

            <div className={styles.sectionOne}>
                <a href='https://www.pedrotavolaro.com'>
                <img src='/Logo.png' alt='logo' className={styles.logo}/>    
                </a>
            </div>


           <div className={styles.sectionTwo}>
           
           {title === 'dark'? 
             <p className={styles.titleDark}>Tema</p> 
            :
            <text className={styles.title}>Tema</text>         
            }
           
            {title === 'dark' ? 
             <p className={styles.light}>Light</p>
            :
            <text className={styles.lightDark}>Light</text>
            }
        
            <label>
                <input type='checkbox' onClick={toggleTheme} checked={isThemeDark} />
                <span></span>
                <i className={styles.indicator}></i> 
            </label>

            {title === 'dark' ?
            <p className={styles.darkLight}>Dark</p>
            :
            <p className={styles.dark}>Dark</p>
            }
            </div>

            <div className={styles.sectionThree}>
                <a href='https://www.pedrotavolaro.com/ProjectsDescriptions/FocusTime'>
                    {title === 'dark' ? 
                    <p className={styles.lightText}>Saiba mais</p>
                    :
                    <p className={styles.darkText}>Saiba mais</p>
                    }
                    
                </a>
            </div>
          
     
        </div> 
 );
};

export default Header;
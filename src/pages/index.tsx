import Head from "next/head";
import { GetServerSideProps } from "next";
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CountdownProvider } from "../contexts/CountDownContext";

import styles from '../styles/pages/Home.module.css'
import { ChallengesProvider } from "../contexts/ChallengesContext";

import { UserContext, UserProvider } from '../contexts/UserContext'
import React, {useContext, useEffect, useState} from 'react';
import {setCookie, parseCookies} from 'nookies';
import Header from "../components/Header";
import usePersistedState from "../styles/utils/usePersistedState";

import light from "../styles/themes/light";
import dark from "../styles/themes/dark";
import { InfoUser } from "../components/InfoUser";
import { DefaultTheme, ThemeProvider } from "styled-components";

import GlobalStyle from '../styles/global';

interface HomeProps {
      level: number
      currentExperience: number,
      challengesCompleted: number,
      user: string,
      photo: string,
      name: string,
}

export default function Home (props: HomeProps) {

  const [theme, setTheme] = usePersistedState('theme', light);
  
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
 };

  return (
   <>
   
    <ThemeProvider theme={theme}>
    <Header toggleTheme={toggleTheme}/>
    <GlobalStyle />
    <UserProvider
      user = {props.user}
      photo = {props.photo}
    >
       <InfoUser />
    </UserProvider> 

    <ChallengesProvider
    level = {props.level}
    currentExperience={props.currentExperience} 
    challengesCompleted={props.challengesCompleted}
    name = {props.name}
    >
     
    <div className={styles.container}>

    <Head>
      <title>Inicio | FocusTime</title>
    </Head>

    <ExperienceBar />

    <CountdownProvider>
    <Profile />
    <section>

    <div className={styles.challengeBox}>
        <ChallengeBox  />
      </div>
      <div className={styles. completedChallenges}>
        <CompletedChallenges />
        <Countdown />
      </div>
    
    </section>
    </CountdownProvider>
    </div>
   
    </ChallengesProvider>
    </ThemeProvider>   
   </>
    

  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
    const cookies = parseCookies(ctx);
    const { level, currentExperience, challengesCompleted, user, photo, name  } = parseCookies(ctx);
    
    const isUserValid = user;
    console.log(isUserValid)

    return {
      props: {
        //level: cookies.level,
        //currentExperience: cookies.currentExperience,
        //challengesCompleted: cookies.challengesCompleted,
        level: Number(level),
        currentExperience: Number(currentExperience),
        challengesCompleted: Number(challengesCompleted),
        user: String(user),
        photo: String(photo),
        name: String(name),
      }
    }
}

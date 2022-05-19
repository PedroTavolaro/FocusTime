import { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

import {setCookie, parseCookies} from 'nookies';


interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
            level: number;
            currentExperience: number;
            experienceToNextLevel: number;
            challengesCompleted: number;
            activeChallenge: Challenge;
            name: string;
            saveName: () => void;
             levelUp: () => void;
             startNewChallenge: () => void;
             resetChallenge: () => void;
             completedChallenge: () => void;
             closeLevelUpModal: () => void;         
}

interface ChallengesProviderProps {
    children?: ReactNode;
        level?: number;
        currentExperience?: number;
        challengesCompleted?: number;
        name?: string;
}

export const ChallengesContext = createContext ({} as ChallengesContextData);

export function ChallengesProvider({ 
    children, 
    ...rest 
}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
    const [ isSaveNameModalOpen, setIsSaveNameModalOpen] = useState(false)
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
    const [name, setName] = useState(rest.name);

    useEffect(() => {
        setCookie(null, 'level', String(level), {
            maxAge: 86400 * 360 * 5,
            path: '/',
        })
        setCookie(null,'currentExperience', String(currentExperience), {
            maxAge: 86400 * 360 * 100,
            path: '/',
        })
        setCookie(null, 'challengesCompleted', String(challengesCompleted), {
            maxAge: 86400 * 360 * 100,
            path: '/',
        })

        setCookie(null, 'name', String(name), {
            maxAge: 86400 * 360 * 100,
            path: '/',
        })
    }, [ level, currentExperience, challengesCompleted, name ])

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp() {
        setLevel(level +1);
        setIsLevelUpModalOpen(true);
    }
    
    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge(){
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
      const challenge = challenges[randomChallengeIndex];

      setActiveChallenge(challenge)

      new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completedChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }

    function saveName(){
        setIsSaveNameModalOpen(true);
    }
    function closeModalSave() {
        setIsSaveNameModalOpen(false);
    }

    return (
        <ChallengesContext.Provider 
        value = {{ 
            level,
            currentExperience,
            experienceToNextLevel,
            challengesCompleted,
            name,
            saveName,
             levelUp,
             startNewChallenge,
             activeChallenge,
             resetChallenge,
             completedChallenge,
             closeLevelUpModal,
             }}   
         >
             
        { children }
    
        {isLevelUpModalOpen && < LevelUpModal />}
        </ChallengesContext.Provider>

    )
}
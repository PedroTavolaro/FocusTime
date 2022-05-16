import { createContext, useState, ReactNode, useEffect } from "react";
import challenges from "../../challenges.json";
import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";
import { setCookie } from "nookies";

interface ChallengesProps {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChalllengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: ChallengesProps;
  experienceToNextLevel: number;
  name: string;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completedChallenge: () => void;
  closeLevelUpModal:()=>void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  name?: string;
}

export const ChallengesContext = createContext({} as ChalllengesContextData);

export function ChallengesProvider({ children,...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [islevelUpModalOpen,setIslevelUpModalOpen] = useState(false)
  const [name, setName] = useState(rest.name);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  // useEffect(() => {
  //   Cookies.set("level", String(level));
  //   Cookies.set("currentExperience", String(currentExperience));
  //   Cookies.set("challengesCompleted", String(challengesCompleted));
  //   Cookies.set('name', String(name))
  // }, [level, currentExperience, challengesCompleted, name]);

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

  function levelUp() {
    setLevel(level + 1);
    setIslevelUpModalOpen(true)
  }
 
  function closeLevelUpModal(){
    setIslevelUpModalOpen(false)
  }



  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();
  }

  function resetChallenge() {
    return setActiveChallenge(null);
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

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        name,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completedChallenge,
        closeLevelUpModal
      }}
    >
      {children}
      {islevelUpModalOpen && <LevelUpModal/>}
    </ChallengesContext.Provider>
  );
}

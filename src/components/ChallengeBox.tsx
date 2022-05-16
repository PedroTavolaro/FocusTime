import { useContext } from "react";
import {ChallengesContext} from '../contexts/ChallengesContext'
import { CountdownContext } from "../contexts/CountDownContext";
import styles from "../styles/components/ChallengeBox.module.css";
import { ThemeContext } from 'styled-components';

export function ChallengeBox() {
  const hasActiveChallenge = true;

  const { colors, title} = useContext(ThemeContext);
  const isThemeDark = title === 'dark'

  const {activeChallenge, resetChallenge, completedChallenge} = useContext(ChallengesContext)
  const {resetCountdown} = useContext(CountdownContext)
  

  function handleChallengeSucceded() {
    completedChallenge()
    resetCountdown()
  }

  function handleChallengeFailed() {
    resetChallenge()
    resetCountdown()
  }
  
  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`}/>
            {title === 'dark' ?
            <strong className={styles.darkTheme}>Novo Desafio</strong>
            :
            <strong className={styles.lightTheme}>Novo Desafio</strong>
            }
            
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button type="button" onClick={handleChallengeFailed} className={styles.challengeFailedButton}>
              Falhei
            </button>
            <button type="button" onClick={handleChallengeSucceded} className={styles.challengeSuccededButton}>
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up" />
            Avance de level quando completar os desafios
          </p>
        </div>
      )}
    </div>
  );
}

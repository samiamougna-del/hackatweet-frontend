import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import styles from '../styles/Login.module.css';

function Login() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className={styles.container}>
      {/* Partie gauche avec image de fond */}
      <div className={styles.left}></div>

      {/* Partie droite avec logo et formulaire */}
      <div className={styles.right}>
        <img src="/logo.png" alt="Logo Hackatweet" className={styles.logo} />

        <h1 className={styles.title}>SEE WHAT'S HAPPENING TODAY</h1>
        <h2 className={styles.subtitle}>Join Hackatweet today... MWAHAHAHA</h2>

        <button className={styles.button} onClick={() => setShowSignUp(true)}>
          Sign up
        </button>
        {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}

        <h3 className={styles.smallText}>Already have an account?</h3>

        <button className={styles.button} onClick={() => setShowSignIn(true)}>
          Sign in
        </button>
        {showSignIn && <SignIn onClose={() => setShowSignIn(false)} />}
      </div>
    </div>
  );
}

export default Login;

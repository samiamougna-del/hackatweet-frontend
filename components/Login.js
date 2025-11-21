import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

function Login() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div>
        
       <h1>SEE WHAT'S HAPPENING TODAY</h1>
      <h2>Join Hackatweet today... MWAHAHAHA</h2>
      <button onClick={() => setShowSignUp(true)}>Sign up</button>
      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
      <h3>already have an account ?</h3>
      <button onClick={() => setShowSignIn(true)}>Sign in</button>
      {showSignIn && <SignIn onClose={() => setShowSignIn(false)} />}
      
    </div>
  );
}

export default Login;
import { login } from '../reducers/user'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
//import styles from '../styles/Header.module.css';

function SignUp() {
        const dispatch = useDispatch()

        const [signUpUsername, setSignUpUsername] = useState('');
	    const [signUpPassword, setSignUpPassword] = useState('');
        const [signUpFirstname, setSignUpFirstname] = useState('');
        ;

       
       const handleRegister = () => {
		fetch('http://localhost:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ firstname: signUpFirstname, username: signUpUsername, password: signUpPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ firstname: signUpFirstname, username: signUpUsername, token: data.token }));
                    setSignUpFirstname('');
					setSignUpUsername('');
					setSignUpPassword('');
				}
			});
	};

            return (
                    // <div className={styles.registerSection}>
                    <div>
					<p>Sign-up</p>
                    <input type="text" placeholder="Firstname" id="signUpFirstname" onChange={(e) => setSignUpFirstname(e.target.value)} value={signUpFirstname} />
					<input type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
					<input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
					<button id="register" onClick={() => handleRegister()}>Register</button>
				</div>

                )
 

}

export default SignUp;
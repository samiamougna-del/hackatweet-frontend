import { login } from '../reducers/user'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

//import styles from '../styles.login.module.css';

function SignIn({onClose}) {
        const dispatch = useDispatch()

        const [signInUsername, setSignInUsername] = useState('');
	    const [signInPassword, setSignInPassword] = useState('');
        
       
        const handleConnection = () => {
            fetch('http://localhost:3000/users/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: signInUsername, password: signInPassword }),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                        dispatch(login({ username: signInUsername, token: data.token }));
                        setSignInUsername('');
                        setSignInPassword('');
                
        
                    }
                });
                
 
            };

            return (
                    // ajouter className={styles.loginSection} dans modal 
                    //ajouter logo
                    <Modal 
                     open={true} 
                    onCancel={onClose}
                    footer={null}
                    closeIcon={<FontAwesomeIcon icon={faXmark} />}
                     >
                    <h2>Sign in</h2>
					<p>Connect to Hackatweet</p>
					<input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
					<input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
					<button id="connection" onClick={() => handleConnection()}>Sign in</button>
                     </Modal>
			

                )
 

}

export default SignIn;



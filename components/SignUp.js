import { login } from '../reducers/user'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


function SignUp({onClose}) {
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
                     <Modal 
                     open={true} 
                     onCancel={onClose}
                     footer={null}
                     closeIcon={<FontAwesomeIcon icon={faXmark} />}
                     >              
					<p>Create your Hackatweet account</p> 
                    <input type="text" placeholder="Firstname" id="signUpFirstname" onChange={(e) => setSignUpFirstname(e.target.value)} value={signUpFirstname} />
					<input type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
					<input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
					<button id="register" onClick={() => handleRegister()}>Sign up</button>
				     </Modal>   

                )
 

}

export default SignUp;
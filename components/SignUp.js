import { login } from '../reducers/user';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

function SignUp({ onClose }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpFirstname, setSignUpFirstname] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    setError('');
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: signUpFirstname,
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          dispatch(login({
            firstname: signUpFirstname,
            username: signUpUsername,
            token: data.token
          }));
          setSignUpFirstname('');
          setSignUpUsername('');
          setSignUpPassword('');
          onClose();
          router.push('/home');
        } else {
          setError(data.error || 'Erreur lors de l’inscription');
        }
      })
      .catch(() => setError('Erreur serveur'));
  };

  return (
    <Modal
      open={true}
      onCancel={onClose}
      footer={null}
      closeIcon={<FontAwesomeIcon icon={faXmark} />}
         centered  // centre verticalement
  maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
  bodyStyle={{ 
    backgroundColor: '#0d1117',  
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px 40px', 
    borderRadius: '15px', 
  }}
  style={{ border: 'none' }} 
      
    >
      <p>Create your Hackatweet account</p>

      <input
        type="text"
        placeholder="Firstname"
        onChange={(e) => setSignUpFirstname(e.target.value)}
        value={signUpFirstname}
      />
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setSignUpUsername(e.target.value)}
        value={signUpUsername}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setSignUpPassword(e.target.value)}
        value={signUpPassword}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleRegister}>Sign up</button>
    </Modal>
  );
}

export default SignUp;

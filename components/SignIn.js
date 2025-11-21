import { login } from '../reducers/user';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

function SignIn({ onClose }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [error, setError] = useState('');

  const handleConnection = () => {
    setError('');
    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ username: signInUsername, token: data.token }));
          setSignInUsername('');
          setSignInPassword('');
          onClose();
          router.push('/home');
        } else {
          setError(data.error || 'Erreur lors de la connexion');
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
      <h2>Sign in</h2>
      <p>Connect to Hackatweet</p>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setSignInUsername(e.target.value)}
        value={signInUsername}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setSignInPassword(e.target.value)}
        value={signInPassword}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleConnection}>Sign in</button>
    </Modal>
  );
}

export default SignIn;

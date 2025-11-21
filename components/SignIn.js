import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Modal, ConfigProvider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { login } from '../reducers/user';

function SignIn({ onClose }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleConnection = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:3000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.result) {
        dispatch(login({ username, token: data.token }));
        setUsername('');
        setPassword('');
        onClose();
        router.push('/home');
      } else {
        setError(data.error || 'Erreur lors de la connexion');
      }
    } catch {
      setError('Erreur serveur');
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: '#162740',
            headerBg: '#162740',
            titleColor: 'white',
          },
        },
      }}
    >
      <Modal
        open={true}
        onCancel={onClose}
        footer={null}
        closeIcon={<FontAwesomeIcon icon={faXmark} style={{ color: 'white' }} />}
        centered
        maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        bodyStyle={{
          backgroundColor: '#162740',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '60px 40px',
          borderRadius: '20px',
        }}
        style={{ border: 'none', backgroundColor: '#162740',borderRadius: '20px',
          overflow: 'hidden', }}
      >
         <img 
       src="/logo.png"
          alt="Hackatweet Logo"
          style={{ width: '120px', marginBottom: '30px' }}
        />
        
        <h2 style={{ color: 'white', marginBottom: '10px' }}>Sign in</h2>
        <p style={{ color: 'white', marginBottom: '30px' }}>Connect to Hackatweet</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <button onClick={handleConnection} style={buttonStyle}>
          Sign in
        </button>
      </Modal>
    </ConfigProvider>
  );
}

// Styles inline pour inputs et bouton
const inputStyle = {
  width: '100%',
  padding: '10px 15px',
  marginBottom: '15px',
  borderRadius: '8px',
  border: '1px solid #444',
  backgroundColor: '#161b22',
  color: 'white',
  outline: 'none',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#1da1f2',
  border: 'none',
  borderRadius: '8px',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default SignIn;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Modal, ConfigProvider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { login } from '../reducers/user';

function SignUp({ onClose }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, username, password }),
      });
      const data = await res.json();

      if (data.result) {
        dispatch(
          login({ firstname, username, token: data.token })
        );
        setFirstname('');
        setUsername('');
        setPassword('');
        onClose();
        router.push('/home');
      } else {
        setError(data.error || 'Erreur lors de l’inscription');
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
        style={{ border: 'none', 
            backgroundColor: '#162740',
         borderRadius: '20px',
          overflow: 'hidden',
         }}
      >
        <img 
       src="/logo.png"
          alt="Hackatweet Logo"
          style={{ width: '120px', marginBottom: '30px' }}
        />

        <p style={{ color: 'white', fontSize: '20px', marginBottom: '30px' }}>
          Create your Hackatweet account
        </p>

        <input
          type="text"
          placeholder="Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          style={inputStyle}
        />
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

        <button onClick={handleRegister} style={buttonStyle}>
          Sign up
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

export default SignUp;

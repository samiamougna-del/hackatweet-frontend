import { login } from '../reducers/user'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
//import styles from '../styles/Header.module.css';

function SignIn() {
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
                    // <div className={styles.registerSection}>
                    <div>
					<p>Sign-in</p>
					<input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
					<input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
					<button id="connection" onClick={() => handleConnection()}>Connect</button>
				</div>

                )
 

}

export default SignIn;











//let modalContent;
// 	if (!user.token) {
// 		modalContent = (
// 			<div className={styles.registerContainer}>
// 				<div className={styles.registerSection}>
// 					<p>Sign-up</p>
                    //<input type="text" placeholder="Firstname" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} /> 
// 					<input type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
// 					<input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
                    
// 					<input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
// 					<button id="register" onClick={() => handleRegister()}>Register</button>
// 				</div>
// 				<div className={styles.registerSection}>
// 					<p>Sign-in</p>
// 					<input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
// 					<input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
// 					<button id="connection" onClick={() => handleConnection()}>Connect</button>
// 				</div>
				
// 			</div>
			
// 		);
// 	}

// 	let userSection;
// 	if (user.token) {
// 		userSection = (
// 			<div className={styles.logoutSection}>
// 				<p>Welcome {user.username} / </p>
// 				<button onClick={() => handleLogout()}>Logout</button>
// 			</div>
// 		);
// 	} else {
// 		if (isModalVisible) {
// 			userSection =
// 				<div className={styles.headerIcons}>
// 					<FontAwesomeIcon onClick={showModal} className={styles.userSection} icon={faXmark} />
// 				</div>
// 		} else {
// 			userSection =
// 				<div className={styles.headerIcons}>
// 					<FontAwesomeIcon onClick={showModal} className={styles.userSection} icon={faUser}
// 					 />
					
// 				</div>
				
// 		}
// 	}

// 	return (
// 		<header className={styles.header}>
// 			<div className={styles.logoContainer}>
// 				<Moment className={styles.date} date={date} format="MMM Do YYYY" />
// 				<h1 className={styles.title}>Morning News</h1>
// 				{userSection}
				
// 			</div>

// 			<div className={styles.linkContainer}>
// 				<Link href="/"><span className={styles.link}>Articles</span></Link>
// 				<Link href="/bookmarks"><span className={styles.link}>Bookmarks</span></Link>
				
				
// 			</div>

// 			{isModalVisible && <div id="react-modals">
// 				<Modal getContainer="#react-modals" className={styles.modal} visible={isModalVisible} closable={false} footer={null}>
// 					{modalContent}
// 				</Modal>
				
// 			</div>}

// 			 <FontAwesomeIcon onClick={() => handleShowClick()} icon={faEye}  className={styles.hiddenIcon} />
			
// 		</header >
// 	);
// }

// export default Header;


import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Trends from './Trends';

function Home() {
  const [Trends, setTrends] = useState ('');

  const selectTrends = () => {
    console.log ('CLICK', title);
    setTrends(title);

  }
  return (
    <div className={styles.container}>

      {/* --- LEFT SIDEBAR --- */}
      <aside className={styles.sidebarLeft}>
        <img src="/logo.svg" alt="Logo" className={styles.logo} />

        <div>
          <div className={styles.userBox}>
            <div className={styles.userAvatar}></div>
            <div>
              <div>Samia LA BEST </div>
              <div className={styles.handle}>@JohnCena</div>
            </div>
          </div>

          <button className={styles.logoutButton}>Logout</button>
        </div>
      </aside>

      {/* --- FEED CENTER --- */}
      <main className={styles.feed}>
        <h1 className={styles.title}>Home</h1>

        <input 
          type="text"
          placeholder="What's up?"
          className={styles.tweetInput}
        />
        <div className={styles.charCount}>0/280</div>
        <button className={styles.tweetButton}>Tweet</button>

        {/* Example tweet */}
        <div className={styles.tweetCard}>
          <div className={styles.tweetHeader}>
            <div className={styles.avatar}></div>
            <div>
              <span className={styles.username}>Antoine</span>
              <span className={styles.handle}> @AntoineLeProf · 5 hours</span>
            </div>
          </div>

          

          <p className={styles.tweetContent}>
            Welcome to <b>#hackatweet</b> guys 😎
          </p>
          
          <div className={styles.tweetActions}>♡ 0</div>
        </div>

      </main>

    </div>
  );
}

export default Home;

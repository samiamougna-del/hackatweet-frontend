import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css';
import Trends from '../../components/Trends';
import Link from 'next/link';
import { useState } from 'react';



function HashtagPage() {
      const [trends, setTrends] = useState ([
         { name: "#hackatweet", count: 2 },
        { name: "#first", count: 1 },
      ]);
    
      const selectTrends = (title) => {
        console.log ('CLICK', title);
        setTrends(title);
      }
    
    
  const router = useRouter();
  const { tag } = router.query;

  return (

 <div className={styles.container}>

      {/* --- LEFT SIDEBAR --- */}
   
      <aside className={styles.sidebarLeft}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />

        <div>
          <div className={styles.userBox}>
            <div className={styles.userAvatar}>
              <img src="/lafolie.png" alt="Logo" className={styles.userAvatar} />
            </div>
            <div>
              <div>Samia LA BEST </div>
              <div className={styles.handle}>@ViveLesRamens</div>
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
            <div className={styles.avatar}>
<img src="/images.jpeg" alt="Logo" className={styles.avatar} />

            </div>
            <div>
              <span className={styles.username}>Antoine</span>
              <span className={styles.handle}> @AntoineLeProf · 5 hours</span>
            </div>
          </div>

    
<p className={styles.tweetContent}>
  Welcome to{" "}
 <Link href={`/hashtag/${tag}`}>
  <a className={styles.hashtagLink}>{tag}</a>
</Link>
  guys 😎
</p>
          
          <div className={styles.tweetActions}>♡ 0</div>
        </div>

      </main>
        <Trends trends={trends} />
    </div>
  );
}

export default HashtagPage ;

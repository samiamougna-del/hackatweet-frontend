import styles from '../styles/Home.module.css';
import Link from 'next/link';

function Trends() {
  return (
    // --- RIGHT SIDEBAR (TRENDS) ---
    <aside className={styles.sidebarRight}>
      <div className={styles.trendsCard}>
        <h2 className={styles.trendsTitle}>Trends</h2>

        <div className={styles.trendItem}>
           <Link href="/hashtag/hackatweet">
  <a className={styles.trendLink}>#hackatweet</a>
</Link>
          <div className={styles.trendCount}>2 Tweets</div>
        </div>

        <div className={styles.trendItem}>
            <Link href="/hashtag/hackatweet">
  <a className={styles.trendLink}>#first</a>
</Link>


          <div className={styles.trendCount}>1 Tweet</div>
        </div>
      </div>
    </aside>
  );
}

export default Trends;

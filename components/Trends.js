import styles from '../styles/Home.module.css';
import Home from './Trends';

function Trends() {
  return (
    // --- RIGHT SIDEBAR (TRENDS) ---
    <aside className={styles.sidebarRight}>
      <div className={styles.trendsCard}>
        <h2 className={styles.trendsTitle}>Trends</h2>

        <div className={styles.trendItem}>
          <div className={styles.trendName}>#hackatweet</div>
          <div className={styles.trendCount}>2 Tweets</div>
        </div>

        <div className={styles.trendItem}>
          <div className={styles.trendName}>#first</div>
          <div className={styles.trendCount}>1 Tweet</div>
        </div>
      </div>
    </aside>
  );
}

export default Trends;

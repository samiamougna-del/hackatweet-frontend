import styles from '../styles/Home.module.css';
import Link from 'next/link';

function Trends({ trends }) {

  // LOG OUT 

const handleLogout = () => {
  // Si tu utilises un token
  localStorage.removeItem("token");

  // Si tu veux vider l'utilisateur dans Redux :
  // dispatch(logout());

  // Redirection vers la page login
  router.push("/login");
};


  return (
    <aside className={styles.sidebarRight}>
      <div className={styles.trendsCard}>
        <h2 className={styles.trendsTitle}>Trends</h2>
        
        {trends.map((trend, index) => (
          <div key={index} className={styles.trendItem}>
            <Link href={`/hashtag/${trend.name.replace('#', '')}`}>
              <a className={styles.trendLink}>{trend.name}</a>
            </Link>
            <div className={styles.trendCount}>
              {trend.count} Tweet{trend.count > 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Trends;
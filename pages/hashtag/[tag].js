import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css';
import Trends from '../../components/Trends';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Popover } from 'antd';

function HashtagPage() {
  const router = useRouter();
  const { tag } = router.query;

  const [tweets, setTweets] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Liste des hashtags locale
  const [trends, setTrends] = useState([
    { name: "#hackatweet", count: 2 },
    { name: "#first", count: 1 },
  ]);

  const [currentTag, setCurrentTag] = useState(tag || "");

  // Mettre à jour currentTag si tag change dans l'URL
  useEffect(() => {
    if (tag) setCurrentTag(tag);
  }, [tag]);

  // Récupérer les tweets depuis le backend selon le hashtag
  useEffect(() => {
    if (!currentTag) {
      setTweets([]);
      return;
    }

    fetch(`/api/tweets/hashtag/${currentTag}`)
      .then(res => res.json())
      .then(data => {
        if (data.result) setTweets(data.data);
        else setTweets([]);
      })
      .catch(err => console.error(err));
  }, [currentTag]);

  // Recherche via input
  const handleSearch = () => {
    if (!inputValue.startsWith("#")) return;

    const searchTag = inputValue.replace("#", "").toLowerCase();
    setCurrentTag(searchTag);
    setInputValue("");
    router.push(`/hashtag/${searchTag}`, undefined, { shallow: true });
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  // Gestion du like/unlike
  const handleLike = async (tweetId) => {
    const userId = "123"; // À remplacer par l'ID de l'utilisateur connecté
    try {
      const res = await fetch(`/api/tweets/${tweetId}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (data.result) {
        setTweets(prev =>
          prev.map(t =>
            t._id === tweetId
              ? {
                  ...t,
                  likes: data.action === "like"
                    ? [...t.likes, userId]
                    : t.likes.filter(id => id !== userId)
                }
              : t
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const popoverContent = <div className={styles.popoverContent}>{inputValue}</div>;

  return (
    <div className={styles.container}>
      {/* --- LEFT SIDEBAR --- */}
      <aside className={styles.sidebarLeft}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <div>
          <div className={styles.userBox}>
            <div className={styles.userAvatar}>
              <img src="/lafolie.png" alt="Avatar" className={styles.userAvatar} />
            </div>
            <div>
              <div>Samia LA BEST</div>
              <div className={styles.handle}>@ViveLesRamens</div>
            </div>
          </div>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* --- FEED CENTER --- */}
      <main className={styles.feed}>
        <h1 className={styles.title}>{currentTag ? `#${currentTag}` : "Search Hashtag"}</h1>

        <input
          type="text"
          placeholder="Search"
          className={styles.tweetInput}
          style={{ fontStyle: "italic" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Popover content={popoverContent} trigger="click">
          <button className={styles.tweetButton} onClick={handleSearch}>
            Search
          </button>
        </Popover>

        {tweets.length === 0 && currentTag && (
          <p>No tweets found for #{currentTag}</p>
        )}

        {tweets.map((tweet, index) => (
          <div key={tweet._id} className={styles.tweetCard}>
            <div className={styles.tweetHeader}>
              <div className={styles.avatar}>
                <img src="/images.jpeg" alt="Avatar" className={styles.avatar} />
              </div>
              <div>
                <span className={styles.username}>User{index + 1}</span>
                <span className={styles.handle}> @user{index + 1} · Just now</span>
              </div>
            </div>
            <p className={styles.tweetContent}>
              {tweet.text.split(" ").map((word, i) =>
                word.startsWith("#") ? (
                  <Link key={i} href={`/hashtag/${word.slice(1)}`}>
                    <a className={styles.hashtagLink}>{word}</a>
                  </Link>
                ) : (
                  word + " "
                )
              )}
            </p>
            <div
              className={styles.tweetActions}
              style={{ cursor: "pointer" }}
              onClick={() => handleLike(tweet._id)}
            >
              ♡ {tweet.likes?.length || 0}
            </div>
          </div>
        ))}
      </main>

      {/* --- RIGHT TRENDS --- */}
      <Trends trends={trends} />
    </div>
  );
}

export default HashtagPage;

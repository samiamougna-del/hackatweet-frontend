import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css';
import Trends from '../../components/Trends';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTweet, updateTrends } from '../../reducers/tweet';

function HashtagPage() {
  const router = useRouter();
  const { tag } = router.query;
  const dispatch = useDispatch();
  const allTweets = useSelector((state) => state.tweet.tweets);
  const trends = useSelector((state) => state.tweet.trends);
  const [tweets, setTweets] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!tag || !allTweets) return;
    const filtered = allTweets.filter((t) =>
      t.text.toLowerCase().includes(`#${tag.toLowerCase()}`)
    );
    setTweets(filtered);
  }, [tag, allTweets]);

  const handleTweet = () => {
    if (!inputValue) return;
    
    const newTweet = {
      _id: Date.now(),
      text: inputValue,
      likes: [],
    };
    
    dispatch(addTweet(newTweet));
    
    const hashtags = inputValue.match(/#[\w]+/g);
    if (hashtags) {
      dispatch(updateTrends(hashtags));
    }
    
    setInputValue("");
  };

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
          <button className={styles.logoutButton}>Logout</button>
        </div>
      </aside>

      {/* --- FEED CENTER --- */}
      <main className={styles.feed}>
        <h1 className={styles.title}>#{tag}</h1>
        <input
          type="text"
          placeholder="What's up?"
          className={styles.tweetInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className={styles.charCount}>{inputValue.length}/280</div>
        <button className={styles.tweetButton} onClick={handleTweet}>Tweet</button>

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
                  <Link key={i} href={`/hashtag/${word.replace("#", "")}`}>
                    <a className={styles.hashtagLink}>{word}</a>
                  </Link>
                ) : (
                  word + " "
                )
              )}
            </p>
            <div className={styles.tweetActions}>♡ {tweet.likes.length}</div>
          </div>
        ))}
      </main>

      {/* --- Right Trends --- */}
      <Trends trends={trends} />
    </div>
  );
}

export default HashtagPage;
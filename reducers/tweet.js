import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tweets: [],
  trends: []  
};

export const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    loadTweets: (state, action) => {
      state.tweets = action.payload;
    },
    addTweet: (state, action) => {
      state.tweets.push(action.payload);
    },
    deleteTweet: (state, action) => {
      state.tweets = state.tweets.filter(tweet => tweet._id !== action.payload);
    },
    toggleLike: (state, action) => {
      const tweet = state.tweets.find(t => t._id === action.payload.tweetId);
      if (tweet) {
        const index = tweet.likes.indexOf(action.payload.username);
        if (index > -1) {
          tweet.likes.splice(index, 1);
        } else {
          tweet.likes.push(action.payload.username);
        }
      }
    },
    updateTrends: (state, action) => {
        
      action.payload.forEach((hashtag) => {
        const existingTrend = state.trends.find(t => t.name.toLowerCase() === hashtag.toLowerCase());
        if (existingTrend) {
          existingTrend.count += 1;
        } else {
          state.trends.push({ name: hashtag, count: 1 });
        }
      });
    }
  }
});

export const { loadTweets, addTweet, deleteTweet, toggleLike, updateTrends } = tweetSlice.actions;
export default tweetSlice.reducer;
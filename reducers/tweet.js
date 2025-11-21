import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  tweets: []  
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
          tweet.likes.splice(index, 1);  // Unlike
        } else {
          tweet.likes.push(action.payload.username);  // Like
        }
      }
    }
  }
});
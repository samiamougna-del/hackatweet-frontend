import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tweet from '../reducers/tweet';
import user from '../reducers/user';
import '../styles/globals.css';

const store = configureStore({
reducer: { tweet, user },
});

function App({ Component, pageProps }) {
return (
  <Provider store={store}>
    <Head>
    <title>Hackatweet</title>
    </Head>
    <Component {...pageProps} />
  </Provider>
  );
}

export default App;

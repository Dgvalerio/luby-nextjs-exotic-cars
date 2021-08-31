import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { ThemeProvider } from 'styled-components';

import TopBar from '../components/top-bar';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <TopBar />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default MyApp;

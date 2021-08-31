import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from 'styled-components';

import TopBar from '../components/top-bar';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Exotic Cars</title>
      <meta name="description" content="Exotic Cars - Web Application." />
    </Head>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <TopBar />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default MyApp;

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/Global';
import theme from '../styles/Theme';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default MyApp;

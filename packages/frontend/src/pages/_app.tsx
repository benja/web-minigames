import React, { useEffect, useState, useContext } from 'react';
import { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { StoreContext, DefaultStore } from '../utils/store';
import { useRouter } from 'next/router';
import { Sockets } from '../socket';
import { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';
import { swrFetcher } from '../hooks';
import { uniqueNamesGenerator, adjectives, colors } from 'unique-names-generator';
import { DarkTheme, LightTheme } from '../ui/theme';
import { ThemeContext } from '../helpers/theme';
import ReactTooltip from 'react-tooltip';

interface MyAppProps extends AppProps {
  Component: {
    Layout?: React.ExoticComponent<{
      children?: React.ReactNode;
    }>;
  } & NextComponentType<NextPageContext, any, {}>;
}

export default function App({ Component, pageProps }: MyAppProps) {
  const Layout = Component.Layout || React.Fragment;
  const [storeContext, setStoreContext] = useState<DefaultStore>({});
  const [themeName, setThemeName] = useState<'dark' | 'light'>('dark');

  return (
    <ThemeContext.Provider value={{ state: themeName, dispatch: setThemeName }}>
      <SWRConfig value={{ fetcher: swrFetcher }}>
        <ThemeProvider theme={themeName === 'dark' ? DarkTheme : LightTheme}>
          <StoreContext.Provider value={{ state: storeContext, dispatch: setStoreContext }}>
            <Layout>
              <Toaster />
              <ReactTooltip id={'wmg'} type={themeName === 'dark' ? 'light' : 'dark'} />
              <SocketWrapper />
              <GlobalStyles />
              <Component {...pageProps} />
            </Layout>
          </StoreContext.Provider>
        </ThemeProvider>
      </SWRConfig>
    </ThemeContext.Provider>
  );
}

function SocketWrapper() {
  const { state, dispatch } = useContext(StoreContext);
  const router = useRouter();

  useEffect(() => {
    if (state.lobby?.id) {
      return void router.push(`/?lobbyId=${state.lobby.id}`);
    }
  }, [state.lobby]);

  useEffect(() => {
    try {
      const sockets = new Sockets(dispatch, router);

      dispatch(o => ({
        ...o,
        socket: sockets,
      }));

      return () => {
        sockets.isConnected() && sockets.disconnect();
      };
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!state.socket) return;

    const usernameFromLocalStorage = localStorage.getItem('username');

    if (usernameFromLocalStorage) {
      state.socket.updateUsername(usernameFromLocalStorage);
    } else {
      const username = uniqueNamesGenerator({
        dictionaries: [adjectives, colors],
        length: 2,
        style: 'capital',
        separator: '',
      });
      state.socket.updateUsername(username);
    }
  }, [state.socket]);

  return null;
}

// Reset default browser styling
const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  }
  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  html {
    min-height: 100vh;
  }
  body {
    min-height: 100vh;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  #__next {
    min-height: 100vh;
  }
`;

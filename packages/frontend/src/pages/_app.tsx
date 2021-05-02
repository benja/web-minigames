import React, { useEffect, useState, useContext } from 'react';
import { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { createGlobalStyle } from 'styled-components';
import { StoreContext, DefaultStore } from '../utils/store';
import { useRouter } from 'next/router';
import { useSocketActions } from '../utils/socket-actions';

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

  return (
    <StoreContext.Provider value={{ state: storeContext, dispatch: setStoreContext }}>
      <AppWrapper />
      <Layout>
        <GlobalStyles />
        <Component {...pageProps} />
      </Layout>
    </StoreContext.Provider>
  );
}

function AppWrapper() {
  const { state, dispatch } = useContext(StoreContext);
  const { claimUsername, createLobby } = useSocketActions();
  const router = useRouter();

  useEffect(() => {
    if (state.lobby?.id) {
      router.push(`/lobby?id=${state.lobby.id}`);
    }
  }, [state.lobby]);

  useEffect(() => {
    const usernameFromLocalStorage = localStorage.getItem('username');
    if (usernameFromLocalStorage) {
      dispatch(o => ({
        ...o,
        account: { username: usernameFromLocalStorage },
      }));
      claimUsername(usernameFromLocalStorage);
    } else {
      router.push('/');
    }
  }, []);

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

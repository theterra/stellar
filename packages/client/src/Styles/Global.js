import React from 'react';
import { Global, css } from '@emotion/core';
import nova300Woff from 'Assets/fonts/nova300.woff2';
import nova400Woff from 'Assets/fonts/nova400.woff2';
import nova500Woff from 'Assets/fonts/nova500.woff2';
import nova600Woff from 'Assets/fonts/nova600.woff2';
import nova700Woff from 'Assets/fonts/nova700.woff2';

const styles = css`
    @font-face {
        font-family: 'ProximaNova';
        src: url(${nova300Woff}) format('woff2');
        font-weight: 300;
    }
    @font-face {
        font-family: 'ProximaNova';
        src: url(${nova400Woff}) format('woff2');
        font-weight: 400;
    }
    @font-face {
        font-family: 'ProximaNova';
        src: url(${nova500Woff}) format('woff2');
        font-weight: 500;
    }
    @font-face {
        font-family: 'ProximaNova';
        src: url(${nova600Woff}) format('woff2');
        font-weight: 600;
    }

    @font-face {
        font-family: 'ProximaNova';
        src: url(${nova700Woff}) format('woff2');
        font-weight: 700;
    }

    * {
        margin: 0;
        padding: 0;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

    html {
        box-sizing: border-box;
        font-size: 16px;
    }

    body {
        font-family: ProximaNova, Arial, Helvetica Neue, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 400;
        line-height: 1.15;
    }
`;

const GlobalStyles = () => <Global styles={styles} />;

export default GlobalStyles;

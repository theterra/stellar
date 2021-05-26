import { hot } from 'react-hot-loader/root';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'emotion-theming';

import GlobalStyles from 'Styles/Global';
import Root from 'Routes';
import { gqlClient } from 'Store';
import { Theme as theme } from '@stellar/components';

const App = () => {
    return (
        <ApolloProvider client={gqlClient}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Root />
            </ThemeProvider>
        </ApolloProvider>
    );
};

export default hot(App);

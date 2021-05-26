const React = require('react');
const { ThemeProvider } = require('emotion-theming');
const { Theme: theme } = require('../src');

const ThemeDecorator = (storyFn) => <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;

module.exports = ThemeDecorator;

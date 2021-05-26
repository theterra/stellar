const { addDecorator } = require('@storybook/react');

const themeDecorator = require('./themeDecorator');

addDecorator(themeDecorator);
const { addDecorator } = require('@storybook/react');

module.exports = {
    stories: ['../stories/**/*.stories.js'],
    addons: ['@storybook/addon-actions', '@storybook/addon-links'],
};

const path = require('path');

module.exports = {
    displayName: {
        name: '@stellar/client',
        color: 'cyan',
    },
    testEnvironment: 'jest-environment-jsdom',
    moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
    },
};

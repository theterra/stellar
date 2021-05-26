const path = require('path');

module.exports = {
    displayName: {
        name: '@stellar/server',
        color: 'yellowBright',
    },
    testEnvironment: 'jest-environment-node',
    moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
    transform: {
        '\\.(gql|graphql)$': 'jest-transform-graphql',
        '.*': 'babel-jest',
    },
    coverageDirectory: path.join(__dirname, '../coverage/server'),
};

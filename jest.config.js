module.exports = {
    projects: ['<rootDir>/test/jest.lint.js', '<rootDir>/packages/*/jest.config.js'],
    watchPlugins: ['jest-watch-select-projects', 'jest-runner-eslint/watch-fix'],
    verbose: true,
    collectCoverageFrom: ['**/src/**/*.js'],
    coverageThreshold: {
        global: {
            statements: 20,
            branch: 20,
            functions: 20,
            lines: 20,
        },
    },
};

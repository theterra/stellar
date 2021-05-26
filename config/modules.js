const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');

function getAdditionalModulePaths(paths, options = {}) {
    const baseUrl = options.baseUrl;
    const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

    if (path.relative(paths.appNodeModules, baseUrlResolved) === '') {
        return null;
    }

    if (path.relative(paths.appSrc, baseUrlResolved) === '') {
        return [paths.appSrc];
    }

    if (path.relative(paths.appPath, baseUrlResolved) === '') {
        return null;
    }

    throw new Error("Your project's `baseUrl` can only be set to `src` or `node_modules`.");
}

function getWebpackAliases(paths, options = {}) {
    const baseUrl = options.baseUrl;

    if (!baseUrl) {
        return {};
    }

    const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

    if (path.relative(paths.appPath, baseUrlResolved) === '') {
        return {
            src: paths.appSrc,
        };
    }
}

function getModules(paths) {
    const hasJsConfig = fs.existsSync(paths.appJsConfig);

    let config;
    if (hasJsConfig) {
        config = jsonfile.readFileSync(paths.appJsConfig);
    }

    config = config || {};
    const options = config.compilerOptions || {};

    const additionalModulePaths = getAdditionalModulePaths(paths, options);

    return {
        additionalModulePaths: additionalModulePaths,
        webpackAliases: getWebpackAliases(paths, options),
    };
}

module.exports = getModules;

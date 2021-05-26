const { resolveApp } = require('./resolvePaths');

module.exports = {
    dotenv: resolveApp('.env'),
    rootPath: resolveApp('.'),
    rootBuild: resolveApp('build'),
    rootPackageJson: resolveApp('package.json'),
    rootPackages: resolveApp('packages'),
    rootPackagesClient: resolveApp('packages/client'),
    rootPackagesServer: resolveApp('packages/server'),
    rootLockFile: resolveApp('yarn.lock'),
    rootNodeModules: resolveApp('node_modules'),
};

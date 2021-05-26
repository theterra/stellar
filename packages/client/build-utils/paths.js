const path = require('path');
const fs = require('fs');
const { resolveModule } = require('../../../config/resolvePaths');
const { rootPackagesClient } = require('../../../config/rootPaths');

const appDirectory = fs.realpathSync(rootPackagesClient);
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    dotenv: resolveApp('.env'),
    appPath: resolveApp('.'),
    appIndexJs: resolveModule(resolveApp, 'src/index'),
    appAssets: resolveModule(resolveApp, 'src/Assets'),
    appFontAsssets: resolveModule(resolveApp, 'src/Assets/fonts'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appJsConfig: resolveApp('jsconfig.json'),
    testsSetup: resolveModule(resolveApp, 'src/setupTests'),
    appNodeModules: resolveApp('node_modules'),
};

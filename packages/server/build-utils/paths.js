const path = require('path');
const fs = require('fs');
const { resolveModule } = require('../../../config/resolvePaths');

const appDirectory = fs.realpathSync(path.join(__dirname, '..'));
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    dotenv: resolveApp('.env'),
    appPath: resolveApp('.'),
    appIndexJs: resolveModule(resolveApp, 'src/app.js'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appJsConfig: resolveApp('jsconfig.json'),
    testsSetup: resolveModule(resolveApp, 'src/setupTests'),
    appNodeModules: resolveApp('node_modules'),
};

import jsonFile from 'jsonfile';
import project from 'root-config/project';

export default (app) => {
    try {
        app.locals.buildManifest = jsonFile.readFileSync(
            project.paths.build(`client/${project.compiler.build_manifest}`),
        );
    } catch (e) {
        app.locals.buildManifest = {};
        if (process.env.NODE_ENV !== 'development') {
            throw e;
        }
    }
};

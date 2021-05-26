import ViewBase from './Base';
import siteMeta from 'config/site.meta';

export default class ViewHtml extends ViewBase {
    _beforeRender() {
        super._beforeRender();

        const { response, params } = this;
        const newParams = { ...params };

        newParams.metaInfo = Object.assign(
            {},
            siteMeta.default_meta,
            response.locals.metaInfo || {},
        );
        newParams.showSplashScreen = false;
        this.setParams(newParams);
    }

    _render() {
        this.response.render(this.template, this.params);
    }
}

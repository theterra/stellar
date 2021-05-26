import ViewBase from './Base';

export default class ViewJson extends ViewBase {
    _render() {
        const { response, params } = this;
        response.json({
            ...params,
        });
    }
}

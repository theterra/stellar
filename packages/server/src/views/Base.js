import _ from 'lodash';

export default class ViewBase {
    _isError = false;

    constructor(request, response, template) {
        this._request = request;
        this._response = response;
        this._template = template;
        this._params = {};
        this._statusCode = null;
    }

    get template() {
        return this._template;
    }

    set template(template) {
        this._template = template;
    }

    get params() {
        return this._params;
    }

    set params(params) {
        this._params = params;
    }

    get request() {
        return this._request;
    }

    set request(request) {
        this._request = request;
    }

    get response() {
        return this._response;
    }

    set response(response) {
        this._response = response;
    }

    get statusCode() {
        return this._statusCode;
    }

    set statusCode(statusCode) {
        this._statusCode = statusCode;
    }

    sendStatusCode(statusCode) {
        if (statusCode !== undefined) {
            this.statusCode = statusCode;
            this.response.status(this.statusCode);
        }
    }

    setParams(data) {
        if (_.isPlainObject(data)) {
            this.params = data;
        }
    }

    render(data, statusCode) {
        if (this.response.headersSent) {
            return;
        }

        this.setParams(data);
        this.sendStatusCode(statusCode);
        this._beforeRender();

        this._render();
    }

    templateRender(data) {
        this.setParams(data);
        this._beforeRender(false);

        return this._templateRender();
    }

    _beforeRender() {}

    renderError(...args) {
        this._isError = true;
        this.render(...args);
    }

    _render() {
        this._response.send('OK');
    }

    _templateRender() {
        return new Promise((resolve, reject) => {
            this.response.render(this.template, this.params, (err, html) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            });
        });
    }
}

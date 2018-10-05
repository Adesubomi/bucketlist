'use strict'

class Api {

    response(status, message, payload) {

        var _data = { status, message, payload }

        return _data;
    }

    success(message, payload) {

        return this.response('success', message, payload || {})
    }

    failure (message, payload) {

        return this.response('failure', message, payload || {})
    }

    getUserId() {
        return 1;
    }
}

module.exports = Api

var _deepExtend = require('underscore-deep-extend');

var defaultConfig = {
    config: {
        debug: true,
        columns: {
            "id": "integer",
            "name": "string",
            "enabled": "boolean"
        },
        adapter: {
            type: "restapi",
            idAttribute: "id"
        },
        headers: {
            "Content-Type": "application/json"
        },
        URLPARAMS: {
            limit: 5
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            // extended functions and properties go here
        });

        return Model;
    },
    extendCollection: function(Collection) {
        var _links = {
            first: false,
            next: false,
            last: false,
            self: false,
        };

        _.extend(Collection.prototype, {
            page: 1,
            pages: 1,
            limit: 10,
            total: 0,
            startup: true,
            ended: true,

            // For Backbone v1.1.2
            // fetch method to account for a breaking change in Backbone.
            fetch: function(options) {
                options = options ? _.clone(options) : {};
                options.reset = true;
                return Backbone.Collection.prototype.fetch.call(this, options);
            },

            search: function(options) {
                if (typeof options === 'string') {
                    options = {
                        urlparams: { search: options }
                    };
                }

                return this.fetch(options);
            },

            // @private
            _links: function(target, options) {
                if (_links[target]) {
                    options.url = _links[target].href;
                    return this.fetch(options);
                }
            },

            first: function(options) {
                return this._links('first', options);
            },

            next: function(options) {
                return this._links('next', options);
            },

            back: function(options) {
                var page = this.page - 1;

                if (page <= 1 || this.page === 1) {
                    return this._links('first', options);
                }

                var link = _links.self.href;
                var replaces = link.match(/page=([0-9]+)/);

                options.url = link.replace(replaces[0], 'page=' + page);

                return this.fetch(options);
            },

            last: function(options) {
                return this._links('last', options);
            },

            self: function(options) {
                return this._links('self', options);
            },

            parse: function(response) {
                if (typeof response._embedded === 'undefined') {
                    return response;
                }

                if (typeof response._links !== 'undefined') {
                    _links = response._links;
                }

                if (typeof response.page !== 'undefined') {
                    this.page = response.page;
                }

                if (typeof response.pages !== 'undefined') {
                    this.pages = response.pages;
                }

                this.startup = this.page === 1;
                this.ended = this.page === this.pages;

                if (typeof response.limit !== 'undefined') {
                    this.limit = response.limit;
                }

                if (typeof response.total !== 'undefined') {
                    this.total = response.total;
                }

                return response._embedded.items;
            }
        });

        return Collection;
    }
};

exports.initCollection = function (config) {
    if (typeof config.api !== 'undefined') {
        config.config.URL = Alloy.CFG.api + config.api;
        delete config.api;
    }

    var _default = _.clone(defaultConfig);
    return _deepExtend.underscoreDeepExtend(_default, config);
};

exports.defaultCollectionConfig = defaultConfig;

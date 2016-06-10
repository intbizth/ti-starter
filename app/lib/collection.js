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
            // extended functions and properties go here

            // For Backbone v1.1.2, uncomment the following to override the
            // fetch method to account for a breaking change in Backbone.
            
            fetch: function(options) {
                options = options ? _.clone(options) : {};
                options.reset = true;
                return Backbone.Collection.prototype.fetch.call(this, options);
            },

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

            last: function(options) {
                return this._links('last', options);
            },

            self: function(options) {
                return this._links('self', options);
            },
            
            parse: function(response) {
                if (typeof response._links !== 'undefined') {
                    _links = response._links;
                }

                if (typeof response._embedded === 'undefined') {
                    return response;
                }

                // TODO: links, paginated
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

var _deepExtend = require('underscore-deep-extend'),
    _validatorBuilder = require('validator').LGTM
;

var defaultConfig = function() {
    return {
        config: {
            debug: false,
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
        _extendModel: {
            /**
             * @return Promise
             */
            isValid: function() {
                if (!this.validator) {
                    return _validatorBuilder.validator().build().validate(this);
                }

                return this.validator.validate(this);
            },

            rejectChange: function () {
                console.wran('TODO: not yet implement.');
            },

            /**
             * default serialize
             *
             * @return JSON
             */
            serialize: function(method) {
                var json = this.toJSON();
                delete json[this.idAttribute];

                return json;
            }
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
                loading: false,

                // For Backbone v1.1.2
                // fetch method to account for a breaking change in Backbone.
                fetch: function(options) {
                    options = options ? _.clone(options) : {};
                    options.reset = true;

                    this.loading = true;
                    this.trigger('beforefetch');
                    this.on('fetch', function() {
                        this.loading = false;
                    })

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
    }
};

exports.initCollection = function(config) {
    var _defaultConfig = defaultConfig();

    if (typeof config.extendModel !== 'function') {
        var extendModel = _deepExtend.underscoreDeepExtend(
            _defaultConfig._extendModel, config.extendModel || {}
        );

        delete config.extendModel;

        if (typeof config.validator === 'function') {
            extendModel.validator = config.validator(_validatorBuilder.validator()).build();
            delete config.validator;
        }

        _defaultConfig.extendModel = function(Model) {
            _.extend(Model.prototype, extendModel);

            return Model;
        }
    }

    if (typeof config.api !== 'undefined') {
        config.config.URL = Alloy.CFG.api + config.api;
        delete config.api;
    }

    return _deepExtend.underscoreDeepExtend(_defaultConfig, config);
};

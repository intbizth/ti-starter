var _deepExtend = require('underscore-deep-extend');

var defaultConfig = {
	config: {
		columns: {
			"id": "integer",
		    "name": "string",
		    "enabled": "boolean"
		},
		adapter: {
			type: "restapi",
			idAttribute: "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			},
			
			parse: function(response) {
				if (typeof response._embedded == undefined) {
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
	var _default = _.clone(defaultConfig);
	return _deepExtend.underscoreDeepExtend(_default, config);
};

exports.defaultCollectionConfig = defaultConfig;

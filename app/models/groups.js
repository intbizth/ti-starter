var BaseCollection = require('collection');

exports.definition = BaseCollection.initCollection({
	api: "/groups/",
	config: {
		columns: {
			"id": "integer",
		    "name": "string",
		    "enabled": "boolean"
		},
		adapter: {
			collection_name: "groups",
		}
	}
});
